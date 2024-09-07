import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Flex from "@/ui/Flex";
import ModalForm from "@/ui/ModalForm";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import Upload from "@/ui/Upload";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SIGNATURE, GET_SIGNATURE_LIST } from "@/services/sign";
import Spinner from "@/ui/Spinner";
import { useSignStore } from '@/stores/signStore';

interface AddSignatureProps {
    onAddSignature?: (success: boolean) => void;
}

const AddSignature: React.FC<AddSignatureProps> = ({ onAddSignature }) => {
    const { t } = useTranslation();
    const [signatureName, setSignatureName] = useState<string>('');
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const { setSigns } = useSignStore();
    const { refetch } = useQuery(GET_SIGNATURE_LIST, {
        skip: true,
    });

    const [addSignature, { loading }] = useMutation(ADD_SIGNATURE, {
        refetchQueries: [{ query: GET_SIGNATURE_LIST }],
        onCompleted: (data) => {
            if (data.addSignature.boolean) {
                refetch();
                setSigns(data?.signatureList);
                if (onAddSignature) {
                    onAddSignature(true);
                    setSignatureName('');
                    setImageBase64(null);
                }
            }
        },
        onError: (error) => {
            console.error('Error adding signature:', error);
            if (onAddSignature) {
                onAddSignature(false);
            }
        }
    });

    const handleAddSignature = async () => {
        try {
            await addSignature({
                variables: {
                    imageUrl: imageBase64,
                    nameAr: signatureName,
                    nameEn: signatureName,
                },
            });
        } catch (error) {
            console.error('Error adding signature:', error);
        }
    };

    const handleImageUpload = (base64Image: string | null) => {
        setImageBase64(base64Image);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (signatureName && imageBase64) {
            handleAddSignature();
        }
    };

    return (
        <>
            <ModalForm onSubmit={handleSubmit}>
                <Input
                    id="SignatureName"
                    variant="primary"
                    label={t("SignatureName")}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t("SignatureName")}
                    required
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                />
                <Upload onImageUpload={handleImageUpload} />
                <Flex justify="flex-end" gap={10} direction="row" wrap="nowrap">
                    <Button
                        variant={signatureName && imageBase64 ? "primary" : "secondary"}
                        size="medium"
                        width={160}
                        disabled={!signatureName || !imageBase64 || loading}
                        type="submit"
                    >
                        {loading ? <Spinner size='1.5rem' /> : t("Save")}
                    </Button>
                </Flex>
            </ModalForm>
        </>
    );
};

export default AddSignature;