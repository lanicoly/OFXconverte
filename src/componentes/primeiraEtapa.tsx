import { CopyPlus } from "lucide-react";
import { AddNotes } from "./icons/addNotes";
import { PassoAPasso } from "./passo-a-passo";
import { DropzoneState } from "react-dropzone";
import { useEffect } from "react";

interface PrimeiraEtapaProps {
    file?: File | null,
    etapa:number,
    dropzone: DropzoneState,
    isIconeHover: boolean,
    tirarHoverIcone: () => void,
    colocarHoverIcone: () => void,
    selecionarEtapa: (etapa:number) => void,
    selecionarTipoArquivo: (tipo: 'PDF' | 'CSV') => void,
    qualTipoArquivoSelecionado: string
}
  
export function PrimeiraEtapa({file, selecionarEtapa, etapa, dropzone, isIconeHover, tirarHoverIcone, colocarHoverIcone, selecionarTipoArquivo, qualTipoArquivoSelecionado} : PrimeiraEtapaProps) {

    useEffect(() => {
      if (file) {
        selecionarEtapa(2);
      }
    }, [file]);

    const { getRootProps, getInputProps, isDragActive } = dropzone;

    return (
        
        <div className='bg-white w-[1040px] m-auto rounded-xl py-6 px-6 gap-3 shadow-shape transition-all'>

        {/* cabeçalho da área de conversão */}
        <div className="w-full space-y-3 px-2.5 py-2.5">

          {/* passo a passo */}
          <PassoAPasso
            etapa={etapa}
          />
          {/* fim passo a passo */}

          <p className='text-azulao text-xl font-medium'>Selecione o formato do arquivo que deseja converter:</p>

          {/* botoes */}
          <div className='flex items-center gap-4 py-2 justify-center'>

            {qualTipoArquivoSelecionado === 'PDF' ? (
              <>
              <button className='px-4 py-1.5 rounded-lg font-semibold text-sm border-rose-800 border-2 bg-rose-700 text-white'>PDF (Padrão leitura)</button>

              <button onClick={() => selecionarTipoArquivo('CSV')} className='px-4 py-1.5 rounded-lg bg-green-100 border-green-700 border-2 text-green-700 font-semibold text-sm hover:bg-green-600 hover:text-white'>CSV (Separado por vírgula)</button>
              </>
            ) : (
              <>
              <button onClick={() => selecionarTipoArquivo('PDF')} className='px-4 py-1.5 rounded-lg bg-rose-100 border-rose-800 border-2 text-rose-700 font-semibold text-sm hover:bg-rose-700 hover:text-white'>PDF (Padrão leitura)</button>

              <button className='px-4 py-1.5 rounded-lg  font-semibold text-sm border-green-700 border-2 bg-green-600 text-white'>CSV (Separado por vírgula)</button>
              </>
            )
            }
          </div>
          {/* fim botoes */}

        </div>
        {/* fim cabeçalho da área de conversão */}

        {/* parte de seleção de arquivo */}
        <div {...getRootProps()} //nessa parte como um todo podemos jogar o arquivo desejado
          className={`flex flex-col items-center justify-center py-9 px-4 gap-6 rounded-xl border-[3px] border-dotted transition-all ${isDragActive ? 'bg-sky-150 border-azulao' : 'bg-sky-100 border-azul-logo'}  `}
        >
          {isDragActive ? (
            <p className='text-azulao font-medium text-xl'>Solte aqui para adicionar o arquivo do formato escolhido <br />que deseja converter em OFX</p>
          ) : (
          <p className='text-azulao font-medium text-xl'>Insira abaixo o arquivo do formato escolhido <br />que deseja converter em OFX</p>
        )}

          {/* esse isDragActive vem direto da biblioteca e serve pra identificar se estamos com um arquivo em cima na área de drag and drop. caso esteja o icone muda de cor */}
          <AddNotes color={isDragActive ? "#0078A7" : "#93c5fd"} size={128} />

          <div className='space-y-2'>
            <input
              id='dropzone-file'
              type='file'
              {...getInputProps()}
              className='hidden'
            />

            {/* essa parte eu fiz para que, ao passar o mouse, tanto o botao quanto o icone mudem de cor. usando apenar o atributo 'hover' do tailwind isso não ocorre e teria que passar o mouse exatamente em cima do icone e não só do botão */}
            {isIconeHover ? (
              <button
                onMouseLeave={tirarHoverIcone} //ao estar 'hover' ele fica roxo e ao tirar o mouse ele fica normal
                onClick={() => document.getElementById('dropzone-file')?.click()} //aqui habilita o clique somente para o botão mesmo
                className='px-4 py-1.5 rounded-lg bg-white border-roxao border-[3px] text-roxao font-semibold flex items-center gap-2'
              >
                Escolher arquivo <CopyPlus className='text-roxao size-5' strokeWidth={2.5} />
              </button>
            ) : (
              <button
                onMouseEnter={colocarHoverIcone} //caso nao esteja hover ele fica azul e ao colocar o mouse dentro fica hover
                onClick={() => document.getElementById('dropzone-file')?.click()}
                className='px-4 py-1.5 rounded-lg bg-white border-blue-300 border-[3px] text-azulao font-semibold flex items-center gap-2'
              >
                Escolher arquivo <CopyPlus className='text-azulao size-5' strokeWidth={2.5} />
              </button>
            )}
            <p className='text-azulao font-medium'>ou solte aqui</p>

          </div>

        </div>
        {/* fim parte de seleção de arquivo */}

      </div> //fim área de conversão


    )
}