import { ArgsType, Field } from "@nestjs/graphql";
import { AddressWhereUniqueInput } from "./AddressWhereUniqueInput";

@ArgsType()
class DeleteAddressArgs {
  @Field(() => AddressWhereUniqueInput, { nullable: false })
  where!: AddressWhereUniqueInput;
}

export { DeleteAddressArgs };
