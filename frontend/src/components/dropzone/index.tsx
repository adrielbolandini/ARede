import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image} from 'phosphor-react'
import Text from "../text";

interface dropzoneProps{
    onFileUploaded: (file:File) => void;
}

function Dropzone({onFileUploaded}:dropzoneProps){

    const [selectedFileUrl, setSelectedFileUrl] = useState("");

    const onDrop = useCallback((acceptedFiles:any[]) => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
        
      }, [onFileUploaded]);
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return(
        <div className="flex flex-col mt-4" {...getRootProps()}>
        <input {...getInputProps()} />
        {selectedFileUrl ? (
            <img src={selectedFileUrl} alt="Arquivo" />
        ) : (
            <p className="flex items-center gap-2">
                <Image size={32} weight="thin"/>
                <Text >Arraste ou clique para adicionar uma imagem</Text>
            </p>
        )
        }
        </div>
    );
}

export default Dropzone;