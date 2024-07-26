import { Types } from "mongoose";

export interface Tournament {
    name: string;
    teams: Types.ObjectId[];
    _id: string;
    date: Date;
    status: 'scheduled' | 'in_progress' | 'completed';
    matches: Types.ObjectId[];
    place: string;
    tournamentPlayers: {
        team: Types.ObjectId;
        players: Types.ObjectId[];
    }[];
}