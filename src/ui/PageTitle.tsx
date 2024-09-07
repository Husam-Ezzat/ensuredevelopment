import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import i18n from 'i18next';

interface SectionTitleProps {
  title: string;
  link?: string;
  content?: boolean;
}

const StyledTitle = styled.h2<{ content?: boolean }>`
  font-size: 1.5rem;
  color: var(--color-black-500);
  margin-bottom: ${({ content }) => (content ? '0' : '1.4rem')};

  @media (width < 768px) {
    font-size: 1.125rem;
  }
`;

const StyledLink = styled(Link)`
  color: var(--color-black-500);
  display: flex;
  align-items: center;
  text-decoration: none;
  column-gap: 0.5rem;
`;

const StyledArrow = styled(IoIosArrowBack) <{ lang: string }>`
  margin-bottom: 1.4rem;
  transform: ${({ lang }) => (lang === 'ar' ? 'rotate(180deg)' : 'none')};
`;

const PageTitle: React.FC<SectionTitleProps> = ({ title, link, content }) => {
  const lang = i18n.language;
  return link ? (
    <StyledLink to={link}>
      <StyledArrow lang={lang} size={40} />
      <StyledTitle content={content}>{title}</StyledTitle>
    </StyledLink>
  ) : (
    <StyledTitle content={content}>{title}</StyledTitle>
  );
};

export default PageTitle;
