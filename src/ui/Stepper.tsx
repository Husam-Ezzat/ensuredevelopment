import i18next from 'i18next';
import { styled } from 'styled-components';

interface StepperProps {
    steps: string[];
    activeStep: number;
}

const StyledStepper = styled.div<{ lang: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:2rem 0;
  position: relative;
  width: 100%;

  .step {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-grey-500);
    max-width: fit-content; 
    background-color: var(--color-grey-0);
    z-index: 3;
    padding: ${({ lang }) => (lang === 'ar' ? '0 0 0 1rem' : '0 1rem 0 0')};
    &::before{
        content: '';
        width: 1rem;
        height: 100%;
        position: absolute;
        top: 0;
        left: ${({ lang }) => (lang === 'ar' ? '0' : '-1rem')};
        right: ${({ lang }) => (lang === 'ar' ? '-1rem' : '0')};
        background-color: var(--color-grey-0);
    }
    &.active {
      color: var(--color-blue-500);
    }
  }
`;
const StyledLine = styled.div<{ activeStep: number }>`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--color-grey-300);
    z-index: 1;
    span{
        display: block;
        width: calc(${({ activeStep }) => `${(activeStep / 2) * 100}%`} - 1rem);
        height:1px;
        background-color: var(--color-blue-500);
    }
    `;

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
    const lang = i18next.language;
    return (
        <StyledStepper className="stepper" lang={lang}>
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`step ${activeStep >= index ? 'active' : ''}`}

                >
                    {step}

                </div>
            ))}
            <StyledLine activeStep={activeStep}>
                <span></span>
            </StyledLine>
        </StyledStepper>
    );
};

export default Stepper;
