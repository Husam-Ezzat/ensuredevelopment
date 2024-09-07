import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Course from '@/ui/Course';
import CreateBtn from '@/ui/CreateBtn';
import ViewBtn from '@/ui/ViewBtn';
import { usePermissions } from '@/hooks/usePermissions';
import DropdownItem from '@/ui/DropdownItem';
import SkeletonCard from '@/ui/SkeletonCard';
import Images from '@/common/images';
import { GET_COURSES } from '@/services/courses';
import {
    GetCoursesQueryResponse,
    GetCoursesQueryVariables,
    CourseListProps,
} from '@/types/courses';
import { useCoursesStore } from '@/stores/coursesStore';
import Pagination from '@/ui/Pagination';
import Grid from '@/ui/Grid';



const CoursesList: React.FC<CourseListProps> = ({
    pageNumber = 1,
    pageSize = 7,
    onClick,
    handleDelete,
    handleEdit,
    name = '',
    certificateIssuedStatuses = 'NONE',
    pagination = false,
    onNextClick,
    onPrevClick,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { courseActions } = usePermissions();

    const setCoursesResults = useCoursesStore((state) => state.setCoursesResults);
    const coursesResults = useCoursesStore((state) => state.coursesResults);

    const variablesCourse: GetCoursesQueryVariables = {
        pageNumber,
        pageSize,
        name,
        certificateIssuedStatuses,
    };

    const { loading, error, refetch } = useQuery<
        GetCoursesQueryResponse,
        GetCoursesQueryVariables
    >(GET_COURSES, {
        variables: variablesCourse,
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setCoursesResults(data.courses.coursesResults);
        },
    });

    useEffect(() => {
        refetch();
    }, [pageNumber, pageSize, name, certificateIssuedStatuses, refetch]);

    if (loading) {
        return (
            <Grid columns={{ default: 2, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </Grid>
        );
    }
    if (error) return <p>{t('error_loading_data')}</p>;
    console.log(coursesResults);
    return (
        <>
            <Grid columns={{ default: 2, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}>
                {courseActions() && (
                    <CreateBtn
                        title={t('CreateCourseName')}
                        onClick={onClick || (() => { })}
                    />
                )}

                {!loading &&
                    coursesResults?.data.map((item) => (
                        <Course
                            courseName={item?.name}
                            key={item?.id}
                            statusCount={item?.groupsCount}
                            status={item?.status
                                ?.split(' ')
                            [item?.status?.split(' ')?.length - 1].toLowerCase()}
                            numberOfGroups={item?.groupsCount}
                            onClick={() => navigate(`/courses/${item.id}/groups`)}
                            actions={courseActions()}
                            details={item?.templateDetails}
                            actionsContent={
                                <>
                                    {handleEdit && (
                                        <>
                                            <DropdownItem
                                                onClick={() => handleEdit && handleEdit(item.id)}
                                            >
                                                <img src={Images.edit} alt="edit" />
                                                <span>{t('EditCourseName')}</span>
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() => handleDelete && handleDelete(item.id)}
                                            >
                                                <img src={Images.del} alt="delete" />
                                                <span>{t('DeleteCourse')}</span>
                                            </DropdownItem>
                                        </>
                                    )}
                                </>
                            }
                        />
                    ))}

                {!pagination && coursesResults?.hasNextPage && (
                    <ViewBtn
                        value={coursesResults?.totalCount - pageSize || t('more')}
                        onClick={() => navigate(`/courses`)}
                    />
                )}
            </Grid>
            <Grid columns={{ default: 1 }}>
                {pagination && coursesResults?.totalPages !== undefined && coursesResults.totalPages > 1 && (
                    <Pagination
                        currentPage={pageNumber}
                        totalPages={coursesResults?.totalPages || 1}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                    />
                )}
            </Grid>
        </>
    );
};

export default CoursesList;
