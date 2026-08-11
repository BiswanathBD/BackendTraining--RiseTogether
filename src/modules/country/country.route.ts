import { Router } from "express";
import CountryController from "./country.controller.js";

const CountryRouter: Router = Router();

CountryRouter.post("/add-country", CountryController.addCountry);
CountryRouter.get("/countries", CountryController.getCountries);
CountryRouter.post("/update-country", CountryController.updateCountry);
CountryRouter.post("/delete-country", CountryController.deleteCountry);

export default CountryRouter;
