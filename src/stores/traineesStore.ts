import { create } from 'zustand';
import { TraineesData, Trainee } from '@/types/trainees';

interface TraineesState {
    traineesList: TraineesData | null;
    setTraineesList: (traineesList: any) => void;
    addTrainee: (trainee: Trainee) => void;
    addTraineesFromExcel: (trainees: Trainee[]) => void;
    updateTrainee: (id: number, updatedTrainee: Partial<Trainee>) => void;
    removeTrainee: (id: number) => void;
}

export const useTraineesStore = create<TraineesState>((set) => ({
    traineesList: null,

    setTraineesList: (traineesList) => set({ traineesList }),

    addTrainee: (trainee) => set((state) => {
        if (state.traineesList) {
            const updatedTraineesData = [...state.traineesList.traineesData, trainee];
            return {
                traineesList: {
                    ...state.traineesList,
                    traineesData: updatedTraineesData,
                    totalCount: state.traineesList.totalCount + 1,
                    totalPages: Math.ceil((state.traineesList.totalCount + 1) / state.traineesList.pageSize!),
                },
            };
        }
        return state;
    }),

    addTraineesFromExcel: (trainees) => set((state) => {
        if (state.traineesList) {
            const updatedTraineesData = [...trainees, ...state.traineesList.traineesData];
            return {
                traineesList: {
                    ...state.traineesList,
                    traineesData: updatedTraineesData,
                    totalCount: state.traineesList.totalCount + trainees.length,
                    totalPages: Math.ceil((state.traineesList.totalCount + trainees.length) / state.traineesList.pageSize!),
                },
            };
        }
        return state;
    }),

    updateTrainee: (id, updatedTrainee) => set((state) => {
        if (state.traineesList) {
            const updatedTraineesData = state.traineesList.traineesData.map((trainee) =>
                trainee.id === id ? { ...trainee, ...updatedTrainee } : trainee
            );
            return {
                traineesList: {
                    ...state.traineesList,
                    traineesData: updatedTraineesData,
                },
            };
        }
        return state;
    }),

    removeTrainee: (id) => set((state) => {
        if (state.traineesList) {
            const updatedTraineesData = state.traineesList.traineesData.filter((trainee) => trainee.id !== id);
            return {
                traineesList: {
                    ...state.traineesList,
                    traineesData: updatedTraineesData,
                    totalCount: state.traineesList.totalCount - 1,
                    totalPages: Math.ceil((state.traineesList.totalCount - 1) / state.traineesList.pageSize!),
                },
            };
        }
        return state;
    }),
}));