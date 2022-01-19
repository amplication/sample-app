import { ArgsType, Field } from "@nestjs/graphql";
import { ProductCreateInput } from "./ProductCreateInput";

@ArgsType()
class CreateProductArgs {
  @Field(() => ProductCreateInput, { nullable: false })
  data!: ProductCreateInput;
}

export { CreateProductArgs };
