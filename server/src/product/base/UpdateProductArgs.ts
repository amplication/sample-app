import { ArgsType, Field } from "@nestjs/graphql";
import { ProductWhereUniqueInput } from "./ProductWhereUniqueInput";
import { ProductUpdateInput } from "./ProductUpdateInput";

@ArgsType()
class UpdateProductArgs {
  @Field(() => ProductWhereUniqueInput, { nullable: false })
  where!: ProductWhereUniqueInput;
  @Field(() => ProductUpdateInput, { nullable: false })
  data!: ProductUpdateInput;
}

export { UpdateProductArgs };
