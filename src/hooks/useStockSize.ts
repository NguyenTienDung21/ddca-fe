import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreState = {
  stockSize: number; // Assuming `stockSize` is the state variable you want to access
  setStockSize: (newSize: number) => void; // Assuming `setStockSize` is the function to update `stockSize`
};

//Create Stock Size
export const useStockSize = (sessionName: string) =>
  create(
    persist<StoreState>(
      (set) => ({
        stockSize: 0,
        setStockSize: (newSize: number) => set({ stockSize: newSize }),
      }),
      {
        name: sessionName, // Name for the persisted storage key
      }
    )
  );
