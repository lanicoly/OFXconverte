
interface MenuItem {
    id: string;
    link: string;
    label: string;
  }
  
  interface MenuProps {
    menuItems: MenuItem[];
    selecionarItemMenu: (itemId: string) => void;
    qualItemMenuSelecionado: string;
  }
  
export function Menu({
    menuItems,
    selecionarItemMenu,
    qualItemMenuSelecionado
}: MenuProps){
    return (
        <nav className="fixed w-full top-0 flex items-center px-16 py-2 border-b-4 h-20 border-sky-100 bg-white z-10">
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
    )
}