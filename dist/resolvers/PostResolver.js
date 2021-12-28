"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const PostModel_1 = require("../model/PostModel");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
const NEW_POST = "NEW_POST";
exports.PostResolver = {
    Query: {
        defaultPost: () => {
            console.log("getting default posr");
            return "hello world";
        },
        posts: async () => {
            const posts = await PostModel_1.Post.find();
            console.log("post gotten ======= ", posts);
            return posts;
        },
        post: async (_, args) => {
            return await PostModel_1.Post.findById(args.id);
        }
    },
    Mutation: {
        createPost: (parent, { title, desc }) => {
            console.log("new post args ####", parent);
            const post = new PostModel_1.Post({ title, desc });
            post.save().then((p) => {
                console.log("create post response ========", p);
                pubsub.publish(NEW_POST, {
                    newPost: p.data
                });
            })
                .catch((p) => console.log("error response ========", p));
            return post;
        },
        updatePost: async (_, { id, title, desc }) => {
            return await PostModel_1.Post.findOneAndUpdate({
                _id: id,
            }, {
                $set: {
                    title,
                    desc
                }
            });
        },
        deletePost: async (_, { id }) => {
            try {
                await PostModel_1.Post.findOneAndRemove({ _id: id });
                return true;
            }
            catch (err) {
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
//# sourceMappingURL=PostResolver.js.map