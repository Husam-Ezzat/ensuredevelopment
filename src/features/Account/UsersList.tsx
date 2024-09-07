import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/services/users';
import Table, { Column } from '@/ui/Table';
import Images from '@/common/images';
import SectionWrapper from '@/ui/SectionWrapper';
import { useTranslation } from 'react-i18next';

interface UsersListProps {
    pageNumber?: number;
    pageSize?: number;
    userName?: string;
}

const UsersList: React.FC<UsersListProps> = ({ pageNumber = 1, pageSize = 10 }) => {
    const { t } = useTranslation();
    const { loading, error, data } = useQuery(GET_USERS, {
        variables: {
            pageNumber: pageNumber,
            pageSize: pageSize,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    const usersData = data?.users?.data || [];

    const handleEdit = (id: number) => {
        console.log(`Edit trainee with ID: ${id}`);
    };


    const columns: Column[] = [
        { header: t('UserName'), accessor: 'userName' },
        { header: t('Email'), accessor: 'email' },
        { header: t('Role'), accessor: 'role' },
        {
            header: t('Actions'),
            accessor: 'actions',
            render: (row) => (
                <div>
                    <button onClick={() => handleEdit(row.id)}>
                        <img src={Images.edit} alt="edit" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <SectionWrapper>

            {
                usersData && <Table columns={columns} data={usersData} />
            }
        </SectionWrapper>
    );
};

export default UsersList;



