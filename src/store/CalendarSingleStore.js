import { create } from 'zustand';

const useDateSingleStore = create((set) => ({
  dates: {},
  addDate: (idx, newDate) => set((state) => ({
    dates: { ...state.dates, [idx]: newDate }
  })),
  getDate: (idx) => useDateSingleStore.getState().dates[idx],
}));

export default useDateSingleStore;