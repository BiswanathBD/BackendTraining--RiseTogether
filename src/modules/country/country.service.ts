import AppError from "../../utils/AppError.js";
import { prisma } from "../../lib/prisma.js";

// add new country
const addCountry = async (countryName: string) => {
  if (!countryName) {
    throw new AppError(400, "Country name is required");
  }

  const res = await prisma.country.create({
    data: {
      countryName,
    },
  });

  return res;
};

// get countries with pagination
const getCountries = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const countries = await prisma.country.findMany({
    skip,
    take: limit,
  });

  const total = await prisma.country.count();
  const totalPages = Math.ceil(total / limit);
  const pagination = {
    page,
    limit,
    total,
    totalPages,
  };

  return { pagination, countries };
};

// update country name
const updateCountry = async (countryId: number, countryName: string) => {
  const res = await prisma.country.update({
    where: { countryId },
    data: { countryName },
  });

  return res;
};

// delete country
const deleteCountry = async (countryId: number) => {
  const res = await prisma.country.delete({ where: { countryId } });
  return res;
};

const countryService = {
  addCountry,
  getCountries,
  updateCountry,
  deleteCountry,
};

export default countryService;
