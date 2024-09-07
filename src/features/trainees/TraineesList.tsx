import React, { useState } from 'react';
import Table, { Column } from '@/ui/Table';
import Images from '@/common/images';
import SectionWrapper from '@/ui/SectionWrapper';
import { useTranslation } from 'react-i18next';
import Button from '@/ui/Button';
import Flex from '@/ui/Flex';
import SideModal from '@/ui/SideModal';
import UpdateTrainee from '@/features/trainees/UpdateTrainee';
import { Trainee } from '@/types/trainees';
import Pagination from '@/ui/Pagination';
import { toast, Toaster } from 'sonner';
import i18next from 'i18next';

interface TraineesListProps {
    groupId: number;
    traineesData: Trainee[] | [];
    handleClick?: () => void;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    setPageNumber: (pageNumber: number) => void;
    onNextClick: () => void;
    onPrevClick: () => void;
    AssignVisible?: boolean;
}

const TraineesList: React.FC<TraineesListProps> = ({
    groupId,
    handleClick,
    traineesData = [],
    currentPage,
    totalPages,
    onNextClick,
    onPrevClick,
    AssignVisible = true,
}) => {
    const { t } = useTranslation();
    const [isUpdateModalVisible, setIsUpdateModalVisible] =
        useState<boolean>(false);
    const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
    const lang = i18next.language;
    const handleEdit = (trainee: Trainee) => {
        setSelectedTrainee(trainee);
        setIsUpdateModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsUpdateModalVisible(false);
        setSelectedTrainee(null);
    };
    const onActionComplete = (success: boolean) => {
        if (success) {
            toast.success(t('TraineeDetailsUpdatedSuccessfully'), {
                style: {
                    color: 'var(--color-blue-500)',
                    background: 'var(--color-blue-100)',
                    padding: '1rem',
                },
            });
        } else {
            toast.error(t('FailedToUpdateTraineeDetails'), {
                style: {
                    color: 'var(--color-rejected-500)',
                    background: 'var(--color-rejected-100)',
                    padding: '1rem',
                },
            });
        }
        setIsUpdateModalVisible(false);
        setSelectedTrainee(null);
    };
    const columns: Column[] = [
        { header: t('FirstName'), accessor: 'firstName' },
        { header: t('MiddleName'), accessor: 'midName' },
        { header: t('ThirdName'), accessor: 'thirdName' },
        { header: t('LastName'), accessor: 'lastName' },
        { header: t('Email'), accessor: 'email' },
        { header: t('PhoneNumber'), accessor: 'phoneNumber' },
        {
            header: t('Actions'),
            accessor: 'actions',
            render: (row) => (
                <div>
                    <button onClick={() => handleEdit(row)}>
                        <img src={Images.view} alt={t('View')} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <SectionWrapper>
                <Table columns={columns} data={traineesData} />
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextClick={onNextClick}
                        onPrevClick={onPrevClick}
                    />
                )}
                <SectionWrapper>
                    <Flex justify="flex-end">
                        {traineesData.length >= 1 && AssignVisible && (
                            <Button
                                variant="primary"
                                size="large"
                                width={270}
                                disabled={traineesData.length === 0}
                                onClick={handleClick}
                            >
                                {t('Next')}
                            </Button>
                        )}
                    </Flex>
                </SectionWrapper>
                {selectedTrainee && (
                    <SideModal
                        title={t('UpdateTrainee')}
                        isvisible={isUpdateModalVisible}
                        onClose={handleCloseModal}
                    >
                        <UpdateTrainee
                            trainee={selectedTrainee}
                            onActionComplete={onActionComplete}
                            groupId={groupId}
                        />
                    </SideModal>
                )}
            </SectionWrapper>
            <Toaster position="top-center" dir={lang === 'en' ? 'ltr' : 'rtl'} />
        </>
    );
};

export default TraineesList;
