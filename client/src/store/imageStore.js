import { create } from "zustand";

export const useImageStore = create((set) => ({
  image: null,

  setImage: (img) => set({ image: img }),

  clearImage: () => set({ image: null }),
}));
