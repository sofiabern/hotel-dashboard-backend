import { CheckIn } from '../db/models/check-ins.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getCheckIns = async ({ page = 1, perPage = 6, filter = '' }) => {
  const skip = perPage * (page - 1);

  const allCheckIns = await CheckIn.find({})
    .populate({
      path: 'client',
      select: 'first_name middle_name last_name',
    })
    .populate({
      path: 'room',
      select: 'room_number',
    });


  const filteredCheckIns = filter
    ? allCheckIns.filter(checkIn => {
      const fullName = `${checkIn.client.first_name} ${checkIn.client.middle_name ? checkIn.client.middle_name + ' ' : ''}${checkIn.client.last_name}`.toLowerCase();
      const firstLastName = `${checkIn.client.first_name} ${checkIn.client.last_name}`.toLowerCase();
      const roomNumber = checkIn.room.room_number.toString();

      return fullName.includes(filter.toLowerCase()) || firstLastName.includes(filter.toLowerCase()) || roomNumber.includes(filter);
    })
    : allCheckIns;



  const paginatedCheckIns = filteredCheckIns.slice(skip, skip + perPage);
  const checkInsCount = filteredCheckIns.length;

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    checkInsCount
  );

  return {
    checkIns: paginatedCheckIns,
    ...paginationInformation,
  };
};

export const getCheckInById = async (id) => {
  return await CheckIn.findById(id);
};

export const createCheckIn = async (checkIn) => {
  return await CheckIn.create(checkIn);
};

export const deleteCheckIn = async (id) => {
  return await CheckIn.findByIdAndDelete(id);
};

export const updateCheckIn = async (id, field) => {
  return await CheckIn.findByIdAndUpdate(id, field, { new: true });
};
