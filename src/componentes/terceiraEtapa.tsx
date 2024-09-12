import { CircleAlert, Download, MoveRight, Undo2 } from "lucide-react"
import { PassoAPasso } from "./passo-a-passo"
import { useState, useEffect } from "react";
import { PassadorPagina } from "./passadorPagina";
import { TabelaConversao } from "./tabelaConversao";

interface TerceiraEtapaProps {
    etapa: number,
    file?: File | null,
    nomeArquivo: string,
    voltarEtapa: (etapa: number) => void,
    avancarEtapa: (etapa: number) => void,
    conteudotabela: any,
    downloadarquivo: () => void,
    mudarConteudoTabela: (newList: any[]) => void

}

export function TerceiraEtapa({ etapa, file, nomeArquivo, voltarEtapa, avancarEtapa, conteudotabela, downloadarquivo, mudarConteudoTabela }: TerceiraEtapaProps) {

    //como são muitas variáveis e funções para passar, deixei aqui por enquanto

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(conteudotabela.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = conteudotabela.slice(startIndex, endIndex);
    const totalTransacoes = conteudotabela.length;
    const [qtdCredito, setQtdCredito] = useState<number>(0);
    const [qtdDebito, setQtdDebito] = useState<number>(0);
    const [saldoFinal, setSaldoFinal] = useState<number>(0);
    const [maiorCredito, setMaiorCredito] = useState<{ valor: number; descricao: string; data: string } | null>(null);

    const percentCredito = ((qtdCredito*100)/totalTransacoes).toFixed(2);
    const percentDebito = ((qtdDebito*100)/totalTransacoes).toFixed(2);
    
    const nomeSemExtensao: string = nomeArquivo.split('.').slice(0, -1).join('.');
    const novoNomeArquivo: string = `${nomeSemExtensao}.ofx`;
    

    function formatarNumero (numero: number) {
        if (isNaN(numero)) return 'R$ 0.00'; // por estar ocorrendo erro de NaN, decidi verificar
        if (numero >= 1_000_000) {
            return `R$ ${(numero / 1_000_000).toFixed(1).replace(/\.0$/, '')} MI`;
        } else if (numero >= 1_000) {
            return `R$ ${(numero / 1_000).toFixed(1).replace(/\.0$/, '')} MIL`;
        } else {
            return `R$ ${numero.toFixed(2)}`;
        }
    };
    const formatarData = (data: string): string => {
        if (typeof data !== 'string' || data.length !== 8) {
            console.error(`Formato de data inválido: ${data}`);
            return 'Data inválida';
        }
    
        const ano = data.substring(0, 4);
        const mes = data.substring(4, 6);
        const dia = data.substring(6, 8);
    
        return `${dia}-${mes}-${ano}`;
    };
    
    
    
    useEffect(() => {
        let creditos = 0;
        let debitos = 0;
        let valorTotal = 0;
        let maiorCreditoTemp: { valor: number; descricao: string; data: string } | null = null;
    
        conteudotabela.forEach((transacao: { type: string; amount: string; description: string; date: string }) => {
            const amount = parseFloat(transacao.amount); // convertendo o valor da transação de string pra numero
    
            if (!isNaN(amount)) { 
                if (transacao.type === 'C') {
                    creditos += 1;
                    valorTotal += amount;
                    if (maiorCreditoTemp === null || amount > maiorCreditoTemp.valor) {
                        maiorCreditoTemp = {
                            valor: amount,
                            descricao: transacao.description,
                            data: formatarData(transacao.date)
                        };
                    }
                } else if (transacao.type === 'D') {
                    debitos += 1;
                    valorTotal -= amount;
                }
            } else {
                console.error(`Erro no valor da transação: ${transacao.amount}`);
            }
        });
    
        setQtdCredito(creditos);
        setQtdDebito(debitos);
        setSaldoFinal(valorTotal);
        setMaiorCredito(maiorCreditoTemp);
    }, [conteudotabela]);
    
    
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
                        formatarData={formatarData}
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

                    <h2 className="text-azulao font-semibold text-xl">{novoNomeArquivo}</h2>

                    <button onClick={() => baixarArquivo()} className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-roxao text-white font-semibold text-base hover:bg-purple-800'>Baixar arquivo <Download className="text-white size-4" /> </button>

                    <h2 className="text-azulao font-medium text-xl">Estatísticas das transações</h2>

                    {/* tabelinha de estatisticas */}
                    <div className="bg-white border-2 border-solid border-azul-logo p-2 rounded-xl space-y-2 px-2 w-full">

                        {/* total de transações */}
                        <div className="flex bg-sky-100 py-1 px-2 gap-2.5 rounded-lg">
                            <p className="text-xs text-azulao font-semibold">Total de transações:</p>
                            <div className="bg-white text-azulao font-semibold text-xs p-[2px] flex-1">{totalTransacoes}</div>
                        </div>
                        {/* fim total de transações */}

                        {/* transações credito e debito */}
                        <div className="flex gap-2 w-full">
                            {/* transações de crédito */}
                            <div className="flex flex-col bg-sky-100 py-1 px-2 gap-1 rounded-lg flex-1">
                                <p className="text-xs text-azulao font-semibold">Crédito</p>
                                <div className="bg-white text-azulao font-semibold text-xs p-[2px]">{qtdCredito}</div>
                                <div className="bg-white text-azulao font-semibold text-xs p-[2px]">{percentCredito}%</div>
                            </div>
                            {/* fim transações de crédito */}

                            {/* transações de débito */}
                            <div className="flex flex-col bg-sky-100 py-1 px-2 gap-1 rounded-lg flex-1">
                                <p className="text-xs text-azulao font-semibold">Débito</p>
                                <div className="bg-white text-azulao font-semibold text-xs p-[2px]">{qtdDebito}</div>
                                <div className="bg-white text-azulao font-semibold text-xs p-[2px]">{percentDebito}%</div>
                            </div>
                            {/* fim transações de débito */}
                        </div>
                        {/* fim transações credito e debito */}

                      {/* saldo final */}
                        <div className="flex bg-sky-100 py-1 px-2 gap-2.5 rounded-lg">
                            <p className="text-xs text-azulao font-semibold">Saldo Final:</p>
                            <div className="bg-white text-azulao font-semibold text-xs p-[2px] flex-1">{formatarNumero(saldoFinal)}</div>
                        </div>
                        {/* saldo final */}
                        
                            {/* transação de maior valor */}
                            <div className="flex flex-col bg-sky-100 py-1 px-2 gap-1 rounded-lg flex-1">
                                <p className="text-xs text-azulao font-semibold">Transação de maior valor:</p>
                                {maiorCredito && (
                                    <>
                                    <div className="flex gap-1">
                                    <div className="bg-white text-azulao font-semibold text-xs p-[2px] flex-1">{maiorCredito.data}</div>
                                    <div className="bg-white text-azulao font-semibold text-xs p-[2px] flex-1">{formatarNumero(maiorCredito.valor)}</div>
                                    </div>
                                    <div className="bg-white text-azulao font-semibold text-xs p-[2px]">{maiorCredito.descricao}</div>
                                    </>
                                )}
                            </div>
                            {/* fim transação de maior valor */}
                    </div>
                    {/* fim tabelinha de estatisticas */}

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