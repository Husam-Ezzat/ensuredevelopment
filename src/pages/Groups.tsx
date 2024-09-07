import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupsList from '@/features/groups/GroupsList';
import Modal from '@/ui/Modal';
import AddGroup from '@/features/groups/AddGroup';
import { useTranslation } from 'react-i18next';
import EditGroup from '@/features/groups/EditGroup';
import { Toaster, toast } from 'sonner';
import i18next from 'i18next';

const Groups: React.FC = () => {
    const { t } = useTranslation();
    const lang = i18next.language;
    const { courseId } = useParams<{ courseId: string }>();
    const groupId = courseId ? parseInt(courseId, 10) : null;
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [editGroupVisibile, setEditGroupVisible] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleEdit = (gId: number, cId: number) => {
        setSelectedGroupId(gId);
        setSelectedCourseId(cId);
        setEditGroupVisible(true);
    }
    if (!groupId) {
        return <p>Invalid course ID</p>;
    }
    const editHandler = (type: string) => {
        setEditGroupVisible(false);
        if (type === 'success') {
            toast.success(t('GroupNameUpdatedSuccessfully'), {
                style: {
                    color: 'var(--color-blue-500)',
                    background: 'var(--color-blue-100)',
                    padding: '1rem'
                }
            });
        } else {
            toast.error(t('FailedToUpdateGroupName'), {
                style: {
                    color: 'var(--color-rejected-500)',
                    background: 'var(--color-rejected-100)',
                    padding: '1rem'
                }
            });
        }
    };
    return (
        <>
            <GroupsList
                groupId={groupId}
                pageNumber={1}
                pageSize={7}
                pagination={false}
                name=''
                handleEdit={handleEdit}
                onClick={() => setModalVisible(true)}
            />

            <Modal
                onClose={() => setModalVisible(false)}
                title={t(`CretaeGroupName`)}
                visible={modalVisible}
            >
                <AddGroup courseId={groupId} />
            </Modal>
            {editGroupVisibile && selectedCourseId && selectedGroupId && (
                <Modal
                    onClose={() => setEditGroupVisible(false)}
                    title={t('EditCourseName')}
                    visible={editGroupVisibile}
                >
                    <EditGroup
                        courseId={selectedCourseId}
                        groupId={selectedGroupId}
                        onEdit={editHandler}
                    />
                </Modal>
            )}
            <Toaster position="top-center" dir={lang === 'en' ? 'ltr' : 'rtl'} />
        </>
    );
};

export default Groups;
