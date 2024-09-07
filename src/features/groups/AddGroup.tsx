import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ADD_GROUP } from '@/services/groups';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import ModalForm from '@/ui/ModalForm';
import Spinner from '@/ui/Spinner';
import { useNavigate } from 'react-router-dom';
import {
    AddGroupProps,
    AddGroupResponse,
    AddGroupVariables,
} from '@/types/groups';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SubmitEvent = React.FormEvent<HTMLFormElement>;

const AddGroup: React.FC<AddGroupProps> = ({ courseId }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [addGroup, { data, loading, error }] = useMutation<
        AddGroupResponse,
        AddGroupVariables
    >(ADD_GROUP);
    const [groupName, setGroupName] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    const groupChangeHandler = ({ target: { value } }: ChangeEvent) => {
        setGroupName(value);
    };

    const submitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        await addGroup({
            variables: { groupNameAr: groupName, groupNameEn: groupName, courseId },
        });
    };

    useEffect(() => {
        if (data) {
            const { courseId, groupId } = data?.addTraineeGroup?.addTraineeGroupResult;
            navigate(`/courses/${courseId}/groups/${groupId}/trainees`, {
                state: { isNewCourse: true },
            });
        }

        if (error) {
            console.log(error);
        }
    }, [data, error, navigate]);

    const validateInput = () => {
        setIsValid(groupName.trim() !== '');
    };

    useEffect(() => {
        validateInput();
    }, [groupName]);

    return (
        <ModalForm onSubmit={submitHandler}>
            <Input
                id="group"
                variant="secondary"
                label={t('GroupName')}
                type="text"
                height="medium"
                value={groupName}
                placeholder={t(`AddGroupName`)}
                required
                onChange={groupChangeHandler}
            />
            <Button
                variant={isValid ? 'primary' : 'secondary'}
                size="medium"
                width="full"
                disabled={!isValid || loading}
                type="submit"
            >
                {loading ? <Spinner size="1.5rem" /> : t('AddGroup')}
            </Button>
        </ModalForm>
    );
};

export default AddGroup;
