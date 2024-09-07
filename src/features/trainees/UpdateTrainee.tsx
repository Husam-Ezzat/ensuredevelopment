import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Flex from '@/ui/Flex';
import ModalForm from '@/ui/ModalForm';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import { Trainee } from '@/types/trainees';
import { useTraineesStore } from '@/stores/traineesStore';
import { UPDATE_TRAINEE } from '@/services/trainees';
import DeleteTrainee from './DeleteTrainee';

interface UpdateTraineeProps {
    trainee: Trainee;
    groupId: number;
    onActionComplete?: (success: boolean) => void;
}

const UpdateTrainee: React.FC<UpdateTraineeProps> = ({ trainee, groupId, onActionComplete }) => {
    const { t } = useTranslation();
    const { updateTrainee } = useTraineesStore();

    const [firstName, setFirstName] = useState(trainee.firstName);
    const [midName, setMidName] = useState(trainee.midName);
    const [thirdName, setThirdName] = useState(trainee.thirdName);
    const [lastName, setLastName] = useState(trainee.lastName);
    const [email, setEmail] = useState(trainee.email);
    const [phoneNumber, setPhoneNumber] = useState(trainee.phoneNumber);

    const [updateTraineeMutation, { loading }] = useMutation(UPDATE_TRAINEE, {
        onCompleted: (data) => {
            if (data?.updateTrainee?.boolean) {
                updateTrainee(trainee.id, {
                    firstName,
                    midName,
                    thirdName,
                    lastName,
                    email,
                    phoneNumber,
                });
                onActionComplete && onActionComplete(true);
            }
        },
        onError: (error) => {
            onActionComplete && onActionComplete(false);
            console.error('Error updating trainee:', error);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateTraineeMutation({
            variables: {
                id: trainee.id,
                email,
                firstName,
                fullName: `${firstName} ${midName} ${lastName}`,
                lastName,
                midName,
                phoneNumber,
                thirdName,
                traineeGroupId: groupId,
            },
        });
    };

    return (
        <ModalForm onSubmit={handleSubmit}>

            <Flex justify="space-between" gap={10} direction="row" wrap="nowrap">
                <Input
                    id="FirstName"
                    variant="secondary"
                    label={t('FirstName')}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t('FirstName')}
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    id="MiddleName"
                    variant="secondary"
                    label={t('MiddleName')}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t('MiddleName')}
                    required
                    value={midName}
                    onChange={(e) => setMidName(e.target.value)}
                />
            </Flex>
            <Flex justify="space-between" gap={10} direction="row" wrap="nowrap">
                <Input
                    id="ThirdName"
                    variant="secondary"
                    label={t('ThirdName')}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t('ThirdName')}
                    required
                    value={thirdName}
                    onChange={(e) => setThirdName(e.target.value)}
                />
                <Input
                    id="LastName"
                    variant="secondary"
                    label={t('LastName')}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t('LastName')}
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Flex>
            <Input
                id="Email"
                variant="secondary"
                label={t('Email')}
                type="email"
                height="medium"
                width="100%"
                placeholder={t('Email')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                id="PhoneNumber"
                variant="secondary"
                label={t('PhoneNumber')}
                type="text"
                height="medium"
                width="100%"
                placeholder={t('PhoneNumber')}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Flex justify="flex-end" gap={10} direction="row" wrap="nowrap">
                <DeleteTrainee id={trainee?.id} key={'delete'} />
                <Button
                    key={'save'}
                    variant="primary"
                    size="medium"
                    width={160}
                    disabled={loading}
                    type="submit"
                >
                    {loading ? <Spinner size="1.5rem" /> : t('Save')}
                </Button>
            </Flex>
        </ModalForm>
    );
};

export default UpdateTrainee;