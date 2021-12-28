
import { Post } from '../model/PostModel';
import {HydratedDocument } from 'mongoose';
import { IPost } from './../model/PostModel';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const NEW_POST = "NEW_POST";

//post resolver
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
   //@ts-ignore
   const post: HydratedDocument<IPost>=new Post({title,desc})
   post.save().then((p)=>{
     console.log("create post response ========",p)
     pubsub.publish(NEW_POST, {
       //@ts-ignore
      newPost: p.data
    });
    })
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

  },
  Subscription: {
  newPost: {
      subscribe: () => pubsub.asyncIterator(NEW_POST)
    }
  },
};

