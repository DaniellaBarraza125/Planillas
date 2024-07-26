import { Types } from "mongoose";

export interface Team {
    name: string;
    city: string;
    capitan: string;
    players: Types.ObjectId[];
    _id: string;
    wins: number;
    losses: number;
    matches: Types.ObjectId[]; 
    tournaments: Types.ObjectId[];
}