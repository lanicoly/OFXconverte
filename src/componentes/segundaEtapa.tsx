import { CopyPlus, MoveRight, Shuffle, Undo2 } from "lucide-react";
import { PassoAPasso } from "./passo-a-passo";
import { Description } from "./icons/description";
import { SourceNotes } from "./icons/source-notes";
import { DropzoneState } from "react-dropzone";
import { useState } from "react";



interface SegundaEtapaProps {
    file?: File | null,
    etapa:number,
    dropzone: DropzoneState,
    isIconeHover: boolean,
    tirarHoverIcone: () => void,
    colocarHoverIcone: () => void,
    voltarEtapa: (etapa:number) => void,
    avancarEtapa: (etapa:number) => void,
    qualTipoArquivoSelecionado: string,
    functionconverter: ()=> void,
    finalizarLoading: () => void,
    inserirAgencia: (agencia:string) => void,
    inserirConta: (conta:string) => void

}


export function SegundaEtapa ({ file, etapa, dropzone, isIconeHover,finalizarLoading, tirarHoverIcone, colocarHoverIcone, voltarEtapa, avancarEtapa, qualTipoArquivoSelecionado, functionconverter, inserirAgencia, inserirConta}: SegundaEtapaProps) {
    const { getRootProps, getInputProps, isDragActive } = dropzone;
    const [agencia, setAgencia] = useState<string>('');
    const [conta, setConta] = useState<string>('');

    const conversaoarquiv = async () =>{
          await functionconverter()
          console.log("Conversao concluida!")
          finalizarLoading()
          inserirAgencia(agencia)
          inserirConta(conta)
          avancarEtapa(etapa)
    }

    const handleAgenciaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAgencia(event.target.value);
  };

  const handleContaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setConta(event.target.value);
  };

    return (
      <div className='bg-white w-[1040px] m-auto rounded-xl py-6 px-12 space-y-4 shadow-shape transition-all'>

        {/* cabeçalho da área de conversão */}
        <div className="w-full space-y-4 px-2.5 py-2.5">

          {/* passo a passo */}
          <PassoAPasso
            etapa={etapa}
          />
          {/* fim passo a passo */}

          {/* indicação da conversão do tipo de arquivo escolhido */}
          <div className='flex items-center gap-4 justify-center'>

          {qualTipoArquivoSelecionado === 'PDF' ? (
            <div className='px-4 py-1.5 rounded-lg bg-gradient-to-r from-azul-logo to-roxao border-none text-white font-semibold text-base'>PDF (Padrão leitura)</div>
          ) : (
            <div className='px-4 py-1.5 rounded-lg bg-gradient-to-r from-azul-logo to-roxao border-none text-white font-semibold text-base'>CSV (Separado por vírgula)</div>
          )}
            <Shuffle className="size-6 text-azulao" />
            <span className="text-roxao font-extrabold text-2xl">OFX</span>

          </div>
          {/* fim indicação da conversão do tipo de arquivo escolhido */}

          <p className='text-azulao text-xl font-medium'>Confira seu arquivo antes de convertê-lo:</p>

        </div>
        {/* fim cabeçalho da área de conversão */}


        {/* conteudo central visualização + substituição */}
        <div className="flex gap-4">

          {/* form que pega agencia e conta do usuario */}
        <form action="submit">

        <fieldset className={"w-full h-full flex flex-col items-center py-6 px-4 gap-4 rounded-xl border-[3px] border-solid border-blue-200 bg-sky-50"}>
          <p className='text-azulao font-medium text-base'>Informe sua agência e conta para prosseguir com a conversão.</p>
          
          {/* eu poderia fazer uma validação para garantir o envio adequado desse dado */}
          <div className="flex flex-col gap-1 justify-center">
              <label className="text-base text-roxao font-medium text-left" htmlFor="agencia">Agência</label>
              <input value={agencia} onChange={handleAgenciaChange} className="placeholder-violet-600 text-sm border-2 border-solid border-roxao px-2 py-1 rounded-md" type="text" name="agencia" id="agencia" placeholder="Informe sua agência"/>
          </div>
          <div className="flex flex-col gap-1 justify-center">
              <label className="text-base text-roxao font-medium text-left" htmlFor="conta">Conta</label>
              <input value={conta} onChange={handleContaChange} className="placeholder-violet-600 text-sm border-2 border-solid border-roxao px-2 py-1 rounded-md" type="text" name="conta" id="conta" placeholder="Informe sua conta"/>
          </div>

        </fieldset>
        </form>
        {/* fim form que pega agencia e conta do usuario */}


        {/* parte de visualização do arquivo */}
        <div className={"w-full flex flex-col items-center justify-center py-6 px-4 gap-4 rounded-xl border-[3px] border-solid border-blue-200 bg-sky-50"}>
          <p className='text-azulao font-medium text-xl'>O arquivo abaixo foi selecionado para <br /> ser convertido em OFX.</p>
          
          <div className="flex flex-col justify-center items-center flex-wrap">

          <Description color={"#3cacdd"} size={148}/>
          <h2 className="text-azulao font-semibold text-xl">{file?.name}</h2>

          </div>

        </div>
        {/* fim parte de visualização de arquivo */}

        {/* parte de seleção de arquivo */}
        <div {...getRootProps()} //nessa parte como um todo podemos jogar o arquivo desejado
          className={`flex flex-col items-center justify-center py-4 px-5 gap-3 rounded-xl border-[3px] border-dotted w-3/5 ${isDragActive ? 'bg-sky-150 border-azulao' : 'bg-sky-100 border-azul-logo'}  `}
        >
          {isDragActive ? // esse isDragActive vem direto da biblioteca e serve pra identificar se estamos com um arquivo em cima na área de drag and drop. caso esteja o icone muda de cor
            (<p className='text-azulao font-medium text-base'>Solte aqui para substituir o arquivo <br />que deseja converter em OFX</p>)
            : (<p className='text-azulao font-medium text-base'>Insira abaixo o arquivo que deseja substituir o atual selecionado ao lado</p>)
          }

          <SourceNotes color={isDragActive ? "#0078A7" : "#93c5fd"} size={124} />

          {/* botão e instrução de troca de arquivo */}
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
                className='px-3 py-1.5 rounded-lg bg-white border-roxao border-[3px] text-roxao font-semibold flex items-center gap-2 text-sm'
              >
                Substituir arquivo <CopyPlus className='text-roxao size-4' strokeWidth={2} />
              </button>
            ) : (
              <button
                onMouseEnter={colocarHoverIcone} //caso nao esteja hover ele fica azul e ao colocar o mouse dentro fica hover
                onClick={() => document.getElementById('dropzone-file')?.click()}
                className='px-3 py-1.5 rounded-lg bg-white border-blue-300 border-[3px] text-azulao font-semibold flex items-center gap-2 text-sm'
              >
                Substituir arquivo <CopyPlus className='text-azulao size-4' strokeWidth={2} />
              </button>
            )}
            <p className='text-azulao font-medium text-sm'>ou solte aqui</p>

          </div>
            {/* fim botão e instrução de troca de arquivo */}

        </div>
        {/* fim parte de seleção de arquivo */}

        </div>
        {/* fim conteudo central visualização + substituição */}

        {/* botões de voltar e converter*/}
        <div className="flex justify-between items-center">

            <button onClick={() => voltarEtapa(etapa)} className='flex items-center px-4 py-1.5 rounded-lg bg-azul-logo gap-2 text-white font-semibold text-base hover:bg-blue-500 hover:text-white'>Voltar <Undo2 className="text-white size-4"/> </button>
            <button onClick={() =>conversaoarquiv()} className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-roxao text-white font-semibold text-base hover:bg-purple-800'>Converter <MoveRight className="text-white size-4" /> </button>
            </div>

        {/* fim botões de voltar e converter*/}
        </div>

    )
}
