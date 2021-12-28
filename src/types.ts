

import { prop as Property} from "@typegoose/typegoose";
import { Field, InputType } from 'type-graphql';
import { User } from "./entities/Test";
import { ObjectType } from 'type-graphql';

@InputType()
export class UserInput{

    @Field()
    @Property({required:true})
    name: string;
  
    @Field()
    @Property({ required:true})
    email: string;
   }

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
@Field(() => [FieldError], { nullable: true })
errors?: FieldError[];
   
@Field(() => User, { nullable: true })
user?: User;
   }

   