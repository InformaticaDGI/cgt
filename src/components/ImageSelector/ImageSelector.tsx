import React, { useState, useRef, useCallback } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import styled from 'styled-components';

interface ImageSelectorProps {
  onImageSelect: (files: File[]) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  width?: string;
  height?: string;
  placeholder?: string;
  compressImages?: boolean;
  maxCompressedSize?: number; // in MB
  convertToWebP?: boolean; // Nueva propiedad para conversión a WebP
}

interface ImagePreview {
  id: string;
  file: File;
  preview: string;
}

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size}B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)}KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
};

const ImageSelector: React.FC<ImageSelectorProps> = ({
  onImageSelect,
  acceptedTypes = 'image/*',
  maxSize = 5, // 5MB default
  maxFiles = 2,
  width = '140px',
  height = '120px',
  placeholder = 'Agregar imágenes',
  compressImages = true,
  maxCompressedSize = 1, // 1MB default
  convertToWebP = true // Por defecto convertir a WebP
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`El archivo es demasiado grande. Máximo ${maxSize}MB`);
      return false;
    }

    // Check if we already have max files
    if (previews.length >= maxFiles) {
      setError(`Máximo ${maxFiles} imágenes permitidas`);
      return false;
    }

    setError(null);
    return true;
  };

  const compressImage = useCallback((file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        const maxWidth = 1920;
        const maxHeight = 1080;
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Determinar el formato de salida basado en convertToWebP
        const outputFormat = convertToWebP ? 'image/webp' : 'image/jpeg';
        const fileExtension = convertToWebP ? '.webp' : '.jpg';
        
        // Start with high quality and reduce if needed
        let quality = 0.9;
        
        const compressWithQuality = () => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedSize = blob.size / (1024 * 1024); // Size in MB
                
                if (compressedSize > maxCompressedSize && quality > 0.1) {
                  // Reduce quality and try again
                  quality -= 0.1;
                  compressWithQuality();
                } else {
                  // Create new file with compressed data
                  // Cambiar la extensión del archivo si se convierte a WebP
                  const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                  const newFileName = convertToWebP ? `${originalName}${fileExtension}` : file.name;
                  
                  const compressedFile = new File([blob], newFileName, {
                    type: outputFormat,
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                }
              } else {
                resolve(file); // Fallback to original file
              }
            },
            outputFormat,
            quality
          );
        };
        
        compressWithQuality();
      };
      
      img.src = URL.createObjectURL(file);
    });
  }, [maxCompressedSize, convertToWebP]);

  const convertToWebPFormat = useCallback((file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (!convertToWebP) {
        resolve(file);
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
        // Convert to WebP with high quality (0.9)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
              const newFileName = `${originalName}.webp`;
              
              const webpFile = new File([blob], newFileName, {
                type: 'image/webp',
                lastModified: Date.now(),
              });
              resolve(webpFile);
            } else {
              resolve(file); // Fallback to original file
            }
          },
          'image/webp',
          0.9
        );
      };
      
      img.src = URL.createObjectURL(file);
    });
  }, [convertToWebP]);

  const createPreview = useCallback(async (file: File): Promise<ImagePreview> => {
    let processedFile = file;
    
    // First, compress image if enabled & size is greater than maxCompressedSize
    if (file.size > maxCompressedSize * 1024 * 1024 && compressImages) {
      processedFile = await compressImage(file);
    } else if (convertToWebP) {
      // If not compressing but WebP conversion is enabled, convert to WebP
      processedFile = await convertToWebPFormat(file);
    }
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          file: processedFile,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(processedFile);
    });
  }, [compressImages, compressImage, convertToWebP, convertToWebPFormat]);

  const handleMultipleFiles = useCallback(async (files: FileList) => {
    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validateFile(file)) {
        validFiles.push(file);
      }
      if (previews.length + validFiles.length >= maxFiles) {
        break;
      }
    }

    if (validFiles.length === 0) return;

    const newPreviews = await Promise.all(
      validFiles.map(file => createPreview(file))
    );

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);
    onImageSelect(updatedPreviews.map(p => p.file));
  }, [previews, onImageSelect, maxSize, maxFiles, createPreview]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleMultipleFiles(files);
    }
  }, [handleMultipleFiles]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleMultipleFiles(files);
    }
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updatedPreviews = previews.filter(p => p.id !== id);
    setPreviews(updatedPreviews);
    setError(null);
    onImageSelect(updatedPreviews.map(p => p.file));
  };

  return (
    <Container>
      <SelectorContainer
        width={width}
        height={height}
        isDragOver={isDragOver}
        hasPreview={previews.length > 0}
        hasError={!!error}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          multiple
        />
        
        {previews.length > 0 ? (
          <PreviewContainer>
            {previews.map((preview, index) => (
              <PreviewItem key={preview.id}>
                <PreviewImage src={preview.preview} alt={`Preview ${index + 1}`} />
                <RemoveButton onClick={(e) => handleRemove(e, preview.id)}>
                  <RemoveIcon>×</RemoveIcon>
                </RemoveButton>
                <ImageNumber>{index + 1}</ImageNumber>
                <FileSizeBadge>
                  {formatFileSize(preview.file.size)}
                </FileSizeBadge>
              </PreviewItem>
            ))}
            {previews.length < maxFiles && (
              <AddMoreButton>
                <AddIcon>+</AddIcon>
                <AddText>Agregar más</AddText>
              </AddMoreButton>
            )}
          </PreviewContainer>
        ) : (
          <PlaceholderContent>
            <UploadIcon>
              <LuImagePlus />
            </UploadIcon>
            <PlaceholderText>{placeholder}</PlaceholderText>
            <MaxFilesText>Máximo {maxFiles} imágenes</MaxFilesText>
          </PlaceholderContent>
        )}
      </SelectorContainer>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const SelectorContainer = styled.div<{
  width: string;
  height: string;
  isDragOver: boolean;
  hasPreview: boolean;
  hasError: boolean;
}>`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  border: 1.5px dashed ${props => {
    if (props.hasError) return '#ef4444';
    if (props.isDragOver) return '#3b82f6';
    if (props.hasPreview) return '#10b981';
    return '#d1d5db';
  }};
  border-radius: 8px;
  background-color: ${props => {
    if (props.isDragOver) return '#eff6ff';
    if (props.hasPreview) return '#f0fdf4';
    return '#fafafa';
  }};
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${props => props.hasError ? '#ef4444' : '#3b82f6'};
    background-color: ${props => props.hasError ? '#fef2f2' : '#eff6ff'};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 6px;
  align-items: center;
  justify-items: center;
`;

const PreviewItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(239, 68, 68, 0.95);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  font-size: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(239, 68, 68, 1);
    transform: scale(1.1);
  }
`;

const RemoveIcon = styled.span`
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
`;

const ImageNumber = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const FileSizeBadge = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 8px;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const AddMoreButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1.5px dashed #d1d5db;
  border-radius: 6px;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #3b82f6;
    background-color: #eff6ff;
    transform: scale(1.02);
  }
`;

const AddIcon = styled.div`
  font-size: 18px;
  color: #6b7280;
  font-weight: bold;
  margin-bottom: 2px;
`;

const AddText = styled.div`
  font-size: 8px;
  color: #6b7280;
  text-align: center;
  font-weight: 500;
`;

const PlaceholderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px;
  gap: 4px;
`;

const UploadIcon = styled.div`
  color: #6b7280;
  transition: color 0.2s ease;

  ${SelectorContainer}:hover & {
    color: #3b82f6;
  }
`;

const PlaceholderText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 11px;
  line-height: 1.3;
  transition: color 0.2s ease;
  font-weight: 500;

  ${SelectorContainer}:hover & {
    color: #3b82f6;
  }
`;

const MaxFilesText = styled.p`
  margin: 0;
  color: #9ca3af;
  font-size: 9px;
  line-height: 1.3;
  font-weight: 400;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 12px;
  text-align: center;
  margin-top: 4px;
`;

export default ImageSelector;
