import { Router } from "express";
import mailController from "./mailTest.controller.js";

const MailRouter: Router = Router();

MailRouter.post("/send-mail", mailController.testMail);

export default MailRouter;
