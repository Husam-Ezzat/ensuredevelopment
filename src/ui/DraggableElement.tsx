// @ts-nocheck

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DraggableContainer = styled.div<{
    fontColor: string;
    fontFamily: string;
    textAlign: string;
    fontSize: number;
    fontStyle: string;
    fontWeight: string;
    textDecoration: string;
    showBorder: boolean;
    x: number;
    y: number;
    width: number;
}>`
  position: absolute;
  top: ${({ y }) => y}%;
  left: ${({ x }) => x}%;
  width: ${({ width }) => width}%;
  height: auto;
  border: ${({ showBorder }) =>
        showBorder ? "1px dashed var(--color-blue-500)" : "none"};
  padding: 8px;
  color: ${({ fontColor }) => fontColor};
  font-family: ${({ fontFamily }) => fontFamily};
  text-align: ${({ textAlign }) => textAlign};
  font-size: ${({ fontSize }) => fontSize}px;
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration};
  cursor: ${({ showBorder }) => (showBorder ? "move" : "default")};
  box-sizing: border-box;
  overflow: hidden;
  z-index: 99;
  user-select: none; /* Disable text highlighting */
`;

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: var(--color-blue-500);
  cursor: se-resize;
`;

interface DraggableElementProps {
    id: string;
    text?: string;
    fontColor?: string;
    fontFamily?: string;
    textAlign?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    textDecoration?: string;
    onDragStop?: (id: string, x: number, y: number) => void;
    onResizeStop?: (id: string, width: number, height: number) => void;
    onClick?: (e: React.MouseEvent) => void;
    x: number; // Positioning data coming from JSON
    y: number;
    width: number;
    mode?: "view" | "edit";
    isSelected?: boolean;
    containerWidthPercentage: number; // to handle font resizing based on the container size
}

const DraggableElement: React.FC<DraggableElementProps> = ({
    id,
    text,
    fontColor = "#000",
    fontFamily = "Arial",
    textAlign = "left",
    fontSize = 16,
    fontStyle = "normal",
    fontWeight = "normal",
    textDecoration = "none",
    onDragStop,
    onResizeStop,
    onClick,
    x, // Initial position from the JSON data
    y,
    width,
    mode = "view",
    isSelected = false,
    containerWidthPercentage,
}) => {
    const [position, setPosition] = useState({ x, y }); // Initialize position with values from props
    const [size, setSize] = useState({ width }); // Initialize width with value from props
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [diff, setDiff] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Adjust font size based on container width percentage
    const adjustedFontSize = fontSize * (containerWidthPercentage / 100);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (mode === "edit") {
            setIsDragging(true);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        const parent = containerRef.current?.parentElement;
        if (parent) {
            const rect = parent.getBoundingClientRect();

            if (isDragging) {
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setPosition({ x, y });
            }

            if (isResizing) {
                const width = ((e.clientX - rect.left) / rect.width) * 100;
                setSize({ width });
            }
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false);
        setIsResizing(false);
        const parent = containerRef.current?.parentElement;

        const rect = parent.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        console.log(x);
        if (onDragStop) {
            onDragStop(id, x, y);
        }
        if (onResizeStop) {
            onResizeStop(id, size.width, 0); // No height adjustment in this example
        }
    };

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (mode === "edit") {
            setIsResizing(true);
        }
    };

    const handleElementClick = (e: React.MouseEvent) => {
        onClick?.(e);
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing]);

    return (
        <DraggableContainer
            ref={containerRef}
            fontColor={fontColor}
            fontFamily={fontFamily}
            textAlign={textAlign}
            fontSize={adjustedFontSize}
            fontStyle={fontStyle}
            fontWeight={fontWeight}
            textDecoration={textDecoration}
            showBorder={isSelected}
            x={position.x}
            y={position.y}
            width={size.width}
            onMouseDown={handleMouseDown}
            onClick={handleElementClick}
        >
            {text}
            {isSelected && mode === "edit" && (
                <ResizeHandle onMouseDown={handleResizeMouseDown} />
            )}
        </DraggableContainer>
    );
};

export default DraggableElement;
