
// esse arquivo representa um componente que é usado como ícone editável do arquivo App

import React from 'react';

//vamos pegar a cor e tamanho que são pegos como parâmetro ao chamar o componente
interface IconProps {
  color1?: string;
  color2?: string; //esse tem dois color por ser composto de duas cores predominantes
  size?: number;
}

//nessa parte jogamos a estrutura do svg base para construir o ícone substituindo os valores padrão de cor e size
export const IconeConversao: React.FC<IconProps> = ({ color1 = '#A2CFFE', color2 = '#5A00FE', size = 164, ...props }) => (
    <svg
     width={size} 
     height={size}
     viewBox="0 0 150 144" 
     fill="none" 
     xmlns="http://www.w3.org/2000/svg"
     {...props}
     >

    <mask 
    id="mask0_31_1380" 
    style={{ maskType: 'alpha' }} 
    maskUnits="userSpaceOnUse" 
    x="0" 
    y="0" 
    width="128" 
    height="128"
    >
    <rect width="128" height="128" fill="#D9D9D9" />
    </mask>
      <g mask="url(#mask0_31_1380)">
        <path d="M53.3333 90.6667H74.6667V80H53.3333V90.6667ZM53.3333 69.3333H90.6667V58.6667H53.3333V69.3333ZM37.3333 48H90.6667V37.3333H37.3333V48ZM35.3333 117.333C28.3111 117.333 22.3333 114.867 17.4 109.933C12.4667 105 10 99.0222 10 92C10 86.9333 11.3111 82.4 13.9333 78.4C16.5556 74.4 20 71.3778 24.2667 69.3333H10.6667V58.6667H42.6667V90.6667H32V77.7333C28.7111 78.4444 26 80.1333 23.8667 82.8C21.7333 85.4667 20.6667 88.5333 20.6667 92C20.6667 96.0889 22.1111 99.5556 25 102.4C27.8889 105.244 31.3333 106.667 35.3333 106.667V117.333ZM53.3333 112V101.333H101.333V26.6667H26.6667V48H16V26.6667C16 23.7333 17.0444 21.2222 19.1333 19.1333C21.2222 17.0444 23.7333 16 26.6667 16H101.333C104.267 16 106.778 17.0444 108.867 19.1333C110.956 21.2222 112 23.7333 112 26.6667V101.333C112 104.267 110.956 106.778 108.867 108.867C106.778 110.956 104.267 112 101.333 112H53.3333Z" fill={color1} />
      </g>
      <mask id="mask1_31_1380" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="86" y="80" width="64" height="64">
        <rect x="86" y="80" width="64" height="64" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask1_31_1380)">
        <path d="M110 136C105.556 136 101.778 134.444 98.6667 131.333C95.5556 128.222 94 124.444 94 120V104C94 99.5556 95.5556 95.7778 98.6667 92.6667C101.778 89.5556 105.556 88 110 88H126C130.444 88 134.222 89.5556 137.333 92.6667C140.444 95.7778 142 99.5556 142 104V120C142 124.444 140.444 128.222 137.333 131.333C134.222 134.444 130.444 136 126 136H110ZM115.333 122.667L131.333 106.667L127.6 102.933L115.333 115.2L109.467 109.333L105.733 113.067L115.333 122.667Z" fill={color2} />
      </g>
    </svg>
  );

