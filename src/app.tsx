import { useState } from "react";

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
                ? 'text-azul-logo font-bold'
                : 'text-black hover:text-roxao'
              }`}
              >
                {/* aqui é o valor que fica contido na tag a que será exibido. No caso, será a descrição armazenada em "label" */}
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="text-xl w-full text-center space-y-8 mt-6">
        <p className="text-azul-texto font-medium">Sua ferramenta de conversão <strong className="text-roxao font-bold">OFX</strong> favorita</p>
      </div>
      
    </div>
  );
}
