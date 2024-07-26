import { Request, Response } from "express";
import Player from "../models/Player";
import Team from "../models/Team";
import { handleTypeError } from "../utils/error.handle";


const PlayerController = {
    async create(req:Request , res:Response ) {
        try {
            const teamId = req.params._id;
            const team = await Team.findById(teamId);
            if (!team) {
                return res.status(404).send({ msg: "Team not found" });
            }
            const player = await Player.create({
                ...req.body,
                teams: teamId,
            });
            
            await Team.findByIdAndUpdate(teamId, { $push: { players: player._id } });
    
            res.status(201).send({ msg: "Player created:", player });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async getAll(req:Request , res:Response ) {
        try {
            const Players = await Player.find()
            res.status(201).send({msg: "teams:", Players});
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async getByName(req: Request, res: Response) {
        try {
            const player = await Player.findOne(req.body);
            if (!player) {
                return res.status(404).send({ msg: "There are no teams with that name" });
            }
            res.status(201).send({ msg: "Your team", player });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async update(req:Request , res:Response ) {
        try {
            const player = await Player.findByIdAndUpdate(req.params._id, {new: true});
            res.status(201).send({ msg: "Team updated:", player });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },

};

export default PlayerController;
