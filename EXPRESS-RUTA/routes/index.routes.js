import { Router } from "express";
import cripto from "./cripto.routes.js";

const indexRoutes = Router();

indexRoutes.use('/cripto', cripto);

export default indexRoutes;
