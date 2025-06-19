import { Router } from "express";
import { createProperties, getProperties } from "./modules/properties/propertiesController.js";
import { createPurchaser } from "./modules/purchasers/purchasersController.js";
import { createPropertyCharacteristics } from "./modules/properties/propertyCharacteristicsController.js";

const router = Router();

router.post('/properties', createProperties);
router.get('/properties', getProperties);
router.post('/purchasers', createPurchaser);
router.post('/propertycharacteristics', createPropertyCharacteristics);


export default router;