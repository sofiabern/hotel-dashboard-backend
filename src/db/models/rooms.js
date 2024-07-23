// Номери (Номер, Кількість осіб, Комфортність, Ціна).
import { Schema, model} from 'mongoose';


const roomSchema = new Schema(
  {
    room_number: { type: Number, required: true },
    capacity: { type: Number, required: true },
    bookingsAndCheckIns:  [{ type: Schema.Types.ObjectId, ref: 'check-in', required: true}],
    comfort_level: {
      type: String,
      enum: ['Suite', 'Junior Suite', 'Standard'],
      required: true,
    },
    image:{type: String, required: true},
    price: { type: Number, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const Room = model('room', roomSchema);
