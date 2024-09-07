import Tabs from '@/ui/Tabs';
import { useQuery } from '@apollo/client';
import { GET_COURSES_STATUS } from '@/services/courses';
import { useTranslation } from 'react-i18next';
import SkeletonTabs from '@/ui/SkeletonTabs';
import { useEffect } from 'react';

interface CourseStatusCountsProps {
    onTabClick: (tab: { id: number; label: string }) => void;
}

const CourseStatusCounts: React.FC<CourseStatusCountsProps> = ({
    onTabClick,
}) => {
    const { t } = useTranslation();
    const variablesCourse = {
        pageNumber: 1,
        pageSize: 1,
        name: '',
        certificateIssuedStatuses: 'NONE',
    };
    const { loading, error, data, refetch } = useQuery(GET_COURSES_STATUS, {
        variables: variablesCourse,
    });
    useEffect(() => {
        refetch();
    }, [refetch]);
    const tabs = [
        {
            id: 0,
            label: `${t('AllCourses')} (${data?.courses?.coursesResults?.totalCount || 0})`,
        },
        {
            id: 1,
            label: `${t('issued')} (${data?.courses?.coursesStatusesResults?.issued || 0})`,
        },
        {
            id: 2,
            label: `${t('pending')} (${data?.courses?.coursesStatusesResults?.pending || 0})`,
        },
        {
            id: 3,
            label: `${t('rejected')} (${data?.courses.coursesStatusesResults?.rejected || 0})`,
        },
    ];
    if (loading) return <SkeletonTabs />;
    if (error) return <p>{t('Error loading data')}</p>;
    return <Tabs tabs={tabs} onTabClick={onTabClick} />;
};

export default CourseStatusCounts;
