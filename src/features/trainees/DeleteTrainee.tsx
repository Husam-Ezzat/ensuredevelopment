import React from 'react';
import Images from '@/common/images';
import Button from '@/ui/Button';
import { useTranslation } from 'react-i18next';
import { useTraineesStore } from "@/stores/traineesStore";
import { DELETE_TRAINEE } from "@/services/trainees";
import { useMutation } from '@apollo/client';
import Spinner from '@/ui/Spinner';

interface DeleteTraineeProps {
    id: number;
    onActionComplete?: (success: boolean) => void;
}

const DeleteTrainee: React.FC<DeleteTraineeProps> = ({ id, onActionComplete }) => {
    const { t } = useTranslation();
    const { removeTrainee } = useTraineesStore();

    const [deleteTrainee, { loading }] = useMutation(DELETE_TRAINEE, {
        variables: { id },
        onCompleted: (data) => {
            if (data?.deleteTrainee?.boolean) {
                onActionComplete && onActionComplete(true);
                removeTrainee(id);
            }
        },
        onError: (error) => {
            console.log('Error deleting trainee:', error);
            onActionComplete && onActionComplete(true);
        },
    });

    const handleDelete = () => {
        if (loading) return;
        deleteTrainee();
    };

    return (
        <Button
            key={'delete'}
            variant={loading ? "secondary" : "tertiary"}
            size="small"
            icon={loading ? '' : <img src={Images.del} />}
            onClick={handleDelete}
            disabled={loading}
            width={120}
        >
            {loading ? <Spinner size='1.5rem' /> : t(`Delete`)}
        </Button>
    );
};

export default DeleteTrainee;