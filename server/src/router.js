import { Router } from "express";
import { createProperties, getProperties } from "./modules/properties/propertiesController.js";

const router = Router();

router.post('/properties', createProperties);
router.get('/properties', getProperties);

export default router;