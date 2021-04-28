import { RoadTrip } from '../models/RoadTrip';
import { addRoadTripsOrganising } from '../controllers/users';

export async function getRoadTrip(roadTripId) {
  return await RoadTrip.findById(roadTripId);
}

export async function createRoadTrip(roadTrip, organiserId) {
  roadTrip.organiser = organiserId;
  const dbRoadTrip = new RoadTrip(roadTrip);
  await dbRoadTrip.save();
  // creates bidirectional relationship between User and Roadtrip
  await addRoadTripsOrganising(organiserId, dbRoadTrip._id);
  return dbRoadTrip;
}

export async function isUserOrganiser(roadTripId, userId) {
  const dbRoadTrip = await getRoadTrip(roadTripId);
  return new String(dbRoadTrip.organiser).valueOf() === new String(userId).valueOf();
}
