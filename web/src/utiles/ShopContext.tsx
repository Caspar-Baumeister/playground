import { createContext, Dispatch, SetStateAction } from "react";

type ShopContextType = {
  shop: ShopType | null;
  setShop: Dispatch<SetStateAction<ShopType | null>>;
};

export type ShopType = {
  name: string;
  id: number;
};

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);
