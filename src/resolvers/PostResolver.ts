
import { Post } from '../model/PostModel';
import {HydratedDocument } from 'mongoose';
import { IPost } from './../model/PostModel';

// interface IPost extends Document {
//   title: string;
//   desc: string;
// }

//resolvers
export const PostResolver = {
  Query: {
    defaultPost: () => {
      console.log("getting default posr")
      return "hello world"},
      
      posts:async() => {
        const posts=await Post.find()
        console.log("post gotten ======= ",posts)
       return posts
     },
     post: async (_, args) => {
      return await Post.findById(args.id);
  }
  },
  Mutation:{
// mutationShape:(parent, args, context, info)=>{}
  createPost:(parent, {title,desc})=>{
   console.log("new post args ####",parent)
   const post: HydratedDocument<IPost>=new Post({title,desc})
   post.save().then((p)=>console.log("create post response ========",p))
   .catch((p)=>console.log("error response ========",p))
   return post
  },

//update post
  updatePost: async (_, { id, title, desc}) => {
    return await Post.findOneAndUpdate(
    {
        _id: id,
    },
    {
    $set: {
        title,
        desc
    }
    },

    );
},
//delete post
 deletePost: async (_, { id }) => {
  try {
      await Post.findOneAndRemove({ _id: id});
      return true;
  } catch (err) {
      return false;
  }
 },

  }
};

