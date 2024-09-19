import { getAllRooms, getRooms } from '../services/rooms.js';

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


