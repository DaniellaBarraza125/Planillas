import { Request, Response } from "express";
import { handleTypeError } from "../utils/error.handle";
import Match from "../models/Matches";
import Tournament from "../models/Tournament";


const MatchController = {
    async create(req:Request , res:Response ) {
        try {
            const tournamentId = req.params._id
            const newMatch = await Match.create({...req.body,
                status: 'scheduled', tournament: tournamentId, matchType: 'tournament'
            });
            const tournament = await Tournament.findByIdAndUpdate(tournamentId, {$push: {matches: newMatch._id}})
            const match = await Match.findById(newMatch._id)
            .populate('teamA', 'name')
            .populate('teamB', 'name')
            .populate('tournament', 'name')
            .select('-playerStats -score -createdAt -updatedAt -__v');
            
            res.status(201).send({ msg: `Match created and added to ${tournament?.name}`, match });
        } catch (error) {
            handleTypeError(error, req, res, () => {})
        }
    },
    async getAll(req:Request , res:Response ) {
        try {
            const match = await Match.find()
            .populate('teamA', 'name')
            .populate('teamB', 'name')
            .populate('tournament', 'name')
            .select('-playerStats -score -createdAt -updatedAt -__v');

            res.status(201).send({msg: "all matches:", match});
        } catch (error) {
            handleTypeError(error, req, res, () => {})

        }
    },
    async update(req: Request, res: Response) {
        try {
            const matchId = req.params._id;
            const updateData = req.body;
            
            const match = await Match.findByIdAndUpdate(
                matchId,
                updateData,
                { new: true}
            ).populate('teamA', 'name')
            .populate('teamB', 'name')
            .populate('tournament', 'name')
            .select('-playerStats -score -createdAt -updatedAt -__v');

            
            if (!match) {
                return res.status(404).send({ msg: "Match not found" });
            }
            
            res.status(200).send({ msg: "Match updated", match });
        } catch (error) {
            handleTypeError(error, req, res, () => {});
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const matchId = req.body._id;

            const match = await Match.findByIdAndDelete(matchId);
            if (!match) {
                return res.status(404).send({ msg: "Match not found" });
            }

            await Tournament.updateOne(
                { matches: matchId },
                { $pull: { matches: matchId } }
            );

            res.status(200).send({ msg: "Match deleted", match });
        } catch (error) {
            handleTypeError(error, req, res, () => {});
        }
    }
};

export default MatchController;
