import { FileEdit } from './componentes/fileEdit';
import { useState } from "react";
import { FileSave } from './componentes/fileSave';
import { Celebration } from './componentes/celebration';

export function App() {
  // aqui deixamos guardado o id do único item do menu que estará como selecionado e indicamos a maneira de mudar o item que está guardado
  const [qualItemMenuSelecionado, setQualItemMenuSelecionado] = useState(''); //como optei por deixar o id como string, deixei as aspas

  //essa função recebe como parâmetro o id do item selecionado por clique e muda o id guardado em "qualItemMenuSelecionado" para ele
  function selecionarItemMenu(itemId:string) {
    setQualItemMenuSelecionado(itemId);
  };

  //aqui temos todos os itens âncora do menu, aonde o link será usado para navegar e o label será o texto escrito nele
  const menuItems = [
    { id: 'item-menu-1', link:'inicio', label: 'INICIO' },
    { id: 'item-menu-2', link:'conceito-ofx', label: 'O QUE É OFX' },
    { id: 'item-menu-3', link:'tutorial', label: 'TUTORIAL' }
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
              className={`${
                qualItemMenuSelecionado === item.id
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
      <div className="text-xl w-full text-center space-y-8 mt-6">

        {/* essa cor 'azul-texto' é uma cor específica que criei para se adequar ao protótipo */}
        <p className="text-azul-texto font-medium text-2xl">Sua ferramenta de conversão <strong className="text-roxao font-bold">OFX</strong> favorita</p>

        {/* área de conversão */}
        <div className='bg-white w-[1040px] m-auto'>

        {/* cabeçalho da área de conversão */}
        <div className="w-full space-y-3 px-2.5 py-2.5">

          {/* passo a passo */}
          <div className="flex items-center gap-2 w-full px-2 py-1 justify-center"> 
            <i className="bi bi-file-earmark-arrow-up-fill text-sky-700 text-3xl"></i>
            <div className="h-[2px] w-32 bg-blue-200"></div>
            <FileEdit color="#bfdbfe" size={36} />
            <div className="h-[2px] w-32 bg-blue-200"></div>
            <FileSave color="#bfdbfe" size={36} />
            <div className="h-[2px] w-32 bg-blue-200"></div>
            <Celebration color="#bfdbfe" size={36} />
          </div>
          {/* fim passo a passo */}

          <p className='text-azul-texto text-xl font-medium'>Selecione o formato do arquivo que deseja converter:</p>

          {/* botoes */}
          <div className='flex items-center gap-4 py-2 justify-center'>

          <button className='px-4 py-1.5 rounded-lg bg-rose-100 border-rose-700 border-2 text-rose-700 font-semibold text-sm hover:border-none hover:bg-rose-700 hover:text-white'>PDF (Padrão leitura)</button>

          <button className='px-4 py-1.5 rounded-lg bg-green-100 border-green-700 border-2 text-green-700 font-semibold text-sm hover:border-none hover:bg-green-600 hover:text-white'>CSV (Separado por vírgula)</button>

          </div>
          {/* fim botoes */}


        </div>
        {/* fim cabeçalho da área de conversão */}

        </div>
        {/* fim área de conversão */}


      </div>
      {/* fim main */}

      
    </div>
  );
}
