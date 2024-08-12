import { Celebration } from "./icons/celebration";
import { FileEdit } from "./icons/fileEdit";
import { FileSave } from "./icons/fileSave";

export function TutorialConversao () {
    return (
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
    )
}