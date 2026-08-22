import AppError from "../../utils/AppError.js";
import { prisma } from "../../lib/prisma.js";

// Add new country
const addCountry = async (countryName: string) => {
  // check country existence
  const countryExiting = await prisma.countries.findUnique({
    where: { countryName },
  });
  if (countryExiting) throw new AppError(409, "Country already exit");

  const result = await prisma.countries.create({
    data: {
      countryName,
    },
  });

  return result;
};

// Get countries with pagination
const getCountries = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const countries = await prisma.countries.findMany({
    skip,
    take: limit,
  });

  const total = await prisma.countries.count();
  const totalPages = Math.ceil(total / limit);

  const pagination = {
    page,
    limit,
    total,
    totalPages,
  };

  return {
    pagination,
    countries,
  };
};

// Update country name
const updateCountry = async (countryId: string, countryName: string) => {
  const result = await prisma.countries.update({
    where: {
      countryId,
    },
    data: {
      countryName,
    },
  });

  return result;
};

// Delete country
const deleteCountry = async (countryId: string) => {
  const result = await prisma.countries.delete({
    where: {
      countryId,
    },
  });

  return result;
};

const countryService = {
  addCountry,
  getCountries,
  updateCountry,
  deleteCountry,
};

export default countryService;
