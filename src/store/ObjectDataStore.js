import { create } from 'zustand';

const objectDataStore = create((set) => ({
  data: {},
  setData: (id, name) => set({ data: { id, name } }),
}));

export default objectDataStore;