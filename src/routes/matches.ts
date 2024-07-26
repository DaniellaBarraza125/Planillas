import { Router } from "express";
import MatchController from "../controllers/MatchController";

const router = Router();

router.post('/:_id', MatchController.create)
router.get('/', MatchController.getAll)
router.put('/:_id', MatchController.update)
router.delete('/', MatchController.delete)




export { router };