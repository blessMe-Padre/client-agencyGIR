import { create } from 'zustand';

const useDateStore = create((set) => ({
  dates: [], 
  addDate: (newDate) => set((state) => ({ dates: [...state.dates, newDate] })),
  removeDate: (dateToRemove) => set((state) => ({ 
    dates: state.dates.filter(date => date.getTime() !== dateToRemove.getTime())
  })),
  clearDates: () => set({ dates: [] }), 
}));

export default useDateStore;
