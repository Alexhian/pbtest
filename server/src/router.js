import { Router } from "express";
import { createProperties } from "./modules/properties/propertiesController.js";

const router = Router();

router.post("/", createProperties);

export default router;