// src/components/TextManager.tsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import { PiTrashThin } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

const FormContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const InputField = styled.textarea`
  width: 100%;
  border: 1px solid var(--color-grey-400);
  min-height: 2.5rem;
  border-radius: 0.5rem;
  outline: none;
  padding: 0.5rem;
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
    svg {
      color: var(--color-rejected-500);
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TagButton = styled.button`
  background-color: var(--color-issued-100);
  color: var(--color-grey-900);
  border: 1px solid var(--color-issued-100);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-issued-100);
  }
`;

interface TextElement {
    id: string;
    text: string;
}

interface TextManagerProps {
    textElements: TextElement[];
    addTextElement: () => void;
    updateTextElement: (
        id: string,
        updatedProperties: Partial<TextElement>
    ) => void;
    deleteTextElement: (id: string) => void;
}

const TextManager: React.FC<TextManagerProps> = ({
    textElements,
    updateTextElement,
    deleteTextElement,
}) => {
    const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { t } = useTranslation();
    const tags = [
        t('FirstName'),
        t('MiddleName'),
        t('LastName'),
        t('ThirdName'),
        t('Email'),
    ];

    const handleTagClick = (tag: string) => {
        const tagWithBrackets = `{${tag}}`;
        if (focusedElementId && textareaRef.current) {
            const element = textElements.find((el) => el.id === focusedElementId);
            if (element) {
                const { selectionStart, selectionEnd } = textareaRef.current;
                const newText =
                    element.text.substring(0, selectionStart) +
                    tagWithBrackets +
                    element.text.substring(selectionEnd);
                updateTextElement(focusedElementId, { text: newText });
                setTimeout(() => {
                    textareaRef.current?.focus();
                    textareaRef.current?.setSelectionRange(
                        selectionStart + tagWithBrackets.length,
                        selectionStart + tagWithBrackets.length
                    );
                }, 0);
            }
        }
    };

    return (
        <>
            <TagsContainer>
                {tags.map((tag, index) => (
                    <TagButton key={index} onClick={() => handleTagClick(tag)}>
                        {t(tag)}
                    </TagButton>
                ))}
            </TagsContainer>
            <FormContainer>
                {textElements?.map((element) => (
                    <Flex key={element.id} direction="row" wrap="nowrap" gap={16}>
                        <InputField
                            ref={focusedElementId === element.id ? textareaRef : null}
                            value={element.text}

                            onFocus={() => setFocusedElementId(element.id)}
                            onChange={(e) =>
                                updateTextElement(element.id, { text: e.target.value })
                            }
                            placeholder="Enter text here"
                        />
                        <DeleteButton onClick={() => deleteTextElement(element.id)}>
                            <PiTrashThin size={'1.2rem'} />
                        </DeleteButton>
                    </Flex>
                ))}
            </FormContainer>
        </>
    );
};

export default TextManager;
