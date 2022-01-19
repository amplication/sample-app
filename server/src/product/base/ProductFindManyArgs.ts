import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ProductWhereInput } from "./ProductWhereInput";
import { Type } from "class-transformer";
import { ProductOrderByInput } from "./ProductOrderByInput";

@ArgsType()
class ProductFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ProductWhereInput,
  })
  @Field(() => ProductWhereInput, { nullable: true })
  @Type(() => ProductWhereInput)
  where?: ProductWhereInput;

  @ApiProperty({
    required: false,
    type: ProductOrderByInput,
  })
  @Field(() => ProductOrderByInput, { nullable: true })
  @Type(() => ProductOrderByInput)
  orderBy?: ProductOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ProductFindManyArgs };
