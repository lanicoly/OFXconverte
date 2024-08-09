import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Menu } from "./componentes/menu";
import { PrimeiraEtapa } from "./componentes/primeiraEtapa";
import { SegundaEtapa } from "./componentes/segundaEtapa";
import { TerceiraEtapa } from "./componentes/terceiraEtapa";
import { QuartaEtapa } from "./componentes/quartaEtapa";
import { FileEdit } from "./componentes/icons/fileEdit";
import { FileSave } from "./componentes/icons/fileSave";
import { Celebration } from "./componentes/icons/celebration";



export function App() {
  const [etapa, setEtapa] = useState<number>(1); //fiz esse estado para identificar se o mouse passou em cima ou nao do botão

  // aqui deixamos guardado o id do único item do menu que estará como selecionado e indicamos a maneira de mudar o item que está guardado
  const [qualItemMenuSelecionado, setQualItemMenuSelecionado] = useState(''); //como optei por deixar o id como string, deixei as aspas

  const [isIconeHover, setIsIconeHover] = useState(false); //fiz esse estado para identificar se o mouse passou em cima ou nao do botão

  const [file, setFile] = useState<File | null>(null); //essa parte indica que meu estado guarda ou nenhum ou 1 arquivo do tipo File

  const [qualTipoArquivoSelecionado, setQualTipoArquivoSelecionado] = useState('PDF');

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]); //nessa parte, estamos indicando que não será colocando um arquivo atrás do outro, mas sim que o arquivo selecionado vai ser o único que constará em 'files'
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
  }, [file]);

  const dropzone = useDropzone({
    onDrop,
    
    accept: qualTipoArquivoSelecionado === 'PDF'
    ? { 'application/pdf': ['.pdf'] }
    : { 'application/csv': ['.csv'] },

    noClick: true, // esse noClick impede que o clique na area de dropzone abra o explorador de arquivos
    noKeyboard: true, // esse noKeyboard impede que o teclado possa abrir o explorador de arquivos
  });

  // função que vai mudar a etapa para que seja exibido conforme a que for selecionada
  function selecionarEtapa(etapa: number) {
    setEtapa(etapa);
    console.log(`Etapa modificada para: ${etapa}`);
  }

  // essa função auxilia a exibição correta dos componentes de cada etapa, garantindo a navegação correta alinhada com o passo a passo
  function voltarEtapa() {
    if (etapa === 2) { //caso esteja voltando da etapa 2 para 1, o arquivo é removido, pois na primeira etapa não há arquivo
      removeFile();
      console.log("Removendo File...");
    } 
    if (etapa > 1) { //não há um botão de voltar na etapa 1, mas é feita essa verificação a fim de desencargo de consciência
      console.log("Voltando etapa...");
      selecionarEtapa(etapa - 1);
    }
  }

  function avancarEtapa() {
    if (etapa < 4) { //não há um botão de voltar na etapa 1, mas é feita essa verificação a fim de desencargo de consciência
      console.log("Avançando etapa...");
      selecionarEtapa(etapa + 1);
    }
  }

  //essa função recebe como parâmetro o id do item selecionado por clique e muda o id guardado em "qualItemMenuSelecionado" para ele
  function selecionarItemMenu(itemId: string) {
    setQualItemMenuSelecionado(itemId);
  };

  function selecionarTipoArquivo(tipo: 'PDF' | 'CSV') {
    setQualTipoArquivoSelecionado(tipo);
    console.log(`Tipo de arquivo selecionado: ${tipo}`)
  }

  //aqui ele vai reagir para a estrutura toda do botao se somente o botão já estiver hover ou nao no caso do false
  function colocarHoverIcone() {
    setIsIconeHover(true);
  }

  function tirarHoverIcone() {
    setIsIconeHover(false);
  }

  // essa variável foi criada para que os componentes das etapas sejam exibidos conforme a etapa atual e não se houver file ou não (como era anteriormente nos primeiros testes)
  let etapaComponent;
  switch (etapa) {
    case 1:
      etapaComponent = (
        <PrimeiraEtapa
          file={file}
          etapa={etapa}
          dropzone={dropzone}
          isIconeHover={isIconeHover}
          tirarHoverIcone={tirarHoverIcone}
          colocarHoverIcone={colocarHoverIcone}
          selecionarEtapa={selecionarEtapa}
          selecionarTipoArquivo={selecionarTipoArquivo}
          qualTipoArquivoSelecionado={qualTipoArquivoSelecionado}

        />
      );
      break;
    case 2:
      etapaComponent = (
        <SegundaEtapa
          file={file}
          dropzone={dropzone}
          etapa={etapa}
          isIconeHover={isIconeHover}
          tirarHoverIcone={tirarHoverIcone}
          colocarHoverIcone={colocarHoverIcone}
          voltarEtapa={voltarEtapa}
          qualTipoArquivoSelecionado={qualTipoArquivoSelecionado}
          avancarEtapa={avancarEtapa}

        />
      );
      break;
    case 3:
      etapaComponent = (
        <TerceiraEtapa
        file={file}
        etapa={etapa}
        voltarEtapa={voltarEtapa}
        avancarEtapa={avancarEtapa}

        />
      );
      break;
    case 4:
      etapaComponent = (
        <QuartaEtapa
          etapa={etapa}
          selecionarEtapa={selecionarEtapa}
          removeFile={removeFile}
          
        />
      );
      break
    default:
      etapaComponent = null;
  }

  //aqui temos todos os itens âncora do menu, aonde o link será usado para navegar e o label será o texto escrito nele
  const menuItems = [
    { id: 'item-menu-1', link: 'inicio', label: 'INICIO' },
    { id: 'item-menu-2', link: 'conceito-ofx', label: 'O QUE É OFX' },
    { id: 'item-menu-3', link: 'tutorial', label: 'TUTORIAL' }
  ];

  return (
    <div className="space-y-4 my-4">

      <Menu
        menuItems={menuItems}
        qualItemMenuSelecionado={qualItemMenuSelecionado}
        selecionarItemMenu={selecionarItemMenu}
      />

      {/* main */}
      <div className="relative text-xl w-full text-center space-y-8 mt-6 mb-6 top-[80px]">

        {/* essa cor 'azulao' é uma cor específica que criei para se adequar ao protótipo */}
        <p className="text-azulao font-medium text-2xl">Sua ferramenta de conversão <strong className="text-roxao font-bold">OFX</strong> favorita</p>

        {etapaComponent}

        <div className="flex items-center flex-col justify-center gap-3 my-6">
            <h1 className="font-semibold text-3xl mt-4">O QUE É EXTRATO <strong className="text-roxao font-bold">OFX</strong>?</h1>

             <div className="flex mx-80 mt-4 ">
                <div className="flex w-3 bg-gradient-to-b from-azul-logo to-roxao shadow-shape"></div> {/* barra lateral degrade */}
                <div className=" bg-white px-4 py-4 rounded-e-lg shadow-shape flex-1 text-left">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, labore rerum consequuntur in perspiciatis, explicabo eos excepturi, nisi impedit nihil sapiente? Quo, perspiciatis repellendus inventore ullam quia iste eaque mollitia!
                </div>
            </div>

             <div className="flex mx-80 mt-4">
                <div className="flex w-3 bg-gradient-to-b from-azul-logo to-roxao shadow-shape"></div> {/* barra lateral degrade */}
                <div className=" bg-white px-4 py-4 rounded-e-lg shadow-shape text-left flex-1">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam, labore rerum consequuntur in perspiciatis, explicabo eos excepturi, nisi impedit nihil sapiente? Quo, perspiciatis repellendus inventore ullam quia iste eaque mollitia!
                </div>
            </div>

        </div>

        <div className='bg-white w-[1040px] m-auto rounded-xl py-6 px-6 gap-6 shadow-shape'>
          <h1 className="font-semibold text-3xl my-3">TUTORIAL DE CONVERSÃO <strong className="text-roxao font-bold">OFX</strong></h1>
          <div className=" flex-wrap flex my-6 justify-center gap-7">
            
            {/* card */}
            <div className="flex flex-col gap-1">
              <div className="px-4 py-1.5 rounded-t-lg bg-gradient-to-r from-azul-logo to-roxao border-none text-white font-semibold text-lg w-96">Passo 1</div>
              <div className="px-3 py-2 rounded-b-lg bg-sky-100 flex gap-3 w-96 justify-center items-center">
                <div className="size-12 rounded-lg bg-white flex justify-center items-center">
                  <i className="bi bi-file-earmark-arrow-up-fill text-azulao text-3xl"></i>
                </div>
                <p className="text-base text-azulao font-medium flex-1 text-left leading-5 py-2 flex items-center justify-center">Selecione o tipo do arquivo que deseja converter e logo após escolha um ou mais arquivos para realizar a conversão</p>
              </div>
            </div>
            {/* fim card */}

            {/* card 2 */}
            <div className="flex flex-col gap-1">
              <div className="px-4 py-1.5 rounded-t-lg bg-gradient-to-r from-azul-logo to-roxao border-none text-white font-semibold text-lg w-96">Passo 2</div>
              <div className="px-3 py-2 rounded-b-lg bg-sky-100 flex gap-3 w-96 justify-center items-center">
                <div className="size-12 rounded-lg bg-white flex justify-center items-center">
                  <FileEdit color="#0078a7" size={36} />
                </div>
                <p className="text-base text-azulao font-medium flex-1 text-left leading-5 py-2 flex items-center justify-center">Visualize, edite ou exclua os arquivos escolhidos e adicione mais arquivos caso necessário</p>
              </div>
            </div>
            {/* fim card */}
            
            {/* card 3 */}
            <div className="flex flex-col gap-1">
              <div className="px-4 py-1.5 rounded-t-lg bg-gradient-to-r from-azul-logo to-roxao border-none text-white font-semibold text-lg w-96">Passo 3</div>
              <div className="px-3 py-2 rounded-b-lg bg-sky-100 flex gap-3 w-96 justify-center items-center">
                <div className="size-12 rounded-lg bg-white flex justify-center items-center">
                  <FileSave color="#0078a7" size={32} />
                </div>
                <p className="text-base text-azulao font-medium flex-1 text-left leading-5 py-2 flex items-center justify-center">Visualize e edite o resultado da conversão em OFX e faça o download</p>
              </div>
            </div>
            {/* fim card */}
            
            {/* card 4 */}
            <div className="flex flex-col gap-1">
              <div className="px-4 py-1.5 rounded-t-lg bg-gradient-to-r from-azul-logo to-roxao border-none text-white font-semibold text-lg w-96">Passo 4</div>
              <div className="px-3 py-2 rounded-b-lg bg-sky-100 flex gap-3 w-96 justify-center items-center">
                <div className="size-12 rounded-lg bg-white flex justify-center items-center">
                  <Celebration color="#0078a7" size={32} />
                </div>
                <p className="text-base text-azulao font-medium flex-1 text-left leading-5 py-2 flex items-center justify-center">Conclusão da conversão realizada e direcionamento para o início</p>
              </div>
            </div>
            {/* fim card */}


          </div>

        </div>
      
      </div>
      {/* fim main */}


    </div>

  )
}
