import { env } from "../../config/env.js";
import { prisma } from "../../lib/prisma.js";
import redisClient from "../../lib/redis.js";
import AppError from "../../utils/AppError.js";
import { ILogin, IRegisterUser } from "./auth.types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// login logic
const login = async (data: ILogin) => {
  const { email, password } = data;

  // Check user
  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      userId: true,
      name: true,
      email: true,
      password: true,
      age: true,
      country: {
        select: {
          countryId: true,
          countryName: true,
        },
      },
      isVerified: true,
    },
  });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  // password matching
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid email or password");
  }

  // create accessToken
  const accessToken = jwt.sign(
    {
      userId: user.userId,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN as any,
    },
  );

  // user data for frontend
  const userData = {
    userId: user.userId,
    name: user.name,
    email: user.email,
    age: user.age,
    country: user.country,
    isVerified: user.isVerified,
    accessToken,
  };

  return userData;
};

// reg logic
const register = async (data: IRegisterUser) => {
  const { name, email, password, age, countryId } = data;

  // Check user exit
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new AppError(409, "User already exists with this email");
  }

  // Check country
  if (countryId !== undefined) {
    const country = await prisma.countries.findUnique({
      where: { countryId },
    });
    if (!country) {
      throw new AppError(404, "Country not found");
    }
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      age: age ?? null,
      countryId: countryId ?? null,
    },
  });

  return user;
};

// get user
const getUser = async (accessToken: string) => {
  const redisKey = `accessToken:${accessToken}`;
  // find user in redis
  const cachedUser = await redisClient.get(redisKey);

  // return user from redis
  if (cachedUser) {
    const user = JSON.parse(cachedUser);

    return {
      user,
      ...(env.NODE_ENV === "development" && {
        source: "User data from Redis",
      }),
    };
  }

  // if user not in redis, get userid from accessToken
  let decoded;
  try {
    decoded = jwt.verify(accessToken, env.JWT_SECRET) as {
      userId: string;
      email: string;
    };
  } catch {
    throw new AppError(401, "Invalid or expired access token");
  }

  // get user from database
  const dbUser = await prisma.users.findUnique({
    where: { userId: decoded.userId },
    select: {
      userId: true,
      name: true,
      email: true,
      age: true,
      country: {
        select: {
          countryId: true,
          countryName: true,
        },
      },
      isVerified: true,
    },
  });

  if (!dbUser) {
    throw new AppError(404, "User not found");
  }

  // save user to redis
  await redisClient.set(redisKey, JSON.stringify(dbUser), {
    EX: 60 * 60 * 24 * 7,
  });

  return {
    dbUser,
    ...(env.NODE_ENV === "development" && {
      source: "User data from database",
    }),
  };
};

export const AuthService = {
  login,
  register,
  getUser,
};

export default AuthService;
