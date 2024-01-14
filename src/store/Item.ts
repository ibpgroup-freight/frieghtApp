import { create } from "zustand";

const useItemStore = create<ItemsStore>((set) => ({
  totalItems: 0,
  items: [],
  setitemsArray: (items) => {
    set((state) => ({ ...state, items }));
  },
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
