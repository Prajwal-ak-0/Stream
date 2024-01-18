import { create } from "zustand";

interface CreatorSidebarState {
    collapsed: boolean;
    onCollapse: () => void;
    onExpand: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarState>((set) => ({
    collapsed: false,
    onCollapse: () => set({ collapsed: true }),
    onExpand: () => set({ collapsed: false }),
}));