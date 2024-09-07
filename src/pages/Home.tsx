import React, { useState } from 'react';
import SectionTitle from '@/ui/PageTitle';
import SectionWrapper from '@/ui/SectionWrapper';
import { useTranslation } from 'react-i18next';
import Modal from '@/ui/Modal';
import AddCourse from '@/features/courses/AddCourse';
import CoursesList from '@/features/courses/CoursesList';
import PageTitle from '@/ui/PageTitle';
import EditCourse from '@/features/courses/EditCourse';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster, toast } from 'sonner';
import i18next from 'i18next';
import DashboardStatus from '@/features/courses/DashboardStatus';



const Home: React.FC = () => {
  const { t } = useTranslation();
  const lang = i18next.language;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const { user } = useAuth();
  const userRole = user?.Role as UserRole;

  const handleEdit = (courseId: number) => {
    setSelectedCourseId(courseId);
    setEditModalVisible(true);
  };
  const editHandler = (type: string) => {
    setEditModalVisible(false);
    if (type === 'success') {
      toast.success(t('CourseNameUpdatedSuccessfully'), {
        style: {
          color: 'var(--color-blue-500)',
          background: 'var(--color-blue-100)',
          padding: '1rem'
        }
      });
    } else {
      toast.error(t('FailedToUpdateCourseName'), {
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
      <SectionWrapper>
        <SectionTitle title={t('Analytics')} />
        <DashboardStatus />
      </SectionWrapper>
      <SectionWrapper>
        <PageTitle title={t('Courses')} />
        <CoursesList
          certificateIssuedStatuses="NONE"
          pageNumber={1}
          pageSize={userRole === 'Member' ? 7 : 6}
          onClick={() => setModalVisible(true)}
          handleEdit={handleEdit}
          pagination={false}

        />
      </SectionWrapper>

      <Modal
        onClose={() => setModalVisible(false)}
        title={t(`AddCourseName`)}
        visible={modalVisible}
      >
        <AddCourse />
      </Modal>

      {selectedCourseId && (
        <Modal
          onClose={() => setEditModalVisible(false)}
          title={t(`EditCourseName`)}
          visible={editModalVisible}
        >
          <EditCourse courseId={selectedCourseId} onEdit={(type) => editHandler(type)} />
        </Modal>
      )}
      <Toaster position="top-center" dir={lang === 'en' ? 'ltr' : 'rtl'} />
    </>
  );
};

export default Home;
