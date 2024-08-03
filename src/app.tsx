import { FileEdit } from './componentes/fileEdit';
import { useCallback, useState } from "react";
import { FileSave } from './componentes/fileSave';
import { Celebration } from './componentes/celebration';
import { CopyPlus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AddNotes } from './componentes/addNotes';

export function App() {
  // aqui deixamos guardado o id do único item do menu que estará como selecionado e indicamos a maneira de mudar o item que está guardado
  const [qualItemMenuSelecionado, setQualItemMenuSelecionado] = useState(''); //como optei por deixar o id como string, deixei as aspas

  const [isIconeHover, setIsIconeHover] = useState(false); //fiz esse estado para identificar se o mouse passou em cima ou nao do botão

  const [file, setFile] = useState<File | null>(null); //essa parte indica que meu estado guarda ou nenhum ou 1 arquivo do tipo File

  if (file) return null; //só pra não fazer nada no momento

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]); //nessa parte, estamos indicando que não será colocando um arquivo atrás do outro, mas sim que o arquivo selecionado vai ser o único que constará em 'files'
    console.log('Arquivo carregado');
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'] //tipo de arquivo aceito no momento: PDF
    },
    noClick: true, // esse noClick impede que o clique na area de dropzone abra o explorador de arquivos
    noKeyboard: true, // esse noKeyboard impede que o teclado possa abrir o explorador de arquivos
  });

  const { getRootProps, getInputProps, isDragActive } = dropzone;

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

  return (
    <div>

      {/* menu */}
      <nav className="relative flex items-center px-16 py-2 border-b-4 h-20 border-sky-100 bg-white">
        <div className="absolute">
          <img className="w-32" src="/logo-ofx-converte.svg" alt="logo ofx converte" />
        </div>
        <div className="flex-1 flex justify-center z-0">
          <div className="flex items-center gap-16 font-semibold">

            {/* aqui será exibido cada item dentro da lista de menuItems */}
            {menuItems.map((item) => (
              <a
                // o href é justamente o direcionamento descrito para cada item
                href={`#${item.link}`}
                //aqui chama a função ao clicar e passa o id desse item como parametro
                onClick={() => selecionarItemMenu(item.id)}

                //aqui está sendo feito uma verificação para estilizar o item. se o valor guardado na variável lá de cima for igual ao id do item, entao o item ficara azul e mais destacado. se não, ficará preto e ao passar o mouse ficará roxinho
                className={`${qualItemMenuSelecionado === item.id
                    ? 'text-azul-logo font-bold' //esse 'azul-logo' é uma cor específica que criei para se adequar ao protótipo 
                    : 'text-black hover:text-roxao' //esse 'roxao' é uma cor específica que criei para se adequar ao protótipo
                  }`}
              >
                {/* aqui é o valor que fica contido na tag a que será exibido. No caso, será a descrição armazenada em "label" */}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      {/* fim menu */}

      {/* main */}
      <div className="text-xl w-full text-center space-y-8 mt-6 mb-6">

        {/* essa cor 'azulao' é uma cor específica que criei para se adequar ao protótipo */}
        <p className="text-azulao font-medium text-2xl">Sua ferramenta de conversão <strong className="text-roxao font-bold">OFX</strong> favorita</p>

        {/* área de conversão */}
        <div className='bg-white w-[1040px] m-auto rounded-xl py-7 px-6 gap-3 shadow-shape'>

          {/* cabeçalho da área de conversão */}
          <div className="w-full space-y-3 px-2.5 py-2.5">

            {/* passo a passo */}
            <div className="flex items-center gap-2 w-full px-2 py-1 justify-center">
              <i className="bi bi-file-earmark-arrow-up-fill text-azulao text-3xl"></i>
              <div className="h-[2px] w-32 bg-blue-200"></div>
              <FileEdit color="#bfdbfe" size={36} />
              <div className="h-[2px] w-32 bg-blue-200"></div>
              <FileSave color="#bfdbfe" size={36} />
              <div className="h-[2px] w-32 bg-blue-200"></div>
              <Celebration color="#bfdbfe" size={36} />
            </div>
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
            className='flex flex-col items-center justify-center bg-sky-100 py-9 px-4 gap-6 rounded-xl border-[3px] border-dotted border-azul-logo hover:bg-sky-150 hover:border-azulao'
          >
            <p className='text-azulao font-medium text-xl'>Insira abaixo o arquivo do formato escolhido <br />que deseja converter em OFX</p>

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

        </div>
        {/* fim área de conversão */}


      </div>
      {/* fim main */}


    </div>
  );
}
