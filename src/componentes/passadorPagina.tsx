import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from "lucide-react";

interface PassadorPaginaProps {
    paginaInicio: () => void,
    voltarPagina: () => void,
    avancarPagina: () => void,
    paginaFim: () => void,
    currentPage: number,
    totalPages: number

}

export function PassadorPagina ( {
    paginaInicio,
    paginaFim,
    voltarPagina,
    avancarPagina,
    currentPage,
    totalPages
} : PassadorPaginaProps) {
    return (
        <div className=" mt-2 flex justify-center space-x-2 items-center">

            <button onClick={() => paginaInicio()} className="size-8 rounded-full bg-azulao text-white text-sm flex items-center justify-center font-bold hover:bg-roxao">
                <ChevronFirst className="size-5 text-white" strokeWidth={3} />
            </button>
            <button onClick={() => voltarPagina()} className="size-8 rounded-full bg-azulao text-white text-sm flex items-center justify-center font-bold hover:bg-roxao">
                <ChevronLeft className="size-5 text-white" strokeWidth={3} />
            </button>

            <div className="w-32 gap-1.5 px-2 py-1 border-2 border-blue-300 rounded-lg bg-white flex items-center justify-center">
                <div className="size-[34px] rounded-full bg-azulao text-white text-base flex items-center justify-center font-bold">{currentPage}</div>
                <div className="text-base text-azulao font-semibold">de <strong className="font-bold">{totalPages}</strong></div>
            </div>

            <button onClick={() => avancarPagina()} className="size-8 rounded-full bg-azulao text-white text-sm flex items-center justify-center font-bold hover:bg-roxao">
                <ChevronRight className="size-5 text-white" strokeWidth={3} />
            </button>
            <button onClick={() => paginaFim()} className="size-8 rounded-full bg-azulao text-white text-sm flex items-center justify-center font-bold hover:bg-roxao">
                <ChevronLast className="size-5 text-white" strokeWidth={3} />
            </button>
            
        </div>
    )
}