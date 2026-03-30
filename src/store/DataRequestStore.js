import { create } from 'zustand';

const useDataRequestStore = create((set) => ({
  data: [],
  setDataRequest: (newData) => set({ data: newData }),
  clearData: () => set({ data: [] }),
}));

export default useDataRequestStore;