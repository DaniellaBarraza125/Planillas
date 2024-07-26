import  {Router, Response, Request} from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.post('/', TeamController.create)
router.put('/:_id', TeamController.update)
router.get('/', TeamController.getAll);
router.get('/byname', TeamController.getByName);


export   { router };