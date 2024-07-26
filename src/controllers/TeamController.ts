import { Request, Response } from "express";
import Team from "../models/Team";
import { handleTypeError } from "../utils/error.handle";


const TeamController = {
    async create(req:Request , res:Response ) {
        try {
            const team = await Team.create(req.body);
            res.status(201).send({ msg: "Team created:", team });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async getAll(req:Request , res:Response ) {
        try {
            const teams = await Team.find()
            res.status(201).send({msg: "teams:", teams});
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async getByName(req: Request, res: Response) {
        try {
            const team = await Team.findOne(req.body);
            if (!team) {
                return res.status(404).send({ msg: "There are no teams with that name" });
            }
            res.status(201).send({ msg: "Your team", team });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async update(req:Request , res:Response ) {
        try {
            const updates = req.body; 
            const teamId = req.params._id; 
            const team = await Team.findByIdAndUpdate(
                teamId,
                updates, 
                { new: true} 
            );
    
            if (!team) {
                return res.status(404).send({ msg: "Team not found" });
            }
    
            res.status(200).send({ msg: "Team updated:", team });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },

};

export default TeamController;


