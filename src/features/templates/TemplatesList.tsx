import React, { useEffect, useState } from 'react';
import Grid from '@/ui/Grid';
import { useQuery } from '@apollo/client';
import { GET_PUBLIC_TEMPLATES } from '@/services/templates';
import TemplateItem from '@/pages/TempleteItem';
import AssignTemplate from './AssignTemplate';
import SkeletonTemplate from '@/ui/SkeletonTemplate';
import Pagination from '@/ui/Pagination';
import SectionWrapper from '@/ui/SectionWrapper';
import { styled } from 'styled-components';

interface TemplatesListProps {
    courseId?: string;
    groupId?: string;
    pageNumber?: number;
    onNextClick: () => void;
    onPrevClick: () => void;
}
const HR = styled.div`
    background-color: var(--color-grey-300);
    margin: 2rem 0 1rem;
    width: 100%;
    height: 1px;
`;

const TemplatesList: React.FC<TemplatesListProps> = ({ courseId, groupId, pageNumber, onNextClick, onPrevClick }) => {
    const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

    const handleTemplateClick = (id: string) => {
        setActiveTemplate(id);
    };

    const { loading, error, data, refetch } = useQuery(GET_PUBLIC_TEMPLATES, {
        variables: {
            pageNumber: pageNumber,
            pageSize: 6,
        },
    });

    useEffect(() => {
        refetch();
    }
        , []);
    if (error) return <p>Error loading data</p>;
    if (loading) return (
        <Grid
            columns={{ default: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
            rowGap="1.5rem"
            columnGap="2rem"
        >
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <SkeletonTemplate key={item} />
            ))}
        </Grid>
    );

    const templateData = data?.publicTemplates?.data || [];
    console.log('templateData', data);
    return (
        <>
            <Grid
                columns={{ default: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
                rowGap="1.5rem"
                columnGap="2rem"
            >
                {templateData.map((item: any) => (
                    <TemplateItem
                        key={item.id}
                        isActive={activeTemplate === item?.id}
                        id={item?.id}
                        orientation={item?.orientationType === 1 ? 'landscape' : 'portrait'}
                        certificateData={item?.details}
                        onClick={() => handleTemplateClick(item?.id)}
                        templateNameAr={item?.templateAr}
                        templateNameEn={item?.templateEn}
                    />
                ))}
            </Grid>

            {data?.publicTemplates?.totalPages > 1 && <HR />}
            <SectionWrapper>
                {data?.publicTemplates?.totalPages > 1 &&
                    <Pagination
                        currentPage={pageNumber || 1}
                        totalPages={data?.publicTemplates?.totalPages}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                    />}
            </SectionWrapper>

            <SectionWrapper>
                <AssignTemplate
                    activeTemplate={activeTemplate ? true : false}
                    groupId={Number(groupId)}
                    courseId={Number(courseId)}
                    templateId={Number(activeTemplate)}
                />
            </SectionWrapper>

        </>
    );
};

export default TemplatesList;
