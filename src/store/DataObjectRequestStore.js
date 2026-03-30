import { create } from 'zustand';

const useDataObjectRequestStore = create((set) => ({
  dataObject: [],
  setDataObjectRequest: (newData) => set({ dataObject: newData }),
  clearDataObject: () => set({ dataObject: [] }),
}));

export default useDataObjectRequestStore;