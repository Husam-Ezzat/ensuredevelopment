import {create} from 'zustand';

interface CertificateStore {
  certificateData: {
    textElements: any[];
    imageElements: any[];
    backgroundImage: string;
  };
  setCertificateData: (data: CertificateStore['certificateData']) => void;
  updateTextElement: (id: string, updatedText: Partial<[]>) => void;
  updateImageElement: (id: string, updatedImage: Partial<[]>) => void;
}

export const useCertificateStore = create<CertificateStore>((set) => ({
  certificateData: {
    textElements: [],
    imageElements: [],
    backgroundImage: '',
  },
  setCertificateData: (data) => set({ certificateData: data }),
  updateTextElement: (id, updatedText) =>
    set((state) => ({
      certificateData: {
        ...state.certificateData,
        textElements: state.certificateData.textElements.map((el) =>
          el.id === id ? { ...el, ...updatedText } : el
        ),
      },
    })),
  updateImageElement: (id, updatedImage) =>
    set((state) => ({
      certificateData: {
        ...state.certificateData,
        imageElements: state.certificateData.imageElements.map((img) =>
          img.id === id ? { ...img, ...updatedImage } : img
        ),
      },
    })),
}));