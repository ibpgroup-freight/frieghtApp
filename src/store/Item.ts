import { create } from "zustand";
type Item = {
  id: string;
  QuoteValidity: string;
  Charges: string;
  ChargeDescription: string;
  UnitPerKg: string;
  Currency: string;
  AmountPerUnit: string;
  CostAndSellSection: string;
};
type ItemsStore = {
  totalItems: number;
  items: Item[];
  AddItem: (item: Item) => void;
  RemoveItem: (id: string) => void;
  resetItems: () => void;
};
const useItemStore = create<ItemsStore>((set) => ({
  totalItems: 0,
  items: [],
  AddItem: (item) => {
    set((state) => {
      state.items.push(item);
      return { ...state, totalItems: state.totalItems + 1 };
    });
  },
  RemoveItem: (id) => {
    set((state) => {
      return {
        ...state,
        totalItems: state.totalItems - 1,
        items: state.items.filter((i) => i.id !== id),
      };
    });
  },
  resetItems: () => {
    set((state) => {
      return { totalItems: 0, items: [] };
    });
  },
}));

export default useItemStore;
