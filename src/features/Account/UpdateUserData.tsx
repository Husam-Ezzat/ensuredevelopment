
import { useTranslation } from 'react-i18next';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import ModalForm from '@/ui/ModalForm';
import Grid from '@/ui/Grid';
import { useAuth } from '@/contexts/AuthContext';
import Flex from '@/ui/Flex';




// type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
// type SubmitEvent = React.FormEvent<HTMLFormElement>;

const UpdateUserData: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    return (
        <>
            <Grid columns={{ default: 2, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}>
                <ModalForm>
                    <Input
                        id="username"
                        variant="primary"
                        label={t('Email')}
                        type="text"
                        value={user?.Name || ''}
                        height="large"
                        required
                        onChange={() => { }}
                    />
                    <Input
                        id="password"
                        variant="primary"
                        label={t('PhoneNumber')}
                        type="text"
                        height="large"
                        value={user?.PhoneNumber || ''}
                        required
                        onChange={() => { }}
                    />
                    <Flex direction="row" justify="flex-end" align="center" gap={16}>
                        <Button
                            variant={'tertiary'}
                            size='medium'
                            width="relative"
                            disabled={false}
                            type="submit"
                        >
                            {t(`Setanewpassword`)}

                        </Button>
                        <Button
                            variant={'primary'}
                            size='medium'
                            width="relative"
                            disabled={false}
                            type="submit"
                        >
                            {t(`SaveChanges`)}
                        </Button>
                    </Flex>

                </ModalForm>
            </Grid >

        </>
    );
};

export default UpdateUserData;
