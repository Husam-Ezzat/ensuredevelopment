import React, { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import CoursesList from '../features/courses/CoursesList';
import Modal from '../ui/Modal';
import AddCourse from '../features/courses/AddCourse';
import { useTranslation } from 'react-i18next';
import PageTitle from '../ui/PageTitle';
import Flex from '../ui/Flex';
import Input from '../ui/Input';
import Images from '../common/images';
import CourseStatusCounts from '../features/courses/CourseStatusCounts';
import EditCourse from '../features/courses/EditCourse';
import { Toaster, toast } from 'sonner';
import i18next from 'i18next';

const Courses: React.FC = () => {
  const { t } = useTranslation();
  const lang = i18next.language;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<string>('');
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [status, setStatus] = useState<certificateStatus>('NONE');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const tabs = ['NONE', 'ISSUED', 'PENDING', 'REJECTED'];
  const handleTabClick = (tab: { id: number; label: string }) => {
    const tabStatus: certificateStatus = tabs[tab.id] as certificateStatus;
    setStatus(tabStatus);
  };
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
        <Flex align="center" justify="space-between">
          <PageTitle title={t('Courses')} content={true} />
          <Input
            type="text"
            variant="secondary"
            width={300}
            height="small"
            placeholder={t('search')}
            onChange={(e) => setCourseName(e.target.value)}
            icon={<img src={Images.search} alt="search" />}
          />
        </Flex>
      </SectionWrapper>
      <SectionWrapper>
        <CourseStatusCounts onTabClick={handleTabClick} />
      </SectionWrapper>
      <SectionWrapper>
        <CoursesList
          certificateIssuedStatuses={status}
          name={courseName}
          pageNumber={pageNumber}
          pageSize={7}
          handleEdit={handleEdit}
          onClick={() => setModalVisible(true)}
          pagination={true}
          onNextClick={() => setPageNumber(pageNumber + 1)}
          onPrevClick={() => setPageNumber(pageNumber - 1)}
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

export default Courses;
