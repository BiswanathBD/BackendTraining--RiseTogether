import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import countryService from "./country.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import AppError from "../../utils/AppError.js";

// Add country
const addCountry = catchAsync(async (req: Request, res: Response) => {
  const { countryName } = req.body;

  if (!countryName) {
    throw new AppError(400, "Country name is required");
  }

  const result = await countryService.addCountry(countryName);

  return ApiResponse.success(res, 201, "Country added successfully", result);
});

// Get countries
const getCountries = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await countryService.getCountries(page, limit);

  return ApiResponse.success(
    res,
    200,
    "Countries fetched successfully",
    result.countries,
    result.pagination,
  );
});

// Update country name
const updateCountry = catchAsync(async (req: Request, res: Response) => {
  const { countryId, countryName } = req.body;

  if (!countryId) throw new AppError(400, "Country ID is required");
  if (!countryName) throw new AppError(400, "Country name is required");

  const result = await countryService.updateCountry(countryId, countryName);

  return ApiResponse.success(res, 200, "Country updated successfully", result);
});

// Delete country
const deleteCountry = catchAsync(async (req: Request, res: Response) => {
  const { countryId } = req.body;

  if (!countryId) throw new AppError(400, "Country ID is required");

  const result = await countryService.deleteCountry(countryId);

  return ApiResponse.success(res, 200, "Country deleted successfully", result);
});

const CountryController = {
  addCountry,
  getCountries,
  updateCountry,
  deleteCountry,
};

export default CountryController;
