// src/components/TextTooltip.tsx
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: absolute;
  background-color: white;
  padding: 0.5rem;
  top: 0.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: nowrap;
  border-radius: 0.4rem;
`;

const Dropdown = styled.select<{ fontawsome: boolean }>`
  margin: 0;
  padding: 5px;
  border: 1px solid var(--color-grey-300);
  padding: 0.25rem;
  max-width: 100px;
  border-radius: 0.125rem;
  outline: none;
  font-family: ${({ fontawsome }) => (fontawsome ? 'FontAwesome' : 'inherit')};
  option {
    font-family: ${({ fontawsome }) =>
    fontawsome ? 'Font Awesome 5 Free' : 'inherit'};
    font-weight: ${({ fontawsome }) => (fontawsome ? '900' : 'normal')};
  }
`;

const ColorPicker = styled.input`
  margin: 0;
  padding: 5px;
  border: none;
  padding: 0;
  width: 2rem;
  height: 2rem;
  border: none;
  border-color: transparent;

  border-radius: 0;
  background-color: inherit;
  ::-moz-color-swatch {
    border: none;
  }
  ::-webkit-color-swatch-wrapper {
    border: none;
  }
  ::-webkit-color-swatch {
    border: none;
  }
  ::-webkit-color-swatch,
  ::-moz-color-swatch {
    border-color: transparent;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const Button = styled.button<{ type: 'italic' | 'bold' | 'underlined' }>`
  padding: 0;
  cursor: pointer;
  background: inherit;
  border: none;
  font-size: 1.125rem;
  font-weight: 100;
  b, i, u{
    font-weight: normal;
  }
 
`;

interface TextTooltipProps {
  onClose: () => void;
  onFontChange: (fontFamily: string) => void;
  onFontSizeChange: (fontSize: number) => void;
  onColorChange: (color: string) => void;
  onBoldToggle: () => void;
  onItalicToggle: () => void;
  onUnderlineToggle: () => void;
  onAlignChange: (align: string) => void;
  onListChange: (listType: string) => void;
  style?: React.CSSProperties;
  initialFontFamily?: string;
  initialFontSize?: any;
  initialColor?: string;
  initialAlign?: string;
  initialListType?: string;
}

const TextTooltip: React.FC<TextTooltipProps> = ({
  onClose,
  onFontChange,
  onFontSizeChange,
  onColorChange,
  onBoldToggle,
  onItalicToggle,
  onUnderlineToggle,
  onAlignChange,
  onListChange,
  style,
  initialFontFamily,
  initialFontSize,
  initialColor,
  initialAlign,
  initialListType,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <TooltipContainer ref={ref} style={style}>
      <Dropdown
        value={initialFontFamily}
        onChange={(e) => onFontChange(e.target.value)}
        fontawsome={false}
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Garamond">Garamond</option>
        <option value="Palatino">Palatino</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Impact">Impact</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Calibri">Calibri</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Lucida Sans">Lucida Sans</option>
        <option value="Monaco">Monaco</option>
        <option value="Futura">Futura</option>
        <option value="Century Gothic">Century Gothic</option>
        <option value="Roboto">Roboto</option>
        <option value="Open Sans">Open Sans</option>
        <option value="Lato">Lato</option>
        <option value="Montserrat">Montserrat</option>
      </Dropdown>
      <Dropdown
        value={initialFontSize}
        onChange={(e) => onFontSizeChange(e.target.value as any)}
        fontawsome={false}
      >
        <option value={8}>8</option>
        <option value={10}>10</option>
        <option value={12}>12</option>
        <option value={14}>14</option>
        <option value={16}>16</option>
        <option value={18}>18</option>
        <option value={20}>20</option>
        <option value={24}>24</option>
        <option value={32}>32</option>
        <option value={48}>48</option>
        <option value={64}>64</option>
      </Dropdown>
      <ColorPicker
        value={initialColor}
        type="color"
        onChange={(e) => onColorChange(e.target.value)}
      />

      <ButtonGroup>
        <Button onClick={onBoldToggle} type="bold">
          <b>B</b>
        </Button>
        <Button onClick={onItalicToggle} type="italic">
          <i>I</i>
        </Button>
        <Button onClick={onUnderlineToggle} type="underlined">
          <u>U</u>
        </Button>
      </ButtonGroup>

      <Dropdown
        value={initialAlign}
        onChange={(e) => onAlignChange(e.target.value)}
        fontawsome={true}
      >
        <option value="left">&#xf036;</option>
        <option value="center">&#xf037;</option>
        <option value="right">&#xf038;</option>
        <option value="justify">&#xf039;</option>
      </Dropdown>

      <Dropdown
        value={initialListType}
        onChange={(e) => onListChange(e.target.value)}
        fontawsome={false}
      >
        <option value="unordered">Unordered</option>
        <option value="ordered">Ordered</option>
      </Dropdown>
    </TooltipContainer>
  );
};

export default TextTooltip;
