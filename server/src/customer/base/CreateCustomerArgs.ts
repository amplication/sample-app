import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerCreateInput } from "./CustomerCreateInput";

@ArgsType()
class CreateCustomerArgs {
  @Field(() => CustomerCreateInput, { nullable: false })
  data!: CustomerCreateInput;
}

export { CreateCustomerArgs };
