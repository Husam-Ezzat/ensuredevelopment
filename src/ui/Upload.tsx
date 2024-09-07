import React, { useState } from "react";
import Images from "@/common/images";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

interface UploadProps {
    onImageUpload: (base64Image: string | null) => void;
}

const UploadContainer = styled.div`
  border: 1px dashed var(--color-grey-300);
  background-color: var(--color-grey-200);
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.9rem;
  border-radius: 0.5rem;
  position: relative;
  cursor: pointer;

  span {
    color: var(--color-grey-600);
    font-size: 0.9rem;
  }
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: auto;
  margin-top: 1rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const Upload: React.FC<UploadProps> = ({ onImageUpload }) => {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                onImageUpload(base64String);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <UploadContainer>
            <img src={Images.uploadInput} alt="upload" />
            <div>
                <span>
                    <b>{t(`Clicktoupload`)}</b>
                </span>
                &nbsp;
                <span>{t(`ordraganddrop`)}</span>
            </div>
            <HiddenInput type="file" accept="image/*" onChange={handleFileChange} />
            {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
        </UploadContainer>
    );
};

export default Upload;