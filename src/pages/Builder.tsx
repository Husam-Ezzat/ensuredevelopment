/* eslint-disable */
import CertificateBuilder from "@/ui/CertificateBuilder";
import Flex from "@/ui/Flex";
import PageTitle from "@/ui/PageTitle";
import SectionWrapper from "@/ui/SectionWrapper";
import Stepper from "@/ui/Stepper";
import Button from "@/ui/Button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { GET_TEMPLATE_BY_GROUP_ID } from "@/services/templates";
import { useNavigate, useParams } from "react-router-dom";
import GenerateTemplate from "@/features/builder/GenerateTemplate";
// import { useState } from "react";

const Builder = () => {
    const { t } = useTranslation();
    const params = useParams();
    const { groupId, courseId } = params;
    const navigate = useNavigate();
    // const [exportedJSON, setExportedJSON] = useState(null);  // State to store the exported JSON
    const { loading, error, data } = useQuery(GET_TEMPLATE_BY_GROUP_ID, {
        variables: { groupId: Number(groupId) }
    });

    // const handleJSONExport = (jsonData: any) => {
    //     console.log('Exported JSON:', JSON.stringify(jsonData, null, 2));
    //     setExportedJSON(jsonData);  // Store the exported JSON in state
    // };

    if (loading) {
        return <div>{t('Loading...')}</div>;
    }
    if (error) {
        return <div>{t('Error loading template.')}</div>;
    }

    return (
        <>
            <SectionWrapper>
                <Flex direction="row" justify="space-between">
                    <PageTitle title={t('EditTemplate')} content={true} />
                </Flex>
                <Stepper
                    steps={[t(`AddTrainees`), t(`ChooseTemplate`), t(`GenerateCertificate`)]}
                    activeStep={1}
                />
                <CertificateBuilder
                    orientation={data?.templateByGroupId ? "landscape" : "portrait"}
                    mode="edit"
                    certificateData={data?.templateByGroupId?.details || {}}
                // onExportJSON={handleJSONExport}
                />
            </SectionWrapper>

            <SectionWrapper>
                <Flex justify="flex-end" gap={16}>
                    <Button
                        variant="tertiary"
                        size="medium"
                        width={120}
                        onClick={() => navigate(`/courses/${courseId}/groups/${groupId}/trainees`)}
                    >
                        {t('Back')}
                    </Button>
                    <GenerateTemplate
                        groupId={Number(groupId)}
                        details={data?.templateByGroupId?.details}
                        name={'Certificate'}
                        courseId={Number(courseId)}
                    />
                </Flex>
            </SectionWrapper>
        </>
    );
};

export default Builder;