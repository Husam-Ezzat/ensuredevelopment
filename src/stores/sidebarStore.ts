// src/stores/sidebarStore.ts
import { create } from 'zustand';

interface SidebarState {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  setSidebarVisibility: (isVisible: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarVisible: window.innerWidth >= 1200,
  toggleSidebar: () => set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
  setSidebarVisibility: (isVisible: boolean) => set({ isSidebarVisible: isVisible }),
}));