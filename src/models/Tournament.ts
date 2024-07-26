import {Schema, Types, model,Model} from 'mongoose';
import { Tournament } from '../interface/tournament.interface';


const tournamentSchema = new Schema<Tournament>(
    {
        name: {
            type: String,
            required: [true, 'Tournament name is required'],
            unique: true, 
        },
        teams: [{
            type: Schema.Types.ObjectId,
            ref: 'Player',
            
        }],
        date: {
            type: Date,
            required: true,
        },
        status: { 
            type: String, 
            enum: ['scheduled', 'in_progress', 'completed'], 
            
        },
        matches: [{
            type: Schema.Types.ObjectId,
            ref: 'Match',
            }],
        place: {
            type: String,
            required: true,
        },
        tournamentPlayers: [{
            team: { type: Types.ObjectId, ref: "Team" },
            players: [{ type: Types.ObjectId, ref: "Player" }]
        }],
    },
    { timestamps: true }

)
const Tournament= model('Tournament', tournamentSchema);
export default Tournament;