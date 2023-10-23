import { Paperclip } from "lucide-react"
import { getFiles } from "./taskModal";
import React from 'react';
import { Button } from "./ui/button";

interface FileListProps {
    files: getFiles[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
    function formatName(name :  string){
        const nameF = name.split('-');
        return nameF[0];
    }

    return (
        <div>
            <Paperclip />
            <h1>Lista de Arquivos:</h1>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        <Button>
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                                {formatName(file.fileName)}
                            </a>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
