import React, { useState } from 'react';
import SectionWrapper from '@/ui/SectionWrapper';
import PageTitle from '@/ui/PageTitle';
import { useTranslation } from 'react-i18next';
import Tabs from '@/ui/Tabs';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/ui/Input';
import Images from '@/common/images';
import Button from '@/ui/Button';
import Flex from '@/ui/Flex';
import UsersList from '@/features/Account/UsersList';
import UpdateUserData from '@/features/Account/UpdateUserData';
import SignList from '@/features/sign/SignList';
import SideModal from '@/ui/SideModal';
import AddSignature from '@/features/sign/AddSignature';
import { toast, Toaster } from 'sonner';
import i18next from 'i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const lang = i18next.language;

  // Corrected the type to boolean for success/failure
  const onAddSignature = (type: boolean) => {
    if (type) {
      toast.success(t('SignatureAddedSuccessfully'), {
        style: {
          color: 'var(--color-blue-500)',
          background: 'var(--color-blue-100)',
          padding: '1rem',
        },
      });
      setIsModalVisible(false);
    } else {
      toast.error(t('FailedToAddSignature'), {
        style: {
          color: 'var(--color-rejected-500)',
          background: 'var(--color-rejected-100)',
          padding: '1rem',
        },
      });
    }

  };

  const isAdmin = user?.Role === 'Admin';

  const tabs = [
    {
      id: 0,
      label: isAdmin ? t(`OrganizationProfile`) : t(`profile`),
    },
    {
      id: 1,
      label: isAdmin ? t(`ManageTeam`) : t(`TeamMembers`),
    },
    {
      id: 2,
      label: t(`SignaturesList`),
    },
    {
      id: 3,
      label: isAdmin ? t(`ManageSubscriptions`) : t(`Subscriptions`),
    },
  ];

  const handleTabClick = (tab: { id: number }) => {
    setActiveTab(tab.id);
  };

  return (
    <>
      <SectionWrapper>
        <PageTitle title={t(`profile`)} />
      </SectionWrapper>
      <SectionWrapper>
        <Tabs tabs={tabs} onTabClick={handleTabClick} />
        {activeTab === 0 && <UpdateUserData />}
        {activeTab === 1 && (
          <>
            <Flex direction='row' justify="space-between" align='center'>
              <Input
                type="text"
                variant="secondary"
                width={300}
                height="small"
                placeholder={t('search')}
                icon={<img src={Images.search} alt="search" />}
              />
              <Button
                variant="tertiary"
                size="small"
                icon={<img src={Images.plus} alt="plus" />}
              >
                {t('AddNew')}
              </Button>
            </Flex>
            <UsersList />
          </>
        )}
        {activeTab === 2 && (
          <SignList addSignature={() => setIsModalVisible(true)} />
        )}
      </SectionWrapper>
      <SideModal
        title={t('AddNewSignature')}
        isvisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <AddSignature onAddSignature={onAddSignature} />
      </SideModal>
      <Toaster position="top-center" dir={lang === 'en' ? 'ltr' : 'rtl'} />
    </>
  );
};

export default Profile;