import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

interface RejectionReasonProps {
    date: string;
    reason: string;
    checker: string;
}

const RejectionWrapper = styled.div`
    border: 1px solid var(--color-grey-300);
    padding: 1.25rem;
    width: 100%;
    border-radius: .75rem;
    margin-bottom: 1.5rem;
    h1{
        font-size: 1.5rem;
        color: var(--color-black-500);
        margin-bottom: 1rem;
    }
    p{
        font-size: 1rem;
        color: var(--color-grey-600);
        margin-bottom: 1rem;
    }
    h4{
        font-size: .9rem;
        color: var(--color-black-500);
    }
`;

const RejectionReason: React.FC<RejectionReasonProps> = ({ date, reason, checker }) => {
    const { t } = useTranslation();
    return (
        <RejectionWrapper>
            <h1>{t(`RejectionReason`)}</h1>
            <p>{reason}</p>
            <h4>{`${t(`Created`)} ${date} ${t(`by`)} ${checker}`}</h4>
        </RejectionWrapper>
    )
}
export default RejectionReason;