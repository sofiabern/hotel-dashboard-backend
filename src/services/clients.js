import { Client } from '../db/models/clients.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count/perPage);
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



export const getClients = async ({ page = 1, perPage = 6, filter = '' }) => {
  const skip = perPage * (page - 1);

  let filterQuery = {};
  if (filter) {
    const filterRegex = new RegExp(filter, 'i');
    filterQuery = {
      $or: [
        { 'passport_details': filterRegex },
        { 'first_name': filterRegex },
        { 'middle_name': filterRegex },
        { 'last_name': filterRegex },
        {
          $expr: {
            $regexMatch: {
              input: {
                $concat: [
                  '$first_name',
                  ' ',
                  { $ifNull: ['$middle_name', ''] },
                  ' ',
                  '$last_name'
                ]
              },
              regex: filter,
              options: 'i'
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: {
                $concat: ['$first_name', ' ', '$last_name']
              },
              regex: filter,
              options: 'i'
            }
          }
        }
      ],
    };
  }

  const [clientsCount, clients] = await Promise.all([
    Client.find(filterQuery).countDocuments(),
    Client.find(filterQuery).skip(skip).limit(perPage),
  ]);

  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    clientsCount,
  );

  return {
    clients,
    ...paginationInformation,
  };
};


export const getAllClients = async () => {
  return await Client.find();
  };


export const getClientById = async (id) => {
  return await Client.findById(id);
};

export const getClient = async (field) =>{
return await Client.findOne(field);
};

export const createClient = async (client) => {
  return await Client.create(client);
};

export const updateClient = async(id, field) =>{
  return await Client.findByIdAndUpdate(id, field, { new: true });
};

export const deleteClient = async(id) =>{
  return Client.findByIdAndDelete(id);
};
