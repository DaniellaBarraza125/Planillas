import { Request, Response } from "express";
import { handleTypeError } from "../utils/error.handle";
import Tournament from "../models/Tournament";
import Match from "../models/Matches";


const TournamentController = {
    async create(req:Request , res:Response ) {
        try {
            const tournament = await Tournament.create({...req.body,
                status: 'scheduled',
            });
    
            res.status(201).send({ msg: "Tournament created:", tournament });
        } catch (error) {
            handleTypeError(error, req, res, () => {})
        }
    },
    async getAll(req:Request , res:Response ) {
        try {
            const tournaments = await Tournament.find()
            res.status(201).send({msg: "all tournaments:", tournaments});
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async getByName(req: Request, res: Response) {
        try {
            const tournament = await Tournament.findOne(req.body);
            if (!tournament) {
                return res.status(404).send({ msg: "There are no tournaments with that name" });
            }
            res.status(201).send({ msg: "Your team", tournament });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async update(req:Request , res:Response ) {
        try {
            const tournament = await Tournament.findByIdAndUpdate(req.params._id, {new: true});
            res.status(201).send({ msg: "Tournament update:", tournament });
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async delete(req:Request , res:Response ) {
        try {

        const tournament = await Tournament.findById(req.params._id).populate('matches');
    
        if (!tournament) {
            return res.status(404).send({ msg: 'Tournament not found' });
        }
    
        if (tournament.matches && tournament.matches.length > 0) {
            await Match.deleteMany({ _id: { $in: tournament.matches } });
        }
    
        await Tournament.findByIdAndDelete(req.params._id);
    
        res.status(200).send({ msg: 'Tournament deleted', tournament });
        } catch (error) {
        handleTypeError(error, req, res, () => {});
        }
    }

};

export default TournamentController;
