import { ArgsType, Field } from "@nestjs/graphql";
import { AddressWhereUniqueInput } from "./AddressWhereUniqueInput";

@ArgsType()
class AddressFindUniqueArgs {
  @Field(() => AddressWhereUniqueInput, { nullable: false })
  where!: AddressWhereUniqueInput;
}

export { AddressFindUniqueArgs };
