import { Room } from '../db/models/rooms.js';
import createHttpError from 'http-errors';

export const getAllRooms = async () => {
  return await Room.find().populate(
    'bookingsAndCheckIns',
    'check_in_date check_out_date',
  );
};

export const getRoomById = async (id) => {
  return await Room.findById(id);
};

export const updateRoom = async (id, updateData) => {
  return await Room.findByIdAndUpdate(id, updateData, { new: true });
};

export const removeBookingFromRoom = async (roomId, checkInId) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw createHttpError(500, 'Room not found');
  }

  room.bookingsAndCheckIns = room.bookingsAndCheckIns.filter(
    (id) => id.toString() !== checkInId.toString(),
  );
  await room.save();
};
