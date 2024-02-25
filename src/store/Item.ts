import { create } from "zustand";

const useItemStore = create<ItemsStore>((set) => ({
  totalItems: 0,
  ladingItems: [],
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
}));

export default useItemStore;
