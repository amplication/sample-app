import { AddressWhereInput } from "./AddressWhereInput";
import { AddressOrderByInput } from "./AddressOrderByInput";

export type AddressFindManyArgs = {
  where?: AddressWhereInput;
  orderBy?: AddressOrderByInput;
  skip?: number;
  take?: number;
};
