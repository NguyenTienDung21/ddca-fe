import { Dispatch, SetStateAction, createContext } from "react";
import { DataRow } from "../../types";

interface DataContextProps {
  stocks: DataRow[];
  setStocks: Dispatch<SetStateAction<DataRow[]>>;
}

export const DataContext = createContext<DataContextProps>({
  stocks: [],
  setStocks: () => {
    console.log("Update Stock default setStocks function called");
  },
});
