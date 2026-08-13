import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import countryService from "./country.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import AppError from "../../utils/AppError.js";

// add country
const addCountry = catchAsync(async (req: Request, res: Response) => {
  const { countryName } = req.body;

  const result = await countryService.addCountry(countryName);

  return ApiResponse.success(res, 200, "Country added successfully", result);
});

// get countries
const getCountries = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await countryService.getCountries(page, limit);

  return ApiResponse.success(
    res,
    201,
    "Country added successfully",
    result.countries,
    result.pagination,
  );
});

// update country name
const updateCountry = catchAsync(async (req: Request, res: Response) => {
  const { countryId, countryName } = req.body;
  if (!countryId) {
    throw new AppError(404, "Country id required");
  }
  if (!countryName) {
    throw new AppError(404, "Country name required");
  }

  const result = await countryService.updateCountry(
    Number(countryId),
    countryName,
  );

  return ApiResponse.success(res, 200, "Country updated successfully", result);
});

// delete country name
const deleteCountry = catchAsync(async (req: Request, res: Response) => {
  const { countryId } = req.body;
  if (!countryId) {
    throw new AppError(404, "Country id required");
  }

  const result = await countryService.deleteCountry(Number(countryId));

  return ApiResponse.success(res, 200, "Country updated successfully", result);
});

const CountryController = {
  addCountry,
  getCountries,
  updateCountry,
  deleteCountry,
};

export default CountryController;
