import {Schema, Types, model,Model} from 'mongoose';
import { Team } from '../interface/teams.interface';

const teamSchema = new Schema<Team>(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        players: [{
            type: Schema.Types.ObjectId,
            ref: 'Player',
            
        }],
        capitan: {
            type: String,
           
        },
        tournaments: [{
            type: Schema.Types.ObjectId,
            ref: 'Tournament',
        }],
        matches: [{
            type: Schema.Types.ObjectId,
            ref: 'Match',
        }],
        wins: {
            type: Number,
        },
        losses: {
            type: Number,
        },
    },
    { timestamps: true }

)
const Team= model('Team', teamSchema);
export default Team;