import { CircleAlert, Download, MoveRight, Undo2 } from "lucide-react"
import { PassoAPasso } from "./passo-a-passo"
import { useState } from "react";
import { PassadorPagina } from "./passadorPagina";
import { TabelaConversao } from "./tabelaConversao";

interface TerceiraEtapaProps {
    etapa: number,
    file?: File | null,
    voltarEtapa: (etapa: number) => void,
    avancarEtapa: (etapa: number) => void,
    conteudotabela: any,
    downloadarquivo: () => void,
    mudarConteudoTabela: (newList: any[]) => void

}

export function TerceiraEtapa({ etapa, file, voltarEtapa, avancarEtapa, conteudotabela, downloadarquivo, mudarConteudoTabela }: TerceiraEtapaProps) {

    //como são muitas variáveis e funções para passar, deixei aqui por enquanto

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(conteudotabela.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = conteudotabela.slice(startIndex, endIndex);

    function paginaInicio() {
        setCurrentPage(1);
    }

    function voltarPagina() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

        }
    }

    function avancarPagina() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function paginaFim() {
        setCurrentPage(totalPages);
    }


    function deleteItem(index: number) {
        const itemIndex = startIndex + index; //index absoluto do item em si que será excluido

        // cria uma nova lista excluindo o item do index passado
        const newItems = [
            ...conteudotabela.slice(0, itemIndex),
            ...conteudotabela.slice(itemIndex + 1)
        ];

        //atualiza o conteudo direto do componente pai
        mudarConteudoTabela(newItems);

        // se for necessário, atualiza a página atual
        const newTotalPages = Math.ceil(newItems.length / itemsPerPage);
        setCurrentPage(Math.min(currentPage, newTotalPages));
    }

    async function baixarArquivo() {
        await downloadarquivo()
        avancarEtapa(etapa)

    }

    return (
        <div className='bg-white w-[1040px] m-auto rounded-xl py-6 px-6 gap-3 shadow-shape transition-all'>

            {/* cabeçalho da área de conversão */}
            <div className="w-full space-y-3 px-2.5 py-2.5">

                {/* passo a passo */}
                <PassoAPasso
                    etapa={etapa}
                />
                {/* fim passo a passo */}

                <p className='text-azulao text-xl font-medium'>Visualize e baixe seu arquivo convertido</p>

                <div className="flex justify-center items-center gap-2">
                    <CircleAlert className="size-5 text-roxao" />
                    <p className='text-roxao text-base font-medium'>Confira abaixo a primeira e última linhas do OFX para garantir uma conversão efetiva</p>
                </div>

            </div>
            {/* fim cabeçalho da área de conversão */}

            {/* conteudo central visualização + estatística e download */}
            <div className="flex gap-4 py-6 px-6">

                {/* parte de visualização do arquivo já convertido*/}
                <div className={"w-full flex flex-col items-center justify-center py-3 px-3 gap-1 rounded-xl border-[3px] border-solid border-blue-200 bg-sky-50"}>
                    
                    <TabelaConversao
                        hoveredIndex={hoveredIndex}
                        currentItems={currentItems}
                        deleteItem={deleteItem}
                        setHoveredIndex={setHoveredIndex}
                    />

                    <PassadorPagina
                        paginaInicio={paginaInicio}
                        paginaFim={paginaFim}
                        voltarPagina={voltarPagina}
                        avancarPagina={avancarPagina}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />

                </div>
                {/* fim parte de visualização de arquivo já convertido*/}

                {/* parte de estatística e download*/}
                <div className={'flex flex-col items-center justify-center py-4 px-5 gap-3 rounded-xl border-[3px] w-1/2 bborder-solid border-blue-200 bg-sky-50'}>

                    tabelinha estatisticas
                    <h2 className="text-azulao font-semibold text-xl">{file?.name}</h2>
                    <button onClick={() => baixarArquivo()} className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-roxao text-white font-semibold text-base hover:bg-purple-800'>Baixar arquivo <Download className="text-white size-4" /> </button>

                </div>
                {/* fim parte de estatística e download*/}

            </div>
            {/* fim conteudo central visualização + estatística e download */}

            {/* botões de voltar e concluir*/}
            <div className="flex justify-between items-center">

                <button onClick={() => voltarEtapa(etapa)} className='flex items-center px-4 py-1.5 rounded-lg bg-azul-logo gap-2 text-white font-semibold text-base hover:bg-blue-500 hover:text-white'>Voltar <Undo2 className="text-white size-4" /> </button>
                <button onClick={() => avancarEtapa(etapa)} className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-roxao text-white font-semibold text-base hover:bg-purple-800'>Concluir <MoveRight className="text-white size-4" /> </button>
            </div>
            {/* fim botões de voltar e concluir*/}

        </div> //fim área de conversão

    )
}