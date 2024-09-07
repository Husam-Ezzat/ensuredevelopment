import { create } from 'zustand';
import { TraineeGroup } from '@/types/groups';

interface GroupsState {
  groups: TraineeGroup[];
  setGroups: (groups: TraineeGroup[]) => void;
  updateGroup: (groupId: number, groupNameEn: string, groupNameAr: string,courseId:number) => void;
  addGroup: (newGroup: TraineeGroup) => void;
  removeGroup: (groupId: number) => void;
  clearGroups: () => void;
}

export const useGroupsStore = create<GroupsState>((set) => ({
  groups: [],
  setGroups: (groups) => set({ groups }),
  updateGroup: (groupId, groupNameEn, groupNameAr) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? { ...group, groupNameEn, groupNameAr }
          : group
      ),
    })),
  addGroup: (newGroup) =>
    set((state) => ({
      groups: [...state.groups, newGroup],
    })),
  removeGroup: (groupId) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== groupId),
    })),
  clearGroups: () => set({ groups: [] }),
}));
