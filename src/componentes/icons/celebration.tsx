
// esse arquivo representa um componente que é usado como ícone editável do arquivo App

import React from 'react';

//vamos pegar a cor e tamanho que são pegos como parâmetro ao chamar o componente
interface IconProps {
  color?: string;
  size?: number;
}

//nessa parte jogamos a estrutura do svg base para construir o ícone substituindo os valores padrão de cor e size
export const Celebration: React.FC<IconProps> = ({ color = '#A2CFFE', size = 32, ...props }) => (

    <svg
        width={size} 
        height={size} 
        viewBox="0 0 32 33" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
    <mask 
        id="mask0_73_26" 
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse" 
        x="0" 
        y="0" 
        width="32" 
        height="33"
    >

    <rect y="0.5" width="32" height="32" fill="#D9D9D9"/>

    </mask>

    <g mask="url(#mask0_73_26)">
        <path d="M2.66669 29.8333L9.33335 11.1667L21.3334 23.1667L2.66669 29.8333ZM19.4 17.2333L18 15.8333L25.4667 8.36667C26.1778 7.65556 27.0334 7.3 28.0334 7.3C29.0334 7.3 29.8889 7.65556 30.6 8.36667L31.4 9.16667L30 10.5667L29.2 9.76667C28.8889 9.45556 28.5 9.3 28.0334 9.3C27.5667 9.3 27.1778 9.45556 26.8667 9.76667L19.4 17.2333ZM14.0667 11.9L12.6667 10.5L13.4667 9.7C13.7778 9.38889 13.9334 9.01111 13.9334 8.56667C13.9334 8.12222 13.7778 7.74444 13.4667 7.43333L12.6 6.56667L14 5.16667L14.8667 6.03333C15.5778 6.74444 15.9334 7.58889 15.9334 8.56667C15.9334 9.54444 15.5778 10.3889 14.8667 11.1L14.0667 11.9ZM16.7334 14.5667L15.3334 13.1667L20.1334 8.36667C20.4445 8.05556 20.6 7.66667 20.6 7.2C20.6 6.73333 20.4445 6.34444 20.1334 6.03333L18 3.9L19.4 2.5L21.5334 4.63333C22.2445 5.34444 22.6 6.2 22.6 7.2C22.6 8.2 22.2445 9.05556 21.5334 9.76667L16.7334 14.5667ZM22.0667 19.9L20.6667 18.5L22.8 16.3667C23.5111 15.6556 24.3667 15.3 25.3667 15.3C26.3667 15.3 27.2222 15.6556 27.9334 16.3667L30.0667 18.5L28.6667 19.9L26.5334 17.7667C26.2222 17.4556 25.8334 17.3 25.3667 17.3C24.9 17.3 24.5111 17.4556 24.2 17.7667L22.0667 19.9Z" fill={color}/>
    </g>
    </svg>

);




