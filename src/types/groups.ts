
export type TraineeGroup = {
    id: number;
    groupNameEn: string;
    groupNameAr: string;
    courseName: string; 
    courseId: number;
    status: string;
    traineeNumbers: number;
    templateDetails: any;
  };
  

export type GetTraineeGroupByCourseIdResponse =  {
    geTraineeGroupByCourseId: TraineeGroup[];
}

export type  GetTraineeGroupByCourseIdVariables =  {
    courseId: number;
}

export type GroupsListProps =  {
    pageNumber:number,
    pageSize:number,
    groupId: number;
    onClick?: () => void;
    name: string;
    pagination?: boolean;
    handleEdit?: (groupId:number, courseId: number) => void;
    handleDelete?: (courseId: number) => void;
}


export type AddGroupResult =  {
    courseId: number;
    groupId: number;
}

export type AddGroupResponse = {
    addTraineeGroup: {
        addTraineeGroupResult: AddGroupResult;
    };
}

export type  AddGroupVariables = {
    groupNameAr: string;
    groupNameEn: string;
    courseId: number;
}

export type  AddGroupProps ={
    courseId: number;
}

export type EditGroupProps = {
    groupId: number;
    courseId: number;
    onEdit: (type:string) => void; 
  };
  
export type UpdateGroupVariables = {
    courseId:number;
    groupNameAr: string;
    groupNameEn: string;
    id: number;
};

export type UpdateGroupResponse = {
    updateTraineeGroup: {
        boolean: boolean;
    };
};
