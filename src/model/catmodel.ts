import { Document, Schema, model } from "mongoose";

export interface ICat extends Document {
  name: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema: Schema = new Schema<ICat>(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

// 3. Create a Model.
export const Cat = model<ICat>("Cat", schema);
