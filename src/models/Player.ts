import {Schema, Types, model} from 'mongoose';
import { Player } from '../interface/players.interface';

const playerSchema = new Schema<Player>(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        teams: [{
            type: Schema.Types.ObjectId,            
        }],
        tournaments: [{
            type: Schema.Types.ObjectId,
            ref: "Tournament",
        }],
        matches: [{
            matchId: {
                type: Schema.Types.ObjectId,
                ref: "Match",
                required: true,
            },
            goals: {
                type: Number,
                default: 0,
            },
            assists: {
                type: Number,
                default: 0,
            },
            defenses: {
                type: Number,
                default: 0,
            },
        }],
    },
    { timestamps: true }

)
const Player= model('Player', playerSchema);
export default Player;