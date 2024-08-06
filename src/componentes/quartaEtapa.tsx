import { Undo2 } from "lucide-react"
import { PassoAPasso } from "./passo-a-passo"
import { IconeConversao } from "./icons/iconeConversao";

interface QuartaEtapaProps {
    etapa: number,
    selecionarEtapa: (etapa:number) => void,
    removeFile: () => void
}

export function QuartaEtapa ({ etapa, selecionarEtapa, removeFile } : QuartaEtapaProps) {
    removeFile();
    return (
        <div className='bg-white w-[1040px] m-auto rounded-xl py-6 px-6 gap-3 shadow-shape transition-all'>

        {/* cabeçalho da área de conversão */}
        <div className="w-full space-y-3 px-2.5 py-2.5">

          {/* passo a passo */}
          <PassoAPasso
            etapa={etapa}
          />
          {/* fim passo a passo */}

        </div>
        {/* fim cabeçalho da área de conversão */}

        {/* conteudo central */}
        <div className="flex flex-col gap-4 py-6 px-6 items-center justify-center">
          <p className='text-azulao text-3xl font-semibold'>Você concluiu a sua conversão para OFX!</p>

          <IconeConversao/> 

            <div className="flex flex-col justify-center items-center">
                <p className="text-azulao font-semibold text-xl">Conte conosco para sempre realizar suas conversões.</p>
                <p className="text-azulao font-semibold text-xl">Agradecemos a confiança!</p>
            </div>

        </div>
        {/* fim conteudo central */}

        {/* botão de retorno */}
        <div className="flex justify-center items-center py-3">

            <button onClick={() => selecionarEtapa(1)} className='flex items-center px-4 py-1.5 rounded-lg bg-azul-logo gap-2 text-white font-semibold text-lg hover:bg-blue-500 hover:text-white'>Converter novos arquivos <Undo2 className="text-white size-5"/> </button>
 
        </div>
        {/* fim botão de retorno */}

      </div> //fim área de conversão

    )
}