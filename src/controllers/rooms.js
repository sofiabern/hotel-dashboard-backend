import { getAllRooms, getRoomById, updateRoom, getRooms } from '../services/rooms.js';
import createHttpError from 'http-errors';


export const getRoomsController = async (req, res) => {
  const { checkInDate, checkOutDate, comfortLevel } = req.query;

    const filteredRooms = await getRooms(checkInDate, checkOutDate, comfortLevel);

    return res.json({
      status: 200,
      message: checkInDate && checkOutDate ? "Successfully got filtered rooms" : "Successfully got all rooms",
      data: filteredRooms
    });
};


export const getAllRoomsController = async (req, res) => {
  const rooms = await getAllRooms();
  res.json({
    status: 200,
    message: 'Successfully got all rooms!',
    data: rooms,
  });
};

export const getRoomByIdController = async (req, res) => {
  const id = req.params.roomId;
  const room = await getRoomById(id);

  res.json({
    status: 200,
    message: `Successfully got room with id ${id}!`,
    data: room,
  });
};

export const updateRoomController = async (req, res) => {
  const id = req.params.roomId;
  const updateData = req.body;
  const room = await updateRoom(id, updateData);

  if (!room) {
    throw createHttpError(500, 'Room not found');

  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated room with id ${id}!`,
    data: room,
  });
};
