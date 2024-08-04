import { Router } from "express";
import PlayerController from "../controllers/PlayerController";

const router = Router();

router.post('/team/:_id', PlayerController.create)
router.get('/', PlayerController.getAll)
router.get('/byname', PlayerController.getByName)



export { router };