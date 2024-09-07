// @ts-nocheck
import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from "react";
import styled from "styled-components";
import DraggableElement from "./DraggableElement";
import TextTooltip from "./TextTooltip";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TextManager from "./TextManager";
import Flex from "./Flex";
import ImageManager from "./ImageManager";
import DraggableImage from "./DraggableImage";
import Button from "./Button";
import { CiText } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { FaSignature } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";
import { BsFiletypeJson } from "react-icons/bs";
import { t } from "i18next";

const A4Dimensions = {
    landscape: { width: 1122, height: 794 },
    portrait: { width: 794, height: 1122 },
};
const DivOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  `;
const CertificateContainer = styled.div<{
    isLandscape: boolean;
    backgroundImage: string;
}>`
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ isLandscape }) =>
        isLandscape ? "297 / 210" : "210 / 297"};
    background-color: #ffffff;
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
const ActionContainer = styled.div`
    width: 80%;
  `;
const ActionBtns = styled.div`
    margin: 0 0 2rem 0;
  `;
const OrientationToggle = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  `;

const ExportButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  `;
const HiddenInput = styled.input`
    display: none;
  `;
const ButtonContainer = styled.div`
    position: relative;
    display: inline-block;
  
    &:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
  `;

const Tooltip = styled.div`
    visibility: hidden;
    width: auto;
    background-color: rgba(59, 72, 80, 0.9);
    background-image: linear-gradient(
      30deg,
      rgba(59, 72, 80, 0.44),
      rgba(59, 68, 75, 0.44),
      rgba(60, 82, 88, 0.44)
    );
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    white-space: nowrap;
    font-size: 0.6rem;
    padding: 5px;
    position: absolute;
    z-index: 1;
    top: -1.6rem;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 999999999999;
  `;
interface TextElement {
    id: string;
    text: string;
    fontColor: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    textAlign: string;
    listType: string;
    x?: number;
    y?: number;
    width?: number;
}

interface CertificateBuilderProps {
    orientation?: "portrait" | "landscape";
    mode?: "view" | "edit";
    certificateData?: {
        backgroundImage?: string;
        templateId?: string;
        textElements?: TextElement[];
        imageElements?: ImageElement[];
    };
}

const CertificateBuilder: React.FC<CertificateBuilderProps> = ({
    orientation,
    mode,
    certificateData,
    templateId,
}) => {
    const [textElements, setTextElements] = useState<TextElement[]>([]);
    const [imageElements, setImageElements] = useState<ImageElement[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(
        null
    );
    const [widthPercentage, setWidthPercentage] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (certificateData) {
            setTextElements(certificateData?.textElements || []);
        }
    }, [certificateData, mode]);

    const updateWidthPercentage = () => {
        const container = containerRef.current;
        if (container) {
            const containerWidth = container.offsetWidth;
            const originalWidth = A4Dimensions[orientation].width;
            const percentage = (containerWidth / originalWidth) * 100;
            setWidthPercentage(parseFloat(percentage.toFixed(2)));
        }
    };

    useEffect(() => {
        updateWidthPercentage();
        window.addEventListener("resize", updateWidthPercentage);
        return () => {
            window.removeEventListener("resize", updateWidthPercentage);
        };
    }, [orientation]);

    const addTextElement = () => {
        const newTextElement: TextElement = {
            id: uuidv4(),
            text: t(`addText`),
            fontColor: "#000000",
            fontFamily: "Arial",
            fontSize: 24,
            fontWeight: "normal",
            fontStyle: "normal",
            textDecoration: "none",
            textAlign: "left",
            listType: "none",
        };
        setTextElements([...textElements, newTextElement]);
    };

    const updateTextElement = (
        id: string,
        updatedProperties: Partial<TextElement>
    ) => {
        setTextElements((prevElements) =>
            prevElements.map((el) =>
                el.id === id ? { ...el, ...updatedProperties } : el
            )
        );
    };

    const deleteTextElement = (id: string) => {
        setTextElements(textElements.filter((element) => element.id !== id));
    };

    const addImageElement = (src: string) => {
        const newImageElement: ImageElement = {
            id: uuidv4(),
            src,
            width: 200,
            height: 200,
            x: 0,
            y: 0,
        };
        setImageElements([...imageElements, newImageElement]);
    };

    const updateImageElement = (
        id: string,
        updatedProperties: Partial<ImageElement>
    ) => {
        setImageElements((prevElements) =>
            prevElements.map((el) =>
                el.id === id ? { ...el, ...updatedProperties } : el
            )
        );
    };

    const deleteImageElement = (id: string) => {
        setImageElements(imageElements.filter((element) => element.id !== id));
    };

    const handleImageDragStop = (id: string, x: number, y: number) => {
        updateImageElement(id, { x, y });
    };

    const handleImageResizeStop = (
        id: string,
        width: number,
        height: number,
        x: number,
        y: number
    ) => {
        updateImageElement(id, { width, height, x, y });
    };

    const handleDragStop = (id: string, x: number, y: number) => {
        const newX = (x / widthPercentage) * 100;
        const newY = (y / widthPercentage) * 100;
        setTextElements((prev) =>
            prev.map((el) => (el.id === id ? { ...el, x, y } : el))
        );
    };

    const handleResizeStop = (id: string, width: number, height: number) => {
        const newWidth = (width / widthPercentage) * 100;
        setTextElements((prev) =>
            prev.map((el) => (el.id === id ? { ...el, width: newWidth, height } : el))
        );
    };

    const handleTextClick = (id: string) => {
        if (mode === "edit") {
            setSelectedElementId(id);
        }
    };

    const handleCloseTooltip = () => {
        setSelectedElementId(null);
    };

    const handleFontChange = (fontFamily: string) => {
        if (selectedElementId) {
            setTextElements(
                textElements.map((element) =>
                    element.id === selectedElementId
                        ? { ...element, fontFamily }
                        : element
                )
            );
        }
    };

    const handleFontSizeChange = (fontSize: number) => {
        if (selectedElementId) {
            // console.log(textElements.map((element) => element.fontSize));
            setTextElements(
                textElements.map((element) =>
                    element?.id === selectedElementId ? { ...element, fontSize } : element
                )
            );
        }
    };

    const handleColorChange = (color: string) => {
        if (selectedElementId) {
            updateTextElement(selectedElementId, { fontColor: color });
        }
    };

    const handleBoldToggle = () => {
        if (selectedElementId) {
            setTextElements(
                textElements.map((element) =>
                    element.id === selectedElementId
                        ? {
                            ...element,
                            fontWeight: element.fontWeight === "bold" ? "normal" : "bold",
                        }
                        : element
                )
            );
        }
    };

    const handleItalicToggle = () => {
        if (selectedElementId) {
            setTextElements(
                textElements.map((element) =>
                    element.id === selectedElementId
                        ? {
                            ...element,
                            fontStyle: element.fontStyle === "italic" ? "normal" : "italic",
                        }
                        : element
                )
            );
        }
    };

    const handleUnderlineToggle = () => {
        if (selectedElementId) {
            setTextElements(
                textElements.map((element) =>
                    element.id === selectedElementId
                        ? {
                            ...element,
                            textDecoration:
                                element.textDecoration === "underline" ? "none" : "underline",
                        }
                        : element
                )
            );
        }
    };

    const handleAlignChange = (textAlign: string) => {
        if (selectedElementId) {
            setTextElements(
                textElements.map((element) =>
                    element.id === selectedElementId ? { ...element, textAlign } : element
                )
            );
        }
    };

    const handleListChange = (listType: string) => {
        if (selectedElementId) {
            setTextElements(
                textElements.map((element) =>
                    element.id === selectedElementId ? { ...element, listType } : element
                )
            );
        }
    };

    const exportToPDF = () => {
        if (!containerRef.current) return;

        const scale = 2; // Increase this value for higher resolution
        const pdf = new jsPDF({
            orientation: orientation === "landscape" ? "landscape" : "portrait",
            unit: "px",
            format: [
                containerRef.current.offsetWidth * scale,
                containerRef.current.offsetHeight * scale,
            ],
        });

        html2canvas(containerRef.current, {
            backgroundColor: null,
            scale, // Scale the canvas for higher resolution
            useCORS: true, // Allows loading images from other domains if necessary
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Maintain aspect ratio
            let imgWidth = canvas.width;
            let imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            imgWidth *= ratio;
            imgHeight *= ratio;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("certificate.pdf");
        });
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;
                addImageElement(base64String); // Pass the base64 string to addImageElement
            };

            reader.readAsDataURL(file); // Convert the file to a base64-encoded string
        }
    };
    const exportToJSON = () => {
        const updatedTextElements = textElements.map((element) => ({
            ...element,
            x: element.x, // Make sure you pass the updated x position
            y: element.y, // Make sure you pass the updated y position
            width: element.width, // Make sure you pass the updated width
        }));

        const updatedImageElements = imageElements.map((element) => ({
            ...element,
            x: element.x,
            y: element.y,
            width: element.width,
            height: element.height,
        }));

        const json = JSON.stringify(
            {
                templateId: certificateData?.templateId || uuidv4(),
                backgroundImage: certificateData?.backgroundImage || "",
                textElements: updatedTextElements, // Include updated text elements
                imageElements: updatedImageElements, // Include updated image elements
            },
            null,
            2
        );

        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "certificate.json";
        a.click();
        URL.revokeObjectURL(url);
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger input click
        }
    };
    return (
        <>
            {mode !== "edit" && mode !== "view" && (
                <>
                    <OrientationToggle onClick={() => console.log("Toggle orientation")}>
                        Switch to {orientation === "landscape" ? "Portrait" : "Landscape"}
                    </OrientationToggle>
                    <ExportButton onClick={exportToPDF}>Export to PDF</ExportButton>
                    <ExportButton onClick={exportToJSON}>Export to JSON</ExportButton>
                </>
            )}
            <Flex direction="row" justify="space-between" wrap="nowrap" gap={16}>
                {mode === "edit" && (
                    <ActionContainer>
                        <ActionBtns>
                            <Flex direction="row" justify="flex-start" gap={8}>
                                <ButtonContainer>
                                    <Button
                                        onClick={addTextElement}
                                        width={"relative"}
                                        variant="tertiary"
                                        size="small"
                                    >
                                        <CiText />
                                    </Button>
                                    <Tooltip className="tooltip">Add Text</Tooltip>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <Button
                                        onClick={handleButtonClick}
                                        width={"relative"}
                                        variant="tertiary"
                                        size="small"
                                    >
                                        <CiImageOn />
                                    </Button>

                                    <HiddenInput
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                    />
                                    <Tooltip className="tooltip">Upload Image</Tooltip>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <Button
                                        onClick={addTextElement}
                                        width={"relative"}
                                        variant="tertiary"
                                        size="small"
                                        disabled
                                    >
                                        <FaSignature />
                                    </Button>
                                    <Tooltip className="tooltip">Upload Signture</Tooltip>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <Button
                                        onClick={exportToPDF}
                                        width={"relative"}
                                        variant="tertiary"
                                        size="small"
                                    >
                                        <VscFilePdf />
                                    </Button>
                                    <Tooltip className="tooltip">Export to PDF</Tooltip>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <Button
                                        onClick={exportToJSON}
                                        width={"relative"}
                                        variant="tertiary"
                                        size="small"
                                    >
                                        <BsFiletypeJson />
                                    </Button>
                                    <Tooltip className="tooltip">Export to JSON</Tooltip>
                                </ButtonContainer>
                            </Flex>
                        </ActionBtns>

                        <TextManager
                            textElements={textElements}
                            addTextElement={addTextElement}
                            updateTextElement={updateTextElement}
                            deleteTextElement={deleteTextElement}
                        />
                        <ImageManager
                            imageElements={imageElements}
                            addImageElement={addImageElement}
                            updateImageElement={updateImageElement}
                            deleteImageElement={deleteImageElement}
                        />
                    </ActionContainer>
                )}

                <CertificateContainer
                    ref={containerRef}
                    isLandscape={orientation === "landscape"}
                    backgroundImage={certificateData?.backgroundImage || ""}
                >
                    {textElements.map(
                        (element) =>
                            containerRef.current && (
                                <DraggableElement
                                    key={element.id}
                                    id={element.id}
                                    text={element.text}
                                    fontColor={element.fontColor}
                                    fontFamily={element.fontFamily}
                                    textAlign={element.textAlign}
                                    fontSize={element.fontSize}
                                    fontStyle={element.fontStyle} // Apply fontStyle (e.g., italic)
                                    fontWeight={element.fontWeight} // Apply fontWeight (e.g., bold)
                                    textDecoration={element.textDecoration}
                                    x={element.x ?? 0}
                                    y={element.y ?? 0}
                                    width={element.width ?? 20}
                                    onDragStop={handleDragStop}
                                    onResizeStop={handleResizeStop}
                                    mode={mode}
                                    isSelected={element.id === selectedElementId}
                                    containerWidthPercentage={widthPercentage} // Pass container width percentage
                                    onClick={() => handleTextClick(element.id)}
                                />
                            )
                    )}
                    {imageElements?.map((element) => (
                        <DraggableImage
                            key={element.id}
                            id={element.id}
                            src={element.src}
                            onDragStop={(e, data) =>
                                handleImageDragStop(element.id, data.x, data.y)
                            }
                            onResizeStop={(e, direction, ref, delta, position) =>
                                handleImageResizeStop(
                                    element.id,
                                    ref.style.width,
                                    ref.style.height,
                                    position.x,
                                    position.y
                                )
                            }
                            x={((element.x ?? 0) / 100) * containerRef.current!.offsetWidth}
                            y={((element.y ?? 0) / 100) * containerRef.current!.offsetHeight}
                            width={element.width}
                            height={element.height}
                            onClick={function (e: React.MouseEvent): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                    ))}
                    {selectedElementId && (
                        <TextTooltip
                            onClose={handleCloseTooltip}
                            onFontChange={handleFontChange}
                            onFontSizeChange={handleFontSizeChange}
                            onColorChange={handleColorChange}
                            onBoldToggle={handleBoldToggle}
                            onItalicToggle={handleItalicToggle}
                            onUnderlineToggle={handleUnderlineToggle}
                            onAlignChange={handleAlignChange}
                            onListChange={handleListChange}
                            initialFontFamily={
                                textElements.find((el) => el.id === selectedElementId)
                                    ?.fontFamily || "Arial"
                            }
                            initialFontSize={
                                textElements.find((el) => el.id === selectedElementId)
                                    ?.fontSize || 16
                            }
                            initialColor={
                                textElements.find((el) => el.id === selectedElementId)
                                    ?.fontColor || "#000000"
                            }
                            initialAlign={
                                textElements.find((el) => el.id === selectedElementId)
                                    ?.textAlign || "left"
                            }
                            initialListType={
                                textElements.find((el) => el.id === selectedElementId)
                                    ?.listType || "none"
                            }
                        />
                    )}
                </CertificateContainer>
            </Flex>
            {/* <p>
                  The container is {widthPercentage}% of the original A4 {orientation} width.
              </p> */}
            {mode === "view" && <DivOverlay />}
        </>
    );
};

export default CertificateBuilder;
