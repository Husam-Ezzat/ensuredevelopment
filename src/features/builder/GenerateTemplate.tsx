/* eslint-disable */
import Button from "@/ui/Button";
import { useMutation } from "@apollo/client";
import { GENERATE_TEMPLATE_BY_GROUP_ID } from "@/services/builder";
import { useTranslation } from "react-i18next";
import Spinner from "@/ui/Spinner";
import { useNavigate } from "react-router-dom";

interface GenerateTemplateProps {
    groupId: number;
    details: any;
    name: string;
    courseId: number;
}

const GenerateTemplate: React.FC<GenerateTemplateProps> = ({ groupId, details, name, courseId }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [addTemplate, { loading }] = useMutation(GENERATE_TEMPLATE_BY_GROUP_ID, {
        variables: { details: details, groupId: groupId, name: name }
    });

    const handleGenerateTemplate = async () => {
        try {
            const { data } = await addTemplate();
            if (data.addCertificateGenerator.boolean) {
                navigate(`/courses/${courseId}/groups/${groupId}/trainees`);
            }
        } catch (error) {
            console.error('Error generating template:', error);
        }
    }

    return (
        <Button
            variant="primary"
            size="medium"
            width={270}
            onClick={handleGenerateTemplate}
        >
            {loading ? <Spinner size="16px" /> : t('GenerateCertificate')}
        </Button>
    );
}

export default GenerateTemplate;