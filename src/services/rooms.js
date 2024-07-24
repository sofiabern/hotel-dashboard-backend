import { Room } from '../db/models/rooms.js';
import createHttpError from 'http-errors';
import { isBefore, isAfter, isEqual } from 'date-fns';


const isRoomAvailable = (startDate, endDate, bookingsAndCheckIns) => {
  return !bookingsAndCheckIns.some((item) => {
    const bookingCheckInDate = new Date(item.check_in_date);
    const bookingCheckOutDate = new Date(item.check_out_date);
    return (
      (isBefore(startDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate)) ||
      isEqual(startDate, bookingCheckInDate) ||
      isEqual(endDate, bookingCheckOutDate) ||
      isEqual(endDate, bookingCheckInDate) ||
      isEqual(startDate, bookingCheckOutDate) ||
      (isBefore(startDate, bookingCheckOutDate) && isAfter(startDate, bookingCheckInDate)) ||
      (isBefore(endDate, bookingCheckOutDate) && isAfter(endDate, bookingCheckInDate))
    );
  });
};

export const getRooms = async (checkInDate, checkOutDate, comfortLevel) => {
  const rooms = await getAllRooms();

  if (!checkInDate || !checkOutDate) {
    return rooms.filter(room => comfortLevel
      ? room.comfort_level.toLowerCase() === comfortLevel.toLowerCase()
      : true);
  }

  const requestedStart = new Date(checkInDate);
  const requestedEnd = new Date(checkOutDate);

  return rooms.filter(room => {
    const isAvailable = isRoomAvailable(requestedStart, requestedEnd, room.bookingsAndCheckIns);
    const matchesComfortLevel = comfortLevel
      ? room.comfort_level.toLowerCase() === comfortLevel.toLowerCase()
      : true;
    return isAvailable && matchesComfortLevel;
  });
};

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
