import React from "react";
import { useMutation } from "@apollo/client";
import Button from "@/ui/Button";
import Flex from "@/ui/Flex";
import SectionWrapper from "@/ui/SectionWrapper";
import { useTranslation } from "react-i18next";
import { ASSIGN_TEMPLATE_TO_GROUP } from "@/services/templates";
import { toast, Toaster } from "sonner";
import i18next from "i18next";
import Spinner from "@/ui/Spinner";
import { useNavigate } from "react-router-dom";

interface AssignTemplateProps {
    activeTemplate: boolean;
    groupId: number;
    templateId: number;
    courseId?: number;
}

const AssignTemplate: React.FC<AssignTemplateProps> = ({ activeTemplate, groupId, templateId, courseId }) => {
    const { t } = useTranslation();
    const lang = i18next.language;
    const navigate = useNavigate();
    const [assignTemplateToGroup, { loading }] = useMutation(ASSIGN_TEMPLATE_TO_GROUP);

    const handleAssignTemplate = async () => {
        try {
            const response = await assignTemplateToGroup({
                variables: {
                    templateId,
                    traineeGroupId: groupId,
                },
            });
            if (response.data.assignTemplateToGroup.boolean) {
                navigate(`/courses/${courseId}/groups/${groupId}/builder`)
            }
        } catch (error) {
            toast.error(t('FaildToSelectTemplate'), {
                style: {
                    color: 'var(--color-rejected-500)',
                    background: 'var(--color-rejected-100)',
                    padding: '1rem'
                }
            });
        }
    };

    return (
        <SectionWrapper>
            <Flex justify="flex-end">
                <Button
                    variant={activeTemplate ? "primary" : "secondary"}
                    size="large"
                    disabled={!activeTemplate || loading}
                    width={270}
                    onClick={handleAssignTemplate}
                >
                    {loading ? <Spinner size="1.5rem" /> : t('AssignTemplate')}
                </Button>
            </Flex>
            <Toaster position="top-center" dir={lang === 'en' ? 'ltr' : 'rtl'} />

        </SectionWrapper>
    );
};

export default AssignTemplate;