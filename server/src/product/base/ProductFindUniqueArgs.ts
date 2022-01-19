import { ArgsType, Field } from "@nestjs/graphql";
import { ProductWhereUniqueInput } from "./ProductWhereUniqueInput";

@ArgsType()
class ProductFindUniqueArgs {
  @Field(() => ProductWhereUniqueInput, { nullable: false })
  where!: ProductWhereUniqueInput;
}

export { ProductFindUniqueArgs };
