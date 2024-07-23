// Поселення (Клієнт, Номер, Дата поселення, Дата звільнення, Примітка).
import { Schema, model } from 'mongoose';

const checkInSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    check_in_date: { type: Date, required: true },
    check_out_date: { type: Date, required: true },
    note: { type: String },
    isCheckIn: { type: Boolean, required: true },
    totalDayPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const CheckIn = model('check-in', checkInSchema);
