
import {  Document,Schema, model} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
 }

 // 2. Create a Schema corresponding to the document interface.
const schema:Schema = new Schema<IUser>(
    {
    name: { type: String },
    email: { type: String},
    },
    {
    timestamps:true
    }
    );
  
  // 3. Create a Model.
  export const User= model<IUser>('Users', schema);





