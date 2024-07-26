import { Types } from "mongoose";

export interface Match {
    teamA: Types.ObjectId;
    teamB: Types.ObjectId;
    tournament: Types.ObjectId;
    startTime: Date;
    status: 'scheduled' | 'in_progress' | 'completed';
    field: string;
    score: {
        teamA: number;
        teamB: number;
    };
    teamAPlayers: Types.ObjectId[]; 
    teamBPlayers: Types.ObjectId[]; 
}