import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    dates: [Date],
    itineraryDays: [{
        day: Date,
        time: String,
        location: String,
        notes: String
    }]
}, { collection: 'itineraries' });

export const Itinerary = mongoose.model('Itinerary', itinerarySchema);