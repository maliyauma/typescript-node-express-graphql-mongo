import { gql } from "apollo-server-express";


export const typeDefs = gql`

type Post{
id:ID
title:String
desc:String
}

type User{
id:ID
name:String
email:String
}

type Cat {
    id: ID!
    name: String!
  }

type Query {
    cats: [Cat!]!
    hello: String
    author:String
    defaultPost:String
    defaultUser:String
    posts:[Post]
    users:[User]
    post(id: ID!): Post
  }

  type Mutation {
    createCat(name: String!): Cat!
    createPost(title:String!,desc:String!):Post
    createUser(name:String!,email:String!):User
    updatePost(id:ID,title:String,desc:String):Post
    deletePost(id: ID!): Boolean!
  }


  type Subscription {
   newPost: Post
  }


`;
