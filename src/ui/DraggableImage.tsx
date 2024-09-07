// src/components/DraggableImage.tsx
import React from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

const DraggableContainer = styled.div`
  /* border: 1px dotted var(--color-blue-500); */
  cursor: move;
  position: relative;
  img {
    max-width: 100%;
    height: auto;
  }
`;

interface DraggableImageProps {
    id: string;
    src: string;
    onDragStop: (e: any, data: any) => void;
    onResizeStop: (
        e: any,
        direction: any,
        ref: any,
        delta: any,
        position: any
    ) => void;
    onClick: (e: React.MouseEvent) => void;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
    src,
    onDragStop,
    onResizeStop,
    onClick,
    x = 0,
    y = 0,
    width = 200,
    height = 200,
}) => {
    return (
        <Rnd
            default={{
                x,
                y,
                width,
                height,
            }}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
            enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
            }}
            onClick={onClick}
        >
            <DraggableContainer>
                <img src={src} alt="Draggable" />
            </DraggableContainer>
        </Rnd>
    );
};

export default DraggableImage;