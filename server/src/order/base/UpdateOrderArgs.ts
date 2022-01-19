import { ArgsType, Field } from "@nestjs/graphql";
import { OrderWhereUniqueInput } from "./OrderWhereUniqueInput";
import { OrderUpdateInput } from "./OrderUpdateInput";

@ArgsType()
class UpdateOrderArgs {
  @Field(() => OrderWhereUniqueInput, { nullable: false })
  where!: OrderWhereUniqueInput;
  @Field(() => OrderUpdateInput, { nullable: false })
  data!: OrderUpdateInput;
}

export { UpdateOrderArgs };
