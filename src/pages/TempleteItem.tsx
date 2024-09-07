import Images from '@/common/images';
import CertificateBuilder from '@/ui/CertificateBuilder';
import i18next from 'i18next';
import styled from 'styled-components';

interface TemplateItemProps {
  id: string;
  templateNameAr?: string;
  templateNameEn?: string;
  onClick?: (id: string) => void;
  isActive: boolean;
  certificateData: {};
  orientation: 'portrait' | 'landscape';
}

const TemplateContainer = styled.div<{ isActive: boolean; lang: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 1rem;
  position: relative;
  cursor: pointer;
  padding: 1rem;
  background-color: var(--color-grey-400);
  border: 2px solid
    ${(props) =>
    props.isActive ? 'var(--color-blue-500)' : 'var(--color-grey-400)'};
  transition: all 0.3s ease-in-out;
  > img {
    position: absolute;
    top: 1rem;
    ${(props) => (props.lang === 'en' ? 'right: 1rem;' : 'left: 1rem;')};
  }
`;
const SPAN = styled.span<{ isActive: boolean }>`
   font-size: 0.9rem;
    font-weight: 700;
    margin-top: 1rem;
    display: block;
    color: ${(props) =>
    props.isActive ? 'var(--color-blue-500)' : 'var(--color-black-500)'};
`;
const TemplateItem: React.FC<TemplateItemProps> = ({
  id,
  templateNameAr,
  templateNameEn,
  onClick,
  isActive,
  certificateData,
  orientation,
}) => {
  const lang = i18next.language;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ensure the event doesn't bubble up to other elements
    onClick?.(id);
  };

  return (
    <div>
      <TemplateContainer
        isActive={isActive}
        onClick={handleClick}
        lang={lang}
      >
        <CertificateBuilder
          orientation={orientation}
          mode={'view'}
          certificateData={certificateData}
        />

        {isActive && <img src={Images.check} />}
      </TemplateContainer>
      <SPAN isActive={isActive}>{lang === 'en' ? templateNameEn : templateNameAr}</SPAN>
    </div>
  );
};

export default TemplateItem;