
import {  Document,Schema, model} from 'mongoose';

export interface IPost extends Document {
    title: string;
    desc: string;
 }

 // 2. Create a Schema corresponding to the document interface.
const schema:Schema = new Schema<IPost>(
    {
    title: { type: String },
    desc: { type: String},
    },
    {
        timestamps:true
    }
    );
  
  // 3. Create a Model.
  export const Post = model<IPost>('Post', schema);





