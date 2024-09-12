import { Trash2 } from "lucide-react";
interface TabelaConversaoProps {
    currentItems: any,
    hoveredIndex: number | null,
    setHoveredIndex: (index: number | null) => void,
    deleteItem: (index:number) => void,
    formatarData: (data: string) => string
}


export function TabelaConversao ( {currentItems, hoveredIndex, deleteItem, setHoveredIndex, formatarData} : TabelaConversaoProps) {
    
    

    return (
        <div className="relative w-full overflow-y-auto border-[3px] border-sky-200 max-h-[368px]">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gradient-to-r from-azul-logo to-roxao sticky top-0 z-8">
                    <tr>
                        <th className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Data</th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Valor (R$)</th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">ID</th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Descrição</th>
                        <th className="py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto max-h-[370px]">
                    {currentItems.map((transacao: any, index: number) => (
                        <tr
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={` ${index === hoveredIndex ? 'bg-gray-100' : ''}`}                    >
                            <td className="px-3 py-4 text-xs font-semibold text-sky-800">{formatarData(transacao.date)}</td>
                            <td className="px-3 py-4 max-w-16 flex-wrap text-xs text-azulao font-semibold">{transacao.type}</td>
                            <td className={`px-3 py-4 max-w-16 flex-wrap text-xs ${transacao.amount > 0 ? 'text-azulao' : 'text-rose-800'}  font-semibold`}>{transacao.amount}</td>
                            <td className="px-3 py-4 max-w-16 flex-wrap text-xs font-semibold">{transacao.FITID}</td>
                            <td className="px-3 py-4 max-w-16 flex-wrap text-xs text-azulao font-semibold text-left">{transacao.description}</td>
                            <td className="py-4 text-sm font-medium flex items-center justify-center">
                                <button onClick={() => deleteItem(index)}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-lg border-2 text-sm font-semibold ${index === hoveredIndex
                                            ? 'bg-rose-700 border-rose-800 text-white hover:bg-rose-800'
                                            : 'bg-rose-100 border-rose-800 text-rose-700 hover:bg-rose-200'
                                        }`}
                                >
                                    Excluir <Trash2 className={`size-4 ${index === hoveredIndex ? 'text-white' : 'text-rose-700'}`} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
