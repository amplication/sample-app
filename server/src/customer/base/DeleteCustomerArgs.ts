import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerWhereUniqueInput } from "./CustomerWhereUniqueInput";

@ArgsType()
class DeleteCustomerArgs {
  @Field(() => CustomerWhereUniqueInput, { nullable: false })
  where!: CustomerWhereUniqueInput;
}

export { DeleteCustomerArgs };
