import { Schema, Types, model } from "mongoose";
import { Match } from "../interface/match.interface";

const matchSchema = new Schema<Match>(
    {
        teamA: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },
        teamB: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        },
        tournament: {
            type: Schema.Types.ObjectId,
            ref: "Tournament",
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['scheduled', 'in_progress', 'completed'],
            default: 'scheduled',
        },
        field: {
            type: String,
            required: true,
        },
        score: {
            teamA: { type: Number, default: 0 },
            teamB: { type: Number, default: 0 },
        },
        teamAPlayers: [{
            type: Schema.Types.ObjectId,
            ref: 'Player',
        }],
        teamBPlayers: [{
            type: Schema.Types.ObjectId,
            ref: 'Player',
        }],
    },
    { timestamps: true }
);

const Match = model<Match>("Match", matchSchema);
export default Match;
