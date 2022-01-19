import { ArgsType, Field } from "@nestjs/graphql";
import { OrderCreateInput } from "./OrderCreateInput";

@ArgsType()
class CreateOrderArgs {
  @Field(() => OrderCreateInput, { nullable: false })
  data!: OrderCreateInput;
}

export { CreateOrderArgs };
