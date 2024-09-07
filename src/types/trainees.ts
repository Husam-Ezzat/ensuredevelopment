export type Trainee = {
    email: string;
    firstName: string;
    groupId: number;
    id: number;
    lastName: string;
    midName: string;
    phoneNumber: string;
    thirdName: string;
    courseName?: string;
    groupName?: string;
    groupStatus?: string;
    totalPages?: number; 
}

export  type GroupDetails = {
    courseName:string;
    groupId:number;
    groupName:string;
    groupStatus:string;
    groupDetails?: any;
    dateRejectionReason?:string;
    groupRejectionReason?:string;
    personRejectionReason?:string;
    templateDetails?:any;

}
export type TraineesData = {
    traineesData: Trainee[];
    groupDetails: GroupDetails;
    currentPage?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    pageSize?: number;
    totalCount: number;
    totalPages?: number;
}