import AppError from "../../utils/AppError.js";

const user = {
  name: "Biswanath Sarker",
  email: "biswanath.sarker@gmail.com",
  password: "123456",
};

// login logic
const login = (email: string, password: string) => {
  if (user.email !== email || user.password !== password) {
    throw new AppError(401, "Invalid email or password");
  }
  return user;
};

// reg logic
const register = (data: any) => {
  if (!data.email || !data.password) {
    throw new AppError(400, "Invalid data, email & password are required");
  }

  return data;
};

const AuthService = {
  login,
  register,
};

export default AuthService;
