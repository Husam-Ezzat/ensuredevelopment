import React from 'react';
import { styled } from 'styled-components';

interface ErrorSectionProps {
    image: string;
    title: string;
    subtitle: string;
}
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 80%;
    margin: 0 auto;
`;
const Heading = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 1.5rem;
    color: var(--color-black-500);
`;
const P = styled.p`
    font-size: 1.5rem;
    margin: 0;
    color: var(--color-grey-600);
`;
const Img = styled.img`
    width: calc(50% - 2rem);
`;

const ErrorSection: React.FC<ErrorSectionProps> = ({ image, title, subtitle }) => {
    return (
        <Container>
            <Img src={image} alt="Error" />
            <div>
                <Heading>{title}</Heading>
                <P>{subtitle}</P>
            </div>
        </Container>
    );
};

export default ErrorSection;