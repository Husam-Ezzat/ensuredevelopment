import React, { useEffect } from 'react';
import SectionWrapper from '@/ui/SectionWrapper';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Grid from '@/ui/Grid';
import { useNavigate } from 'react-router-dom';
import PageTitle from '@/ui/PageTitle';
import { GET_TRAINEE_GROUP_BY_COURSE_ID } from '@/services/groups';
import CreateBtn from '@/ui/CreateBtn';
import { usePermissions } from '@/hooks/usePermissions';
import SkeletonCard from '@/ui/SkeletonCard';
import { useGroupsStore } from '@/stores';
import {
    GroupsListProps,
    GetTraineeGroupByCourseIdResponse,
    GetTraineeGroupByCourseIdVariables,
} from '@/types/groups';
import Course from '@/ui/Course';
import DropdownItem from '@/ui/DropdownItem';
import Images from '@/common/images';

const GroupsList: React.FC<GroupsListProps> = ({
    groupId,
    onClick,
    handleDelete,
    handleEdit,
    pageNumber

}) => {
    const { t } = useTranslation();
    const { groupActions } = usePermissions();
    const navigate = useNavigate();

    const setGroups = useGroupsStore((state) => state.setGroups);
    const groups = useGroupsStore((state) => state.groups);
    console.log(groups);
    const { loading, error, refetch } = useQuery<
        GetTraineeGroupByCourseIdResponse,
        GetTraineeGroupByCourseIdVariables
    >(GET_TRAINEE_GROUP_BY_COURSE_ID, {
        variables: { courseId: groupId },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setGroups(data?.geTraineeGroupByCourseId);
        },
    });

    useEffect(() => {
        refetch();
    }, [groupId, refetch, pageNumber]);
    console.log(groups);

    if (loading) {
        return (
            <SectionWrapper>
                <PageTitle title={t('groups')} />
                <Grid columns={{ default: 2, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </Grid>
            </SectionWrapper>
        );
    }

    if (error) return <p>{t('Error loading data')}</p>;
    return (
        <SectionWrapper>
            <PageTitle title={groups[0]?.courseName || t('groups')} />
            <Grid columns={{ default: 2, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}>
                {groupActions() && (
                    <CreateBtn
                        title={t(`CreateNewGroup`)}
                        onClick={onClick || (() => { })}
                    />
                )}

                {groups?.map((item) => (
                    <Course
                        courseName={item?.groupNameEn}
                        details={item?.templateDetails}
                        key={item.id}
                        status={item?.status.toLowerCase() === 'pending' ? 'pending' :
                            item?.status.toLowerCase() === 'issued' ? 'issued' : 'rejected'}
                        numberOfStudents={`${item?.traineeNumbers || 0} ${t(`trainees`)}`}
                        onClick={() =>
                            navigate(`/courses/${item?.courseId}/groups/${item.id}/trainees`)
                        }
                        actions={groupActions()}
                        actionsContent={
                            handleEdit && <>
                                <DropdownItem onClick={() => handleEdit && handleEdit(item?.id, item?.courseId)}>
                                    <img src={Images.edit} alt="edit" />
                                    <span>{t('editGroupName')}</span>
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDelete && handleDelete(item?.id)}>
                                    <img src={Images.del} alt="delete" />
                                    <span>{t('deleteGroup')}</span>
                                </DropdownItem>
                            </>
                        }
                    />
                ))}
            </Grid>
        </SectionWrapper>
    );
};

export default GroupsList;
