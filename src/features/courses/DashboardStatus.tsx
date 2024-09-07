import { useQuery } from '@apollo/client';
import { GET_COURSES_STATUS } from '@/services/courses';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import SwiperComponent from '@/ui/SwiperComponent';
import { SwiperOptions } from 'swiper/types';
import AnalyticsBox from '@/ui/AnalyticsBox';
import AnalyticsSkeleton from '@/ui/AnalyticsSkeleton';

const DashboardStatus: React.FC = ({ }) => {
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
    const breakpoints: Record<number, SwiperOptions> = {
        640: { slidesPerView: 2.5, spaceBetween: 10 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 30 },
    };
    const totalCourses = data?.courses?.coursesResults?.totalCount || 0;
    const issuedCourses = data?.courses?.coursesStatusesResults?.issued || 0;
    const pendingCourses = data?.courses?.coursesStatusesResults?.pending || 0;
    const rejectedCourses = data?.courses?.coursesStatusesResults?.rejected || 0;

    // Avoid division by zero by checking totalCourses > 0
    const issuedPercentage =
        totalCourses > 0 ? (issuedCourses / totalCourses) * 100 : 0;
    const pendingPercentage =
        totalCourses > 0 ? (pendingCourses / totalCourses) * 100 : 0;
    const rejectedPercentage =
        totalCourses > 0 ? (rejectedCourses / totalCourses) * 100 : 0;
    const elements = [
        <AnalyticsBox
            title={t('AllCourses')}
            number={totalCourses}
            percentage={100}
            status="all"
        />,
        <AnalyticsBox
            title={t('issued')}
            number={issuedCourses}
            percentage={parseFloat(issuedPercentage.toFixed(2))}
            status="issued"
        />,
        <AnalyticsBox
            title={t('pending')}
            number={pendingCourses}
            percentage={parseFloat(pendingPercentage.toFixed(2))}
            status="pending"
        />,
        <AnalyticsBox
            title={t('rejected')}
            number={rejectedCourses}
            percentage={parseFloat(rejectedPercentage.toFixed(2))}
            status="rejected"
        />,
    ];
    if (loading)
        return (
            <SwiperComponent
                breakpoints={breakpoints}
                elements={[
                    <AnalyticsSkeleton />,
                    <AnalyticsSkeleton />,
                    <AnalyticsSkeleton />,
                    <AnalyticsSkeleton />,
                ]}
                options={{ loop: true, navigation: false }}
            />
        );
    if (error) return <p>{t('Error loading data')}</p>;
    return (
        <>
            <SwiperComponent
                breakpoints={breakpoints}
                elements={elements}
                options={{ loop: true, navigation: false }}
            />
        </>
    );
};

export default DashboardStatus;
