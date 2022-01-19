import { ArgsType, Field } from "@nestjs/graphql";
import { ProductWhereUniqueInput } from "./ProductWhereUniqueInput";

@ArgsType()
class DeleteProductArgs {
  @Field(() => ProductWhereUniqueInput, { nullable: false })
  where!: ProductWhereUniqueInput;
}

export { DeleteProductArgs };
