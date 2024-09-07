import { useAuth } from "../contexts/AuthContext";


export const usePermissions = () => {
    const { user } = useAuth();
    const userRole = user?.Role as UserRole;

    const courseActions = ():boolean => {
        return userRole === 'Admin' || userRole === 'Moderator';
    }
   const groupActions = ():boolean => {
        return userRole === 'Admin' || userRole === 'Moderator';
    }
    const traineesActions = ():boolean => {
        return userRole === 'Admin' || userRole === 'Moderator';
    }
    const groupReject = ():boolean => {
        return userRole === 'Admin' || userRole === 'Member';
    }
    const signAMutations = ():boolean => {
        return userRole === 'Admin' || userRole === 'Moderator';
    }
    return { courseActions,groupActions, traineesActions,groupReject,signAMutations };
} 