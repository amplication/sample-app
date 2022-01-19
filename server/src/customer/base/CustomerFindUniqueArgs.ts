import { ArgsType, Field } from "@nestjs/graphql";
import { CustomerWhereUniqueInput } from "./CustomerWhereUniqueInput";

@ArgsType()
class CustomerFindUniqueArgs {
  @Field(() => CustomerWhereUniqueInput, { nullable: false })
  where!: CustomerWhereUniqueInput;
}

export { CustomerFindUniqueArgs };
