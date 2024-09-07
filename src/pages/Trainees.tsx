import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import SideModal from '@/ui/SideModal';
import { useTranslation } from 'react-i18next';
import AddTrainee from '@/features/trainees/AddTrainee';
import SectionWrapper from '@/ui/SectionWrapper';
import PageTitle from '@/ui/PageTitle';
import Flex from '@/ui/Flex';
import Button from '@/ui/Button';
import Images from '@/common/images';
import Stepper from '@/ui/Stepper';
import { useQuery } from '@apollo/client';
import { GET_TRAINEES_BY_GROUP_ID } from '@/services/trainees';
import Status from '@/ui/Status';
import SubTitle from '@/ui/SubTitle';
import { usePermissions } from '@/hooks/usePermissions';
import { useTraineesStore } from '@/stores/traineesStore';
import * as XLSX from 'xlsx';
import { toast, Toaster } from 'sonner';
import i18next from 'i18next';
import TableSkeleton from '@/ui/TableSkeleton';
import RejectionReason from '@/ui/RejectedReason';
import { TraineesData, Trainee, GroupDetails } from '@/types/trainees';
import TraineesList from '@/features/trainees/TraineesList';
import Tabs from '@/ui/Tabs';
import GroupTemplate from '@/ui/GroupTemplate';



const Trainees: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { traineesActions } = usePermissions();
    const { groupId, courseId } = params;
    const location = useLocation();
    const { isNewCourse } = location.state || {};
    const lang = i18next.language;
    const { t } = useTranslation();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [tab, setTab] = useState<number>(0);
    const pageSize = 6;
    const { traineesList, setTraineesList } =
        useTraineesStore();

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const { loading, error, refetch } = useQuery(GET_TRAINEES_BY_GROUP_ID, {
        variables: {
            groupId: Number(groupId),
            pageNumber: pageNumber,
            pageSize: pageSize,
        },
        onCompleted: (data) => {
            const retrievedData: TraineesData = {
                traineesData: data?.traineeByGroupId?.traineeDetails?.data || [],
                currentPage: data?.traineeByGroupId?.traineeDetails?.currentPage || 1,
                hasNextPage:
                    data?.traineeByGroupId?.traineeDetails?.hasNextPage || false,
                hasPreviousPage:
                    data?.traineeByGroupId?.traineeDetails?.hasPreviousPage || false,
                pageSize: data?.traineeByGroupId?.traineeDetails?.pageSize || 10,
                totalCount: data?.traineeByGroupId?.traineeDetails?.totalCount || 0,
                totalPages: data?.traineeByGroupId?.traineeDetails?.totalPages || 1,
                groupDetails: data?.traineeByGroupId?.groupDetails || {},
            };
            setTraineesList(retrievedData);
        },
    });
    useEffect(() => {
        refetch();
    }
        , [refetch]);
    const handleActionComplete = (
        actionType: 'save' | 'addMore',
        success: boolean
    ) => {
        if (success) {
            toast.success(t('TraineeAddedSuccessfully'), {
                style: {
                    color: 'var(--color-blue-500)',
                    background: 'var(--color-blue-100)',
                    padding: '1rem',
                },
            });
        } else {
            toast.error(t('FaildToAddTrainee'), {
                style: {
                    color: 'var(--color-rejected-500)',
                    background: 'var(--color-rejected-100)',
                    padding: '1rem',
                },
            });
        }

        if (success && actionType === 'save') {
            closeModal();
        }
    };

    useEffect(() => {
        if (isNewCourse) {
            console.log('New course created');
        }
    }, [isNewCourse]);

    const handleGoToBuilder = () => {
        navigate(`/courses/${courseId}/groups/${groupId}/templates`);
    };

    const handleDownloadSample = () => {
        const ws = XLSX.utils.json_to_sheet([
            {
                firstName: '',
                midName: '',
                thirdName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
            },
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Trainees');
        XLSX.writeFile(wb, 'SampleTrainees.xlsx');
    };

    const handleFileUploadClick = () => {
        const fileInput = document.getElementById(
            'file-upload-input'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onerror = () => {
            console.error('Error reading file');
        };

        reader.onload = (evt) => {
            try {
                if (!evt.target?.result) {
                    throw new Error('Failed to read file content');
                }

                const data = new Uint8Array(evt.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                if (!workbook.SheetNames.length) {
                    throw new Error('No sheets found in Excel file');
                }

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json: Partial<Trainee>[] = XLSX.utils.sheet_to_json(sheet, {
                    defval: '',
                });

                const traineesWithIds: Trainee[] = json.map((trainee) => ({
                    id: Math.floor(Math.random() * 100000),
                    email: trainee.email || '',
                    firstName: trainee.firstName || '',
                    lastName: trainee.lastName || '',
                    midName: trainee.midName || '',
                    phoneNumber: trainee.phoneNumber || '',
                    thirdName: trainee.thirdName || '',
                    fullName:
                        `${trainee.firstName} ${trainee.midName} ${trainee.lastName}` || '',
                    groupId: Number(groupId),
                }));

                if (traineesWithIds.length > 0) {
                    // Log the parsed trainees data
                    console.log('Trainees added from Excel:', traineesWithIds);
                } else {
                    console.error('Parsed Excel data is empty or invalid.');
                }
            } catch (error) {
                console.error('Error processing file:', error);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const columns = [
        { header: t('FirstName'), accessor: 'firstName' },
        { header: t('MiddleName'), accessor: 'midName' },
        { header: t('ThirdName'), accessor: 'thirdName' },
        { header: t('LastName'), accessor: 'lastName' },
        { header: t('Email'), accessor: 'email' },
        { header: t('PhoneNumber'), accessor: 'phoneNumber' },
        {
            header: t('Actions'),
            accessor: 'actions',
            render: (row: Trainee) => (
                <div>
                    <button onClick={() => console.log(row)}>
                        <img src={Images.view} alt={t('View')} />
                    </button>
                </div>
            ),
        },
    ];

    if (loading)
        return (
            <SectionWrapper>
                <TableSkeleton columns={columns} />
            </SectionWrapper>
        );
    if (error) return <p>Error loading data</p>;

    const trainees = traineesList?.traineesData || [];
    const totalPages = traineesList?.totalPages || 1;
    const totalCount = traineesList?.totalCount || 0;
    const groupData = traineesList?.groupDetails || ({} as GroupDetails);
    const groupDetails = groupData as GroupDetails;
    console.log('Group Data:', groupData?.templateDetails);
    const tabs = [
        { id: 0, label: t('Traineeslist') },
        { id: 1, label: t('CertficationTemplate') },
    ];
    const tabChangeHandler = (tab: number) => {
        setTab(tab);
    };
    return (
        <>
            <SectionWrapper>
                <Flex direction="row" justify="flex-start" align="center" gap={8}>
                    <PageTitle
                        title={groupData?.courseName || t('trainees')}
                        content={true}
                    />

                    <SubTitle>{`(${groupData?.groupName})`}</SubTitle>
                    <Status
                        status={
                            groupData?.groupStatus == 'Pending'
                                ? 'pending'
                                : groupData?.groupStatus == 'Issued'
                                    ? 'issued'
                                    : ('rejected')
                        }
                    />
                </Flex>
                {groupData?.groupStatus === 'Pending' &&
                    traineesActions() &&
                    !groupData?.templateDetails && (
                        <Stepper
                            steps={[
                                t('AddTrainees'),
                                t('ChooseTemplate'),
                                t('GenerateCertificate'),
                            ]}
                            activeStep={0}
                        />
                    )}
                {groupData?.templateDetails && traineesActions() && (
                    <SectionWrapper>
                        <Tabs tabs={tabs} onTabClick={(tab) => tabChangeHandler(tab?.id)} />
                    </SectionWrapper>
                )}
                {groupData?.groupStatus !== 'Pending' &&
                    groupData?.groupStatus !== 'Issued' && tab === 0 && (
                        <SectionWrapper>
                            <RejectionReason
                                date={groupDetails?.dateRejectionReason?.split('T')[0] || ''}
                                reason={groupDetails?.groupRejectionReason || ''}
                                checker={groupDetails?.personRejectionReason || ''}
                            />
                        </SectionWrapper>
                    )}

                {tab === 0 && (
                    <Flex direction="row" justify="space-between">

                        <PageTitle title={t('trainees')} content={true} />

                        {traineesActions() && groupData?.groupStatus !== 'Issued' && (
                            <Flex direction="row" gap={16}>
                                <Button
                                    onClick={openModal}
                                    variant="tertiary"
                                    size={'small'}
                                    icon={<img src={Images.plus} />}
                                >
                                    {t('AddTraineesManually')}
                                </Button>
                                <Button
                                    variant="tertiary"
                                    size={'small'}
                                    icon={<img src={Images.upload} />}
                                    onClick={handleFileUploadClick}
                                >
                                    {t('UploadTrainees')}
                                </Button>
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileUpload}
                                    id="file-upload-input"
                                    style={{ display: 'none' }}
                                />
                                <Button
                                    onClick={handleDownloadSample}
                                    variant="tertiary"
                                    size={'small'}
                                    icon={<img src={Images.download} />}
                                >
                                    {t('DownloadSample')}
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                )}
            </SectionWrapper>
            {tab === 0 && (
                <TraineesList
                    groupId={Number(groupId)}
                    handleClick={handleGoToBuilder}
                    traineesData={trainees}
                    currentPage={pageNumber}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    setPageNumber={setPageNumber}
                    onNextClick={() => setPageNumber(pageNumber + 1)}
                    onPrevClick={() => setPageNumber(pageNumber - 1)}
                    AssignVisible={!groupData?.templateDetails}
                />
            )}
            {tab === 1 && (
                <SectionWrapper>
                    <GroupTemplate details={groupData?.templateDetails} />
                </SectionWrapper>
            )}

            <SideModal
                title={t('TraineeDetails')}
                isvisible={isModalVisible}
                onClose={closeModal}
            >
                <AddTrainee onActionComplete={handleActionComplete} pageNumber={pageNumber} />
            </SideModal>
            <Toaster position="top-center" dir={lang === 'en' ? 'ltr' : 'rtl'} />
        </>
    );
};

export default Trainees;
