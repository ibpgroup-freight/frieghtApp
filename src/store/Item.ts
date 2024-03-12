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
  ManifestItems: [],
  PODItems: [],
  setManifestItems(items) {
    set((state) => ({ ...state, ManifestItems: items }));
  },
  setPODItems(items) {
    set((state) => ({ ...state, PODItems: items }));
  },
  addManifestItem(item) {
    set((state) => {
      state.ManifestItems.push(item);
      return { ...state, totalItems: state.totalItems + 1 };
    });
  },
  addPODItem(item) {
    set((state) => {
      state.PODItems.push(item);
      return { ...state, totalItems: state.totalItems + 1 };
    });
  },
  editAirwayItem(item, index) {
    set((state) => {
      state.AirwayItems[index] = item;
      return state;
    });
  },
  editItem(item, index) {
    set((state) => {
      state.items[index] = item;
      return state;
    });
  },
  editLadingItem(item, index) {
    set((state) => {
      state.ladingItems[index] = item;
      return state;
    });
  },
  editManifestItem(item, index) {
    set((state) => {
      state.ManifestItems[index] = item;
      return state;
    });
  },
  editPodItem(item, index) {
    set((state) => {
      state.PODItems[index] = item;
      return state;
    });
  },
}));

export default useItemStore;
