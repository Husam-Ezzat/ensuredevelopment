import styled from "styled-components";
import Flex from "./Flex";
import { useTranslation } from "react-i18next";
import Images from "@/common/images";
import i18next from "i18next";
import SectionWrapper from "./SectionWrapper";

const WrappedText = styled.div`
    font-size: .9rem;
    color: var(--color-grey-600);
    span b {
        color: var(--color-black-500);
        font-weight: 600;
    }
`;

const WrappedButton = styled.div`
    border: 1px solid var(--color-grey-400);
    border-radius: 0.25rem;
    height: 2.063rem;
    color: var(--color-grey-400);
    font-size: .9rem;
    line-height: 2.063rem;
    display: flex;
    flex-wrap: nowrap;
    span {
        width: 1.938rem;
        display: block;
        text-align: center;
        color: var(--color-black-400);
        border-left: 1px solid var(--color-grey-400);
        border-right: 1px solid var(--color-grey-400);
    }
`;

const ArrowBtn = styled.button`
    width: 2.75rem;
    height: 100%;
    background-color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    transition: all .3s ease-in-out;
    &:hover {
        background-color: var(--color-blue-100);
    }
`;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onNextClick: () => void;
    onPrevClick: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNextClick, onPrevClick }) => {
    const { t } = useTranslation();
    const lang = i18next.language;

    return (
        <SectionWrapper>
            <Flex justify="space-between" direction="row" wrap="nowrap">
                <WrappedText>
                    <span>{t(`Showing`)}</span>&nbsp;
                    <span><b>{currentPage}</b></span>&nbsp;
                    <span>{t(`of`)}</span>&nbsp;
                    <span><b>{totalPages}</b></span>
                </WrappedText>
                <WrappedButton>
                    <ArrowBtn onClick={onPrevClick} disabled={currentPage === 1}>
                        <img src={lang === 'en' ? Images.arleft : Images.arRight} alt="left" />
                    </ArrowBtn>
                    <span>{currentPage}</span>
                    <ArrowBtn onClick={onNextClick} disabled={currentPage === totalPages}>
                        <img src={lang === 'ar' ? Images.arleft : Images.arRight} alt="right" />
                    </ArrowBtn>
                </WrappedButton>
            </Flex>
        </SectionWrapper>
    );
};

export default Pagination;