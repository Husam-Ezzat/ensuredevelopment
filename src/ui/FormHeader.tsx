import styled from "styled-components";
import Flex from "./Flex";

interface FormHeaderProps {
    title: string;
    subtitle: string;
    link?: { href: string; text: string };

}

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    color: var(--color-black-400);
`;
const Subtitle = styled.p`
    font-size: 1rem;
    color: var(--color-black-600);
`;
const Link = styled.a`
  color: var(--color-blue-500);
  font-size: 1rem;
  text-decoration: underline;
`;

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, link }) => {
    return (
        <Flex direction="row" justify="space-between" align="center">
            <Title>{title}</Title>
            <Flex direction="row" gap={5}>
                <Subtitle>{subtitle}</Subtitle>
                {link && <Link href={link?.href}>{link?.text}</Link>}
            </Flex>
        </Flex>

    );
};
export default FormHeader;