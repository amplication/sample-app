import { ArgsType, Field } from "@nestjs/graphql";
import { UserCreateInput } from "./UserCreateInput";

@ArgsType()
class CreateUserArgs {
  @Field(() => UserCreateInput, { nullable: false })
  data!: UserCreateInput;
}

export { CreateUserArgs };
