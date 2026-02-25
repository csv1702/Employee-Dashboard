import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  selectedEmployee: null,

  setEmployee: (employee) => set({ selectedEmployee: employee }),
}));
