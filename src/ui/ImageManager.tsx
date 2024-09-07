// src/components/ImageManager.tsx
import React from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import { PiTrashThin } from 'react-icons/pi';

const FormContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
`;

const DeleteButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
 transition: all 0.3s ease;
 height: auto;
 max-height: max-content;
 display: flex;
 justify-content: center;
 align-items: center;
    &:hover {
        svg{
            color:var(--color-rejected-500)
        }
    }

`;
const StyledImagePreview = styled.img`
    width:3.5rem;
    max-width: 3.5rem;
    object-fit: contain;
`;
const StyledImageName = styled.p`
    font-size: 0.75rem;
    width: 7rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: var()(--color-black-500);
`;

interface ImageElement {
    id: string;
    src: string;
    x?: number;
    y?: number;
    width: number;
    height: number;
}

interface ImageManagerProps {
    imageElements: ImageElement[];
    addImageElement: (src: string) => void;
    updateImageElement: (
        id: string,
        updatedProperties: Partial<ImageElement>
    ) => void;
    deleteImageElement: (id: string) => void;
}

const ImageManager: React.FC<ImageManagerProps> = ({
    imageElements,
    // addImageElement,
    // updateImageElement,
    deleteImageElement,
}) => {
    // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const src = URL.createObjectURL(e.target.files[0]);
    //         addImageElement(src);
    //     }
    // };

    return (
        <FormContainer>
            {imageElements?.map((element) => (
                <Flex key={element.id} direction="row" wrap="nowrap" align='center' gap={16}>
                    <StyledImagePreview src={element.src} alt="Preview" style={{ width: '100px' }} />
                    <StyledImageName>{element?.src?.split('/')?.pop()}</StyledImageName>
                    <DeleteButton onClick={() => deleteImageElement(element.id)}>
                        <PiTrashThin size={'1.2rem'} />
                    </DeleteButton>
                </Flex>
            ))}
        </FormContainer>
    );
};

export default ImageManager;