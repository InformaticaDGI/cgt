import { useState } from "react";
import ImageSelector from "../ImageSelector/ImageSelector";

import { Flex } from "../Layout/Flex";
import { Button } from "../Ui/Button/Button";
import { useUploadFiles } from "../../hooks/mutations/useUploadFiles";
import ProgressBar from "../Ui/ProgressBar/ProgressBar";
import Text from "../Ui/Text/Text";
import ImageDisplay from "./ImageDisplay";


type ImageProjectFiles = {
    start?: File | null;
    middle?: File | null;
    after?: File | null;
}

const ImageProject = ({ projectId, projectImages }: { projectId: string, projectImages: any }) => {
    const [files, setFiles] = useState<ImageProjectFiles>({
        start: null,
        middle: null,
        after: null,
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const { mutateAsync: uploadFiles, isPending: isUploading } = useUploadFiles((progress) => {
        setUploadProgress(progress);
        if(progress === 100) {
            setIsOpen(false);
        }
    });

    const handleImageSelect = (type: 'start' | 'middle' | 'after', file: File | null) => {
        setFiles({ ...files, [type]: file });
    }

    const handleUpload = async () => {
        if (!files.start && !files.middle && !files.after) return;
        setUploadProgress(0);
        const formData = new FormData();
        if (files.start) formData.append('startFile', files.start);
        if (files.middle) formData.append('middleFile', files.middle);
        if (files.after) formData.append('endFile', files.after);
        await uploadFiles({
            formData,
            projectId,
        });
    }

    return (
        <Flex $direction="column" $gap="16px">
            <Flex $direction="row" $gap="16px" $justify="space-between">
                <Text $fontSize="14px" $fontWeight="500">Fotos del proyecto</Text>
                <Button $variant="primary" $size="small" onClick={() => setIsOpen(Boolean(!isOpen))}>{isOpen ? "X" : "Agregar Imagenes"}</Button>
            </Flex>
            {isOpen ? (
                <Flex $direction="row" $gap="16px">
                    <ImageSelector 
                        placeholder="Agregar Inicio" 
                        onImageSelect={(file) => { handleImageSelect('start', file) }} 
                        compressImages={true} 
                        maxCompressedSize={0.35}
                        existingImage={projectImages?.startImageUrl}
                    />
                    <ImageSelector 
                        placeholder="Agregar Durante" 
                        onImageSelect={(file) => { handleImageSelect('middle', file) }} 
                        compressImages={true} 
                        maxCompressedSize={0.35}
                        existingImage={projectImages?.middleImageUrl}
                    />
                    <ImageSelector 
                        placeholder="Agregar Después" 
                        onImageSelect={(file) => { handleImageSelect('after', file) }} 
                        compressImages={true} 
                        maxCompressedSize={0.35}
                        existingImage={projectImages?.endImageUrl}
                    />
                </Flex>
            ) : (
                <ImageDisplay projectImages={projectImages} />
            )}

            <Flex $direction="row" $gap="16px" $justify="end">
                {/* Barra de progreso de subida */}
                {isUploading && uploadProgress > 0 && (
                    <Flex $direction="column" $gap="8px">
                        <Text $fontSize="14px" $fontWeight="500">
                            Subiendo imágenes...
                        </Text>
                        <ProgressBar
                            progress={uploadProgress}
                            height="12px"
                            color="#10b981"
                            animated
                        />
                    </Flex>
                )}
                {isOpen && <Button $variant="primary" $size="small" onClick={handleUpload} disabled={isUploading || !files.start && !files.middle && !files.after}>Subir imágenes</Button>}
            </Flex>
        </Flex>
    )
}

export default ImageProject;