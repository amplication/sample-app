import { ArgsType, Field } from "@nestjs/graphql";
import { OrderWhereUniqueInput } from "./OrderWhereUniqueInput";

@ArgsType()
class OrderFindUniqueArgs {
  @Field(() => OrderWhereUniqueInput, { nullable: false })
  where!: OrderWhereUniqueInput;
}

export { OrderFindUniqueArgs };
