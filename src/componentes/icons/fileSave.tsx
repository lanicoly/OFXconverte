// esse arquivo representa um componente que é usado como ícone editável do arquivo App

import React from 'react';

//vamos pegar a cor e tamanho que são pegos como parâmetro ao chamar o componente
interface IconProps {
  color?: string;
  size?: number;
}

//nessa parte jogamos a estrutura do svg base para construir o ícone substituindo os valores padrão de cor e size
export const FileSave: React.FC<IconProps> = ({ color = '#A2CFFE', size = 32, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >

    <mask
        id="mask0_73_22"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0" 
        y="0" 
        width="32" 
        height="33"
    >

    <rect y="0.5" width="32" height="32" fill="#D9D9D9"/>

    </mask>
    <g mask="url(#mask0_73_22)">
        <path d="M18.6667 32.5V29.8333H29.3333V32.5H18.6667ZM24 28.5L18.6667 23.1667L20.5333 21.3L22.6667 23.4333V17.8667H25.3333V23.4333L27.4667 21.3L29.3333 23.1667L24 28.5ZM8.00001 27.1667C7.26668 27.1667 6.6389 26.9056 6.11668 26.3833C5.59445 25.8611 5.33334 25.2333 5.33334 24.5V5.83333C5.33334 5.1 5.59445 4.47222 6.11668 3.95C6.6389 3.42778 7.26668 3.16667 8.00001 3.16667H17.3333L25.3333 11.1667V15.2H16V27.1667H8.00001ZM16 12.5H22.6667L16 5.83333V12.5Z" fill={color}/>
    </g>
    </svg>

);


