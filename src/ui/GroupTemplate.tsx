import styled from 'styled-components';
import CertificateBuilder from './CertificateBuilder';

interface GroupTemplateProps {
    details?: {} | null;
}

const GroupTemplateDiv = styled.div`
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  padding: 1.3rem;
  position: relative;
  @media (width >= 1200px){
    width: 70%;
    margin:0 auto
  }
`;
const GroupTemplate: React.FC<GroupTemplateProps> = ({ details }) => {
    return (
        <GroupTemplateDiv>
            {details && (
                <CertificateBuilder
                    certificateData={details}
                    mode="view"
                    orientation="landscape"
                />
            )}
        </GroupTemplateDiv>
    );
};
export default GroupTemplate;
