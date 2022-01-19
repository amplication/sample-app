import { UserWhereInput } from "./UserWhereInput";
import { UserOrderByInput } from "./UserOrderByInput";

export type UserFindManyArgs = {
  where?: UserWhereInput;
  orderBy?: UserOrderByInput;
  skip?: number;
  take?: number;
};
