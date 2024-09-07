import { create } from 'zustand';

type Sign = {
  id: number;
  imageUrl: string;
  nameAr: string;
  nameEn: string;
};

interface SignState {
  signs: Sign[];
  setSigns: (signs: Sign[]) => void;
}

export const useSignStore = create<SignState>((set) => ({
  signs: [],
  setSigns: (signs) => set({ signs }),
}));