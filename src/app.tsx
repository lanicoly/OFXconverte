import { useCallback, useState } from "react";
import { CopyPlus, Shuffle } from 'lucide-react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { AddNotes } from './componentes/icons/addNotes';
import { PassoAPasso } from "./componentes/passo-a-passo";
import { Menu } from "./componentes/menu";
import { Description } from "./componentes/icons/description";
import { SourceNotes } from "./componentes/icons/source-notes";

interface HasFileProps {
  file?: File,
  dropzone: DropzoneState
}

export function App() {
  const [etapa, setEtapa] = useState<number>(1); //fiz esse estado para identificar se o mouse passou em cima ou nao do botão

  // aqui deixamos guardado o id do único item do menu que estará como selecionado e indicamos a maneira de mudar o item que está guardado
  const [qualItemMenuSelecionado, setQualItemMenuSelecionado] = useState(''); //como optei por deixar o id como string, deixei as aspas

  const [isIconeHover, setIsIconeHover] = useState(false); //fiz esse estado para identificar se o mouse passou em cima ou nao do botão

  const [file, setFile] = useState<File | null>(null); //essa parte indica que meu estado guarda ou nenhum ou 1 arquivo do tipo File


  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]); //nessa parte, estamos indicando que não será colocando um arquivo atrás do outro, mas sim que o arquivo selecionado vai ser o único que constará em 'files'
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'] //tipo de arquivo aceito no momento: PDF
    },
  });

  const { getRootProps, getInputProps, isDragActive } = dropzone;


  function selecionarEtapa(etapa: number) {
    setEtapa(etapa);
  }

  //essa função recebe como parâmetro o id do item selecionado por clique e muda o id guardado em "qualItemMenuSelecionado" para ele
  function selecionarItemMenu(itemId: string) {
    setQualItemMenuSelecionado(itemId);
  };

  //aqui ele vai reagir para a estrutura toda do botao se somente o botão já estiver hover ou nao no caso do false
  function colocarHoverIcone() {
    setIsIconeHover(true);
  }

  function tirarHoverIcone() {
    setIsIconeHover(false);
  }

  //aqui temos todos os itens âncora do menu, aonde o link será usado para navegar e o label será o texto escrito nele
  const menuItems = [
    { id: 'item-menu-1', link: 'inicio', label: 'INICIO' },
    { id: 'item-menu-2', link: 'conceito-ofx', label: 'O QUE É OFX' },
    { id: 'item-menu-3', link: 'tutorial', label: 'TUTORIAL' }
  ];

  const HasFile = ({ file, dropzone }: HasFileProps) => {

    const { getRootProps, getInputProps, isDragActive } = dropzone;

    selecionarEtapa(2)
    return (
      <div className='bg-white w-[1040px] m-auto rounded-xl py-6 px-12 space-y-4 shadow-shape'>

        {/* cabeçalho da área de conversão */}
        <div className="w-full space-y-4 px-2.5 py-2.5">

          {/* passo a passo */}
          <PassoAPasso
            etapa={etapa}
          />
          {/* fim passo a passo */}

          {/* indicação da conversão do tipo de arquivo escolhido */}
          <div className='flex items-center gap-4 justify-center'>

            <div className='px-4 py-1.5 rounded-lg bg-gradient-to-r from-azul-logo to-roxao border-none text-white font-semibold text-base'>PDF (Padrão leitura)</div>
            <Shuffle className="size-6 text-azulao" />
            <span className="text-roxao font-extrabold text-2xl">OFX</span>

          </div>
          {/* fim indicação da conversão do tipo de arquivo escolhido */}

          <p className='text-azulao text-xl font-medium'>Confira seu arquivo antes de convertê-lo:</p>

        </div>
        {/* fim cabeçalho da área de conversão */}

        <div className="flex gap-4">

        {/* parte de visualização do arquivo */}
        <div className={"w-full flex flex-col items-center justify-center py-6 px-4 gap-4 rounded-xl border-[3px] border-solid border-blue-200 bg-sky-50"}>
          <p className='text-azulao font-medium text-xl'>O arquivo abaixo foi selecionado para <br /> ser convertido em OFX.</p>
          
          <div>

          <Description color={"#3cacdd"} size={148}/>
          <h2 className="text-azulao font-semibold text-2xl">{file?.name}</h2>

          </div>

        </div>
        {/* fim parte de visualização de arquivo */}

        {/* parte de seleção de arquivo */}
        <div {...getRootProps()} //nessa parte como um todo podemos jogar o arquivo desejado
          className={`flex flex-col items-center justify-center py-4 px-5 gap-3 rounded-xl border-[3px] border-dotted w-3/5 ${isDragActive ? 'bg-sky-150 border-azulao' : 'bg-sky-100 border-azul-logo'}  `}
        >
          {isDragActive ?
            (<p className='text-azulao font-medium text-base'>Solte aqui para substituir o arquivo <br />que deseja converter em OFX</p>)
            : (<p className='text-azulao font-medium text-base'>Insira abaixo o arquivo que deseja substituir o atual selecionado ao lado</p>)
          }

          {/* esse isDragActive vem direto da biblioteca e serve pra identificar se estamos com um arquivo em cima na área de drag and drop. caso esteja o icone muda de cor */}
          <SourceNotes color={isDragActive ? "#0078A7" : "#93c5fd"} size={124} />

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

        </div>
        {/* fim parte de seleção de arquivo */}
        </div>

      </div>
    )
  }

  return (
    <div>

      {/* menu */}
      <Menu
        menuItems={menuItems}
        qualItemMenuSelecionado={qualItemMenuSelecionado}
        selecionarItemMenu={selecionarItemMenu}
      />
      {/* fim menu */}

      {/* main */}
      <div className="relative text-xl w-full text-center space-y-6 mt-6 mb-6 top-[80px]">

        {/* essa cor 'azulao' é uma cor específica que criei para se adequar ao protótipo */}
        <p className="text-azulao font-medium text-2xl">Sua ferramenta de conversão <strong className="text-roxao font-bold">OFX</strong> favorita</p>

        {/* área de conversão */}

        {file ? <HasFile file={file} dropzone={dropzone}/> : 

        <div className='bg-white w-[1040px] m-auto rounded-xl py-6 px-6 gap-3 shadow-shape'>

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

            <button className='px-4 py-1.5 rounded-lg bg-rose-100 border-rose-700 border-2 text-rose-700 font-semibold text-sm hover:border-none hover:bg-rose-700 hover:text-white'>PDF (Padrão leitura)</button>

            <button className='px-4 py-1.5 rounded-lg bg-green-100 border-green-700 border-2 text-green-700 font-semibold text-sm hover:border-none hover:bg-green-600 hover:text-white'>CSV (Separado por vírgula)</button>

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
        }

      </div>
      {/* fim main */}


    </div>
  );
}
