import  {Router, Response, Request} from 'express';
import TournamentController from '../controllers/TournamentController';

const router = Router();

router.post('/', TournamentController.create)
router.get('/', TournamentController.getAll)
router.get('/byname', TournamentController.getByName)
router.delete('/', TournamentController.delete)




export   { router };