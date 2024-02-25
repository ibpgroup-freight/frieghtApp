import { create } from "zustand";

const useItemStore = create<ItemsStore>((set) => ({
  totalItems: 0,
  ladingItems: [],
  items: [],
  AirwayItems: [],

  setitemsArray: (items) => {
    set((state) => ({ ...state, items }));
  },
  AddItem: (item) => {
    set((state) => {
      state.items.push(item);
      return { ...state, totalItems: state.totalItems + 1 };
    });
  },
  AddLadingItem(item) {
    set((state) => {
      state.ladingItems.push(item);
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
  setBillOfLadingItems(items) {
    set((state) => ({ ...state, ladingItems: items }));
  },
  AddAirwayItem(item) {
    set((state) => {
      state.AirwayItems.push(item);
      return { ...state, totalItems: state.totalItems + 1 };
    });
  },
  setAirwayItems(items) {
    set((state) => ({ ...state, AirwayItems: items }));
  },
}));

export default useItemStore;
