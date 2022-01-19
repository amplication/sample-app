import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerWhereUniqueInput } from "./CustomerWhereUniqueInput";
import { CustomerUpdateInput } from "./CustomerUpdateInput";

@ArgsType()
class UpdateCustomerArgs {
  @Field(() => CustomerWhereUniqueInput, { nullable: false })
  where!: CustomerWhereUniqueInput;
  @Field(() => CustomerUpdateInput, { nullable: false })
  data!: CustomerUpdateInput;
}

export { UpdateCustomerArgs };
