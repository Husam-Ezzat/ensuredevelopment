import styled, { keyframes } from "styled-components";

const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Container = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  min-height: 200px;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-300);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 1.5rem;
  transition: all 0.3s ease;
 
`;

const Header = styled.div`
  height: 1.2rem;
  width: 50%;
  background-color: var(--color-grey-100);
  border-radius: 0.25rem;
  background: linear-gradient(
    90deg,
    var(--color-grey-200) 25%,
    var(--color-grey-300) 50%,
    var(--color-grey-200) 75%
  );
  background-size: 200% 100%;
  animation: ${skeletonLoading} 1.5s infinite ease-in-out;
`;

const Body = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--color-grey-100);
  border-radius: 0.25rem;
  background: linear-gradient(
    90deg,
    var(--color-grey-200) 25%,
    var(--color-grey-300) 50%,
    var(--color-grey-200) 75%
  );
  background-size: 200% 100%;
  animation: ${skeletonLoading} 1.5s infinite ease-in-out;
`;

const Footer = styled.div`
  height: 1.2rem;
  width: 100%;
  background-color: var(--color-grey-100);
  border-radius: 0.25rem;
  background: linear-gradient(
    90deg,
    var(--color-grey-200) 25%,
    var(--color-grey-300) 50%,
    var(--color-grey-200) 75%
  );
  background-size: 200% 100%;
  animation: ${skeletonLoading} 1.5s infinite ease-in-out;
`;

const SkeletonCard = () => {
  return (
    <Container>
      <Header />
      <Body />
      <Footer />
    </Container>
  );
};

export default SkeletonCard;
