import { useEffect, useMemo, useState } from "react";
import ImageSelector from "../ImageSelector/ImageSelector";

import { Flex } from "../Layout/Flex";
import { Button } from "../Ui/Button/Button";
import { useUploadFiles } from "../../hooks/mutations/useUploadFiles";
import ProgressBar from "../Ui/ProgressBar/ProgressBar";
import Text from "../Ui/Text/Text";
import ImageDisplay from "./ImageDisplay";
import { BiEdit } from "react-icons/bi";


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
    const [existingStartImageState, setExistingStartImageState] = useState<string>(projectImages?.startImageUrl)
    const [existingMiddleImageState, setExistingMiddleImageState] = useState<string>(projectImages?.middleImageUrl)
    const [existingAfterImageState, setExistingAfterImageState] = useState<string>(projectImages?.endImageUrl)
    const [uploadProgress, setUploadProgress] = useState<number>(0);


    useEffect(() => {
        if(projectImages?.startImageUrl) setExistingStartImageState(projectImages?.startImageUrl);
        if(projectImages?.middleImageUrl) setExistingMiddleImageState(projectImages?.middleImageUrl);
        if(projectImages?.endImageUrl) setExistingAfterImageState(projectImages?.endImageUrl);
    }, [projectImages]);

    const hasChanges = useMemo(() => {
        if(files.start !== null || files.middle !== null || files.after !== null) return true;
        return false;
    }, [files]);

    const { mutateAsync: uploadFiles, isPending: isUploading } = useUploadFiles((progress) => {
        setUploadProgress(progress);
        if (progress === 100) {
            setIsOpen(false);
        }
    });

    const handleImageSelect = (type: 'start' | 'middle' | 'after', file: File | null) => {
        setFiles({ ...files, [type]: file });
    }

    const handleApply = async () => {
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

    const handleCancel = () => {
        if(existingStartImageState !== projectImages?.startImageUrl) setExistingStartImageState(projectImages?.startImageUrl);
        if(existingMiddleImageState !== projectImages?.middleImageUrl) setExistingMiddleImageState(projectImages?.middleImageUrl);
        if(existingAfterImageState !== projectImages?.endImageUrl) setExistingAfterImageState(projectImages?.endImageUrl);
        setFiles({
            start: null,
            middle: null,
            after: null,
        });
        setIsOpen(false);
    }

    return (
        <Flex $direction="column" $gap="4px">
            <Flex $direction="row" $gap="4px" $justify="end">
                <Button $variant="primary" $backgroundColor={isOpen ? "var(--gradient-quinary)" : "var(--gradient-primary)"} $size="xsmall" onClick={() => isOpen ? handleCancel() : setIsOpen(Boolean(!isOpen))}>{isOpen ? "X" : <BiEdit size={16} />}</Button>
            </Flex>
            {isOpen ? (
                <Flex $direction="row" $gap="16px">
                    <Flex $direction="column" $gap="8px">
                        <Text $fontSize="14px" $fontWeight="500">Inicio</Text>
                        <ImageSelector
                            placeholder="Agregar Inicio"
                            onImageSelect={(file) => { handleImageSelect('start', file) }}
                            compressImages={true}
                            maxCompressedSize={0.35}
                            existingImage={existingStartImageState}
                            onImageRemoved={() => setExistingStartImageState("")}
                        />
                    </Flex>
                    <Flex $direction="column" $gap="8px">
                        <Text $fontSize="14px" $fontWeight="500">Durante</Text>
                        <ImageSelector
                            placeholder="Agregar Durante"
                            onImageSelect={(file) => { handleImageSelect('middle', file) }}
                            compressImages={true}
                            maxCompressedSize={0.35}
                            existingImage={existingMiddleImageState}
                            onImageRemoved={() => setExistingMiddleImageState("")}
                        />
                    </Flex>
                    <Flex $direction="column" $gap="8px">
                        <Text $fontSize="14px" $fontWeight="500">Después</Text>
                        <ImageSelector
                            placeholder="Agregar Después"
                            onImageSelect={(file) => { handleImageSelect('after', file) }}
                            compressImages={true}
                            maxCompressedSize={0.35}
                            existingImage={existingAfterImageState}
                            onImageRemoved={() => setExistingAfterImageState("")}
                        />
                    </Flex>
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
                 {isOpen && <Button $backgroundColor="var(--gradient-quinary)" $size="xsmall" onClick={handleCancel}>Cancelar</Button>}
                 {isOpen && <Button $variant="primary" $size="xsmall" onClick={handleApply} disabled={isUploading || !hasChanges}>Aplicar</Button>}
            </Flex>
        </Flex>
    )
}

export default ImageProject;