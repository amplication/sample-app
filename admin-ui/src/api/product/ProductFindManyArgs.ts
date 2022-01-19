import { ProductWhereInput } from "./ProductWhereInput";
import { ProductOrderByInput } from "./ProductOrderByInput";

export type ProductFindManyArgs = {
  where?: ProductWhereInput;
  orderBy?: ProductOrderByInput;
  skip?: number;
  take?: number;
};
