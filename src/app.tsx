import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Menu } from "./componentes/menu";
import { PrimeiraEtapa } from "./componentes/primeiraEtapa";
import { SegundaEtapa } from "./componentes/segundaEtapa";
import { TerceiraEtapa } from "./componentes/terceiraEtapa";
import { QuartaEtapa } from "./componentes/quartaEtapa";
import { EnviarArquivo, baixarOFX } from "./service.jsx";
import { ConceitoOFX } from "./componentes/conceitoOFX.js";
import { TutorialConversao } from "./componentes/tutorialConversao";



export function App() {
  const [etapa, setEtapa] = useState<number>(1); //fiz esse estado para identificar se o mouse passou em cima ou nao do botão

  // aqui deixamos guardado o id do único item do menu que estará como selecionado e indicamos a maneira de mudar o item que está guardado
  const [qualItemMenuSelecionado, setQualItemMenuSelecionado] = useState(''); //como optei por deixar o id como string, deixei as aspas

  const [isIconeHover, setIsIconeHover] = useState(false); //fiz esse estado para identificar se o mouse passou em cima ou nao do botão

  const [file, setFile] = useState<File | null>(null); //essa parte indica que meu estado guarda ou nenhum ou 1 arquivo do tipo File
  const [conteudotabela, setconteudotabela]  = useState<any | null>(null)
  const [qualTipoArquivoSelecionado, setQualTipoArquivoSelecionado] = useState('PDF');
  const [isloading, setisloading] = useState(false)

  const ConverterArquivo = async () => {
    if (file) {
        try {
           setisloading(true)
           const arquivoconvertido = await EnviarArquivo(file);
           setconteudotabela(arquivoconvertido)
            console.log(arquivoconvertido); //retorno da api um json com todas as informaçoes contem as informaçoes para povoar a tabela
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
        }
    }
};

  const DownloadArquivo =  async  ()=>{
    let nome_pdf = file?.name;
    if (nome_pdf) {
      const nomeSemExtensao = nome_pdf.split('.').slice(0, -1).join('.');
      console.log(nomeSemExtensao);
      try {
        await baixarOFX(conteudotabela,nomeSemExtensao);
      } catch (error) {
        console.error("Erro ao baixar o arquivo:", error);
      }
    }

  }

  if(isloading){
    console.log("carregando pdf")

  }

const mudarConteudoTabela = (newList: any[]) => {
  setconteudotabela(newList);
};

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
          isloading = {isloading}
          tirarHoverIcone={tirarHoverIcone}
          colocarHoverIcone={colocarHoverIcone}
          voltarEtapa={voltarEtapa}
          qualTipoArquivoSelecionado={qualTipoArquivoSelecionado}
          avancarEtapa={avancarEtapa}
          functionconverter={ConverterArquivo}

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
        conteudotabela={conteudotabela}
        downloadarquivo={DownloadArquivo}
        mudarConteudoTabela={mudarConteudoTabela}

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

        <ConceitoOFX/>

        <TutorialConversao/>
      
      </div>
      {/* fim main */}


    </div>

  )
}
