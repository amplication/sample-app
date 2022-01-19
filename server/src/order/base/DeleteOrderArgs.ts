import { ArgsType, Field } from "@nestjs/graphql";
import { OrderWhereUniqueInput } from "./OrderWhereUniqueInput";

@ArgsType()
class DeleteOrderArgs {
  @Field(() => OrderWhereUniqueInput, { nullable: false })
  where!: OrderWhereUniqueInput;
}

export { DeleteOrderArgs };
