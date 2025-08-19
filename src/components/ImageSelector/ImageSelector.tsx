import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import styled from 'styled-components';

interface ImageSelectorProps {
  onImageSelect: (file: File | null) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  width?: string;
  height?: string;
  placeholder?: string;
  compressImages?: boolean;
  maxCompressedSize?: number; // in MB
  convertToWebP?: boolean; // Nueva propiedad para conversión a WebP
  existingImage?: string; // URL de la imagen existente para mostrar como previsualización
  onImageRemoved?: () => void;
}

interface ImagePreview {
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

// Styled Components for Loading State
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  width: 100%;
  height: 100%;
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 4px;
  background-color: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    border-radius: 2px;
    transition: width 0.3s ease;
  }
`;

const ProgressText = styled.div`
  color: #6b7280;
  font-size: 10px;
  font-weight: 500;
`;

const ImageSelector: React.FC<ImageSelectorProps> = ({
  onImageSelect,
  acceptedTypes = 'image/*',
  maxSize = 5, // 5MB default
  width = '220px',
  height = '180px',
  placeholder = 'Agregar imágen',
  compressImages = true,
  maxCompressedSize = 1, // 1MB default
  convertToWebP = true, // Por defecto convertir a WebP
  existingImage,
  onImageRemoved
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<ImagePreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [existingImageRemoved, setExistingImageRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inicializar con imagen existente si se proporciona
  useEffect(() => {
    if (existingImage && !preview && !existingImageRemoved) {
      setPreview({
        file: new File([], 'existing-image.jpg', { type: 'image/jpeg' }),
        preview: existingImage
      });
    }
  }, [existingImage, existingImageRemoved]); // Agregado existingImageRemoved como dependencia

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

    setError(null);
    return true;
  };

  const compressImage = useCallback((file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        setProgress(30); // 30% when image loads
        
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
        
        setProgress(60); // 60% when canvas is ready
        
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
                  setProgress(70 + (0.9 - quality) * 20); // Progress based on quality reduction
                  compressWithQuality();
                } else {
                  setProgress(90); // 90% when compression is done
                  
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
        setProgress(50); // 50% when image loads for WebP conversion
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
        setProgress(80); // 80% when canvas is ready
        
        // Convert to WebP with high quality (0.9)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setProgress(95); // 95% when WebP conversion is done
              
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
    
    setProgress(100); // 100% when processing is complete
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          file: processedFile,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(processedFile);
    });
  }, [compressImages, compressImage, convertToWebP, convertToWebPFormat]);

  const handleFile = useCallback(async (file: File) => {
    if (!validateFile(file)) return;

    setIsLoading(true);
    setProgress(0);
    setError(null);

    try {
      const newPreview = await createPreview(file);
      setPreview(newPreview);
      setExistingImageRemoved(false); // Resetear el estado cuando se selecciona una nueva imagen
      onImageSelect(newPreview.file);
    } catch (error) {
      setError('Error al procesar la imagen');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  }, [onImageSelect, maxSize, createPreview]);

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
      handleFile(files[0]); // Only take the first file
    }
  }, [handleFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]); // Only take the first file
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Si hay una imagen existente y se está eliminando, marcar como removida
    if (existingImage && preview?.preview === existingImage) {
      setExistingImageRemoved(true);
      setPreview(null);
      onImageRemoved?.();
      setError(null);
      onImageSelect(null);
    } else {
      // Para imágenes nuevas seleccionadas, limpiar completamente
      setPreview(null);
      setError(null);
      onImageSelect(null);
    }
  };

  return (
    <Container>
      <SelectorContainer
        width={width}
        height={height}
        isDragOver={isDragOver}
        hasPreview={!!preview}
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
        />
        
        {isLoading ? (
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Procesando imagen...</LoadingText>
            <ProgressBarContainer>
              <ProgressBar progress={progress} />
              <ProgressText>{Math.round(progress)}%</ProgressText>
            </ProgressBarContainer>
          </LoadingContainer>
        ) : preview ? (
          <PreviewContainer>
            <PreviewItem>
              <PreviewImage src={preview.preview} alt="Preview" />
              <RemoveButton onClick={handleRemove}>
                <RemoveIcon>×</RemoveIcon>
              </RemoveButton>
              <FileSizeBadge>
                {formatFileSize(preview.file.size)}
              </FileSizeBadge>
            </PreviewItem>
          </PreviewContainer>
        ) : (
          <PlaceholderContent>
            <UploadIcon>
              <LuImagePlus size={28} />
            </UploadIcon>
            <PlaceholderText>{placeholder}</PlaceholderText>
            <MaxFilesText style={{ maxWidth: '120px' }}>Arrastra y suelta tu imagen aquí, o haz clic para seleccionarla</MaxFilesText>
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
  grid-template-columns: 1fr;
  gap: 4px;
  padding: 8px;
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
  object-fit: fill;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  aspect-ratio: 4/3;
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
