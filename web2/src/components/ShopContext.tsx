import { createContext, Dispatch, SetStateAction } from "react";

type ShopContextType = {
  value: ShopType | null;
  setValue: Dispatch<SetStateAction<ShopType | null>>;
};

export type ShopType = {
  name: string;
  id: number;
};

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined
);
