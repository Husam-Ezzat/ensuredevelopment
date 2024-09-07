import React from 'react';
import Stepper from '@/ui/Stepper';
import PageTitle from '@/ui/PageTitle';
import SectionWrapper from '@/ui/SectionWrapper';
import TemplatesList from '@/features/templates/TemplatesList';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const Templates: React.FC = () => {
    const { t } = useTranslation();
    const params = useParams();
    const { groupId, courseId } = params;
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    return (
        <>
            <SectionWrapper>
                <PageTitle title={t('ChooseTemplate')} link="/courses" />
            </SectionWrapper>
            <Stepper
                steps={[
                    t('AddTrainees'),
                    t('ChooseTemplate'),
                    t('GenerateCertificate'),
                ]}
                activeStep={1}
            />
            <PageTitle title={t('ChooseTemplate')} />
            <TemplatesList
                courseId={courseId}
                groupId={groupId}
                pageNumber={pageNumber}
                onNextClick={() => setPageNumber(pageNumber + 1)}
                onPrevClick={() => setPageNumber(pageNumber - 1)}
            />
        </>
    );
};

export default Templates;
