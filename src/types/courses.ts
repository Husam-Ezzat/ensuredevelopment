
export type CertificateStatus = 'NONE' | 'PENDING' | 'ISSUED' | 'REJECTED' | undefined;

export type Course = {
    id: number;
    name: string;
    description: string;
    certificateIssuedStatus: CertificateStatus;
    groupsCount: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    templateDetails?: any;
}

export type CoursesResults = {
    data: Course[];
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    currentPage: number;
    totalPages?: number;

}

export type GetCoursesQueryResponse ={
    courses: {
        coursesResults: CoursesResults;
    };
    
}

export type GetCoursesQueryVariables = {
    pageNumber: number;
    pageSize: number;
    name?: string;
    certificateIssuedStatuses: CertificateStatus;
}

export type CourseListProps = {
    pageSize?: number;
    pageNumber?: number;
    onClick?: () => void;
    name?: string;
    certificateIssuedStatuses: CertificateStatus;
    pagination?: boolean;
    handleEdit?: (courseId: number) => void;
    handleDelete?: (courseId: number) => void;
    onNextClick?: any;
    onPrevClick?: any;
}
export type AddCourseResult = {
    courseId: number;
    groupId: number;
}

export type AddCourseResponse = {
    addCourse: {
        addCourseResult: AddCourseResult;
    };
}

export type AddCourseVariables  ={
    name: string;
    groupName: string;
}

export type EditCourseVariables = {
    courseName: string;
    id: number;
}

export type  EditCourseProps ={
    courseId: number;
    onEdit: (type : string) => void;
}
