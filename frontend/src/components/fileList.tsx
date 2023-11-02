import { Paperclip } from "lucide-react";
import { getFiles } from "./taskModal";
import React from "react";
import { Button } from "./ui/button";

interface FileListProps {
  files: getFiles[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  function formatName(name: string) {
    const nameF = name.split("-");
    return nameF[0];
  }

  return (
    <div>
      <div className="flex gap-3 mt-4">
        <Paperclip color="#2C2C2C" />
        <h1>Arquivos</h1>
      </div>
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
