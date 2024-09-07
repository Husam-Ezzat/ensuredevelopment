import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Flex from '@/ui/Flex';
import Input from '@/ui/Input';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GET_SIGNATURE_LIST } from '@/services/sign';
import { useSignStore } from '@/stores/signStore';
import i18next from 'i18next';
import Dropdown from '@/ui/Dropdown';
import Images from '@/common/images';
import DropdownItem from '@/ui/DropdownItem';
import Button from '@/ui/Button';
import { LuSearchX } from "react-icons/lu";
import { usePermissions } from '@/hooks/usePermissions';

const SignContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  max-width: 350px;
  width: 100%;
`;

const InputContainer = styled.div`
  width: 100%;
`;
const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;
const H1 = styled.h3`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    color: var(--color-rejected-500);
    opacity: 1;
    margin: 1rem 0 0;
 `;

interface Signature {
    addSignature?: () => void;
}
const SignList: React.FC<Signature> = ({ addSignature }) => {
    const { t } = useTranslation();
    const { signs, setSigns } = useSignStore();
    const lang = i18next.language;
    const { signAMutations } = usePermissions();



    const { data, loading, error, refetch } = useQuery(GET_SIGNATURE_LIST, {
        onCompleted: (data) => {
            setSigns(data.signatureList);
        },
    });
    useEffect(() => {
        refetch();
    }
        , [refetch]);
    useEffect(() => {
        if (data) {
            setSigns(data?.signatureList);
        }
    }, [data, setSigns]);

    if (loading) return <p>{t('Loading...')}</p>;
    if (error) return <p>{t('Error loading signatures')}</p>;


    return (
        <SignContainer>

            {!signs?.length && <H1><LuSearchX size={20} /> {t('NoSignaturesFound')}  </H1>}
            {signs?.map((sign) => {
                return (
                    <Flex
                        direction="row"
                        justify="space-between"
                        align="flex-end"
                        wrap="nowrap"
                        gap={16}
                        key={sign?.id}
                    >
                        <InputContainer>
                            <Input
                                type="text"
                                variant="secondary"
                                placeholder={lang === 'en' ? sign?.nameEn : sign?.nameAr}
                                disabled
                                label={t('SignatureName')}
                            />
                        </InputContainer>
                        <ActionsContainer>
                            <Dropdown
                                trigger={<img src={Images.dots} alt="dots" />}
                                content={
                                    <div>
                                        <DropdownItem onClick={() => console.log('Edit')}>
                                            {t('View')}
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => console.log('Delete')}
                                            type="danger"
                                        >
                                            {t('Delete')}
                                        </DropdownItem>
                                    </div>
                                }
                            />
                        </ActionsContainer>
                    </Flex>
                );
            })}
            {
                signAMutations() && (
                    <Flex direction="row" justify="flex-start" gap={16} wrap='nowrap'>
                        <Button
                            variant="tertiary"
                            onClick={addSignature}
                            size={'medium'}
                            width={150}
                            icon={<img src={Images.add} alt="plus" />}
                        >
                            {t('AddNew')}
                        </Button>
                    </Flex>
                )
            }

        </SignContainer>
    );
};

export default SignList;
