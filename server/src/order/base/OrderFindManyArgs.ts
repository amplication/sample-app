import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { OrderWhereInput } from "./OrderWhereInput";
import { Type } from "class-transformer";
import { OrderOrderByInput } from "./OrderOrderByInput";

@ArgsType()
class OrderFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => OrderWhereInput,
  })
  @Field(() => OrderWhereInput, { nullable: true })
  @Type(() => OrderWhereInput)
  where?: OrderWhereInput;

  @ApiProperty({
    required: false,
    type: OrderOrderByInput,
  })
  @Field(() => OrderOrderByInput, { nullable: true })
  @Type(() => OrderOrderByInput)
  orderBy?: OrderOrderByInput;

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

export { OrderFindManyArgs };
