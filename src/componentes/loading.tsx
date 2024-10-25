import { Loader } from "lucide-react";

export function Loading () {
    return (
        <div className='bg-white w-[720px] m-auto rounded-xl py-6 px-6 gap-2 shadow-shape transition-all'>
            <div className="flex flex-col justify-center items-center gap-2">
                <Loader className="text-roxao size-11 animate-loading-spin"/>
                <div className="flex flex-col m-auto ">
                    <p className="text-azulao font-bold text-lg">Conversão em andamento</p>
                    <p className="text-azulao font-semibold text-sm">Isso pode levar alguns segundos...</p>
                </div>
            </div>
        </div>
    )
}