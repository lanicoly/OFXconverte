import { FileEdit } from "./icons/fileEdit";
import { Celebration } from "./icons/celebration";
import { FileSave } from "./icons/fileSave";

interface PassoAPassoProps {
  etapa: number;
}

export function PassoAPasso({ etapa }: PassoAPassoProps) {
  switch (etapa) {
    case 1:
      return (
        <div className="flex items-center gap-2 w-full px-2 py-1 justify-center">
          <i className="bi bi-file-earmark-arrow-up-fill text-azulao text-3xl"></i>
          <div className="h-[2px] w-32 bg-blue-200"></div>
          <FileEdit color="#bfdbfe" size={36} />
          <div className="h-[2px] w-32 bg-blue-200"></div>
          <FileSave color="#bfdbfe" size={36} />
          <div className="h-[2px] w-32 bg-blue-200"></div>
          <Celebration color="#bfdbfe" size={36} />
        </div>
      );
    case 2:
      return (
        <div className="flex items-center gap-2 w-full px-2 py-1 justify-center">
        <i className="bi bi-file-earmark-arrow-up-fill text-azulao text-3xl"></i>
        <div className="h-[2px] w-32 bg-azulao"></div>
        <FileEdit color="#0078a7" size={36} />
        <div className="h-[2px] w-32 bg-blue-200"></div>
        <FileSave color="#bfdbfe" size={36} />
        <div className="h-[2px] w-32 bg-blue-200"></div>
        <Celebration color="#bfdbfe" size={36} />
      </div>
      )
    case 3:
        return (
            <div className="flex items-center gap-2 w-full px-2 py-1 justify-center">
            <i className="bi bi-file-earmark-arrow-up-fill text-azulao text-3xl"></i>
            <div className="h-[2px] w-32 bg-azulao"></div>
            <FileEdit color="#0078a7" size={36} />
            <div className="h-[2px] w-32 bg-azulao"></div>
            <FileSave color="#0078a7" size={36} />
            <div className="h-[2px] w-32 bg-blue-200"></div>
            <Celebration color="#bfdbfe" size={36} />
          </div>
          )
    case 4:
        return (
            <div className="flex items-center gap-2 w-full px-2 py-1 justify-center">
            <i className="bi bi-file-earmark-arrow-up-fill text-azulao text-3xl"></i>
            <div className="h-[2px] w-32 bg-azulao"></div>
            <FileEdit color="#0078a7" size={36} />
            <div className="h-[2px] w-32 bg-azulao"></div>
            <FileSave color="#0078a7" size={36} />
            <div className="h-[2px] w-32 bg-azulao"></div>
            <Celebration color="#6d28d9" size={36} />
          </div>
          )
  }
}
