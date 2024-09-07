import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/ui/AuthForm';
import FormHeader from '@/ui/FormHeader';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import { Toaster, toast } from 'sonner';
import i18next from 'i18next';

const StyledLink = styled.a`
  color: var(--color-blue-500);
  font-size: 1rem;
  text-decoration: none;
`;

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SubmitEvent = React.FormEvent<HTMLFormElement>;

const LoginForm: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const lang = i18next.language;
    const from = location.state?.from?.pathname || '/';

    const emailChangeHandler = ({ target: { value } }: ChangeEvent) => {
        setEmail(value);
    };

    const passwordChangeHandler = ({ target: { value } }: ChangeEvent) => {
        setPassword(value);
    };

    const submitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        setLoadingState(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch {
            setLoadingState(false);
            setIsValid(false);
            toast.error(t('invalidUsernameorPassword'), {
                style: {
                    color: 'var(--color-rejected-500)',
                    background: 'var(--color-rejected-100)',
                    padding: '1rem'
                }
            });
        }
    };

    useEffect(() => {
        if (loading) {
            setLoadingState(true);
        }
    }, [loading]);

    const validateInput = () => {
        setLoadingState(false);
        setIsValid(email.trim() !== '' && password.trim() !== '');
    };

    useEffect(() => {
        validateInput();
    }, [email, password]);

    return (
        <>
            <AuthForm onSubmit={submitHandler}>
                <FormHeader
                    title={t('Login')}
                    subtitle={t('noAccount')}
                    link={{ href: '/signup', text: t('SignUp') }}
                />
                <Input
                    id="username"
                    variant="primary"
                    label={t('EmailLogin')}
                    type="text"
                    value={email}
                    height="large"
                    required
                    onChange={emailChangeHandler}
                />
                <Input
                    id="password"
                    variant="primary"
                    label={t('Password')}
                    type="password"
                    height="large"
                    value={password}
                    required
                    onChange={passwordChangeHandler}
                />
                <StyledLink href="forget-password">{t('ForgotPassword')}</StyledLink>
                <Button
                    variant={isValid ? 'primary' : 'secondary'}
                    size="large"
                    width="full"
                    disabled={!isValid}
                    type="submit"
                >
                    {!loadingState ? t('Login') : <Spinner size="1.5rem" />}
                </Button>

            </AuthForm>
            <Toaster position="top-center" dir={lang === 'en' ? 'ltr' : 'rtl'} />

        </>
    );
};

export default LoginForm;
