import { Types } from "mongoose";

export interface Player {
    name: string;
    city: string;
    teams: Types.ObjectId[];
    _id: string;
    number: number;
    tournaments: Types.ObjectId[];
    matches: {
        matchId: Types.ObjectId;
        goals: number;
        assists: number;
        defenses: number;
    }[];
}