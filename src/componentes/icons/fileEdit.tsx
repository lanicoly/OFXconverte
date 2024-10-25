// esse arquivo representa um componente que é usado como ícone editável do arquivo App


import React from 'react';

//vamos pegar a cor e tamanho que são pegos como parâmetro ao chamar o componente
interface IconProps {
  color?: string;
  size?: number;
}

//nessa parte jogamos a estrutura do svg base para construir o ícone substituindo os valores padrão de cor e size
export const FileEdit: React.FC<IconProps> = ({ color = '#A2CFFE', size = 32, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_73_18"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="32"
      height="33"
    >
      <rect y="0.5" width="32" height="32" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_73_18)">
      <path
        d="M7.99999 29.8333C7.26666 29.8333 6.63888 29.5722 6.11666 29.05C5.59444 28.5278 5.33333 27.9 5.33333 27.1667V5.83333C5.33333 5.1 5.59444 4.47222 6.11666 3.95C6.63888 3.42778 7.26666 3.16667 7.99999 3.16667H18.6667L26.6667 11.1667V15.1667C26.1556 15.2778 25.6778 15.4556 25.2333 15.7C24.7889 15.9444 24.3778 16.2556 24 16.6333L16 24.6V29.8333H7.99999ZM18.6667 29.8333V25.7333L26.0333 18.4C26.2333 18.2 26.4556 18.0556 26.7 17.9667C26.9444 17.8778 27.1889 17.8333 27.4333 17.8333C27.7 17.8333 27.9556 17.8833 28.2 17.9833C28.4444 18.0833 28.6667 18.2333 28.8667 18.4333L30.1 19.6667C30.2778 19.8667 30.4167 20.0889 30.5167 20.3333C30.6167 20.5778 30.6667 20.8222 30.6667 21.0667C30.6667 21.3111 30.6222 21.5611 30.5333 21.8167C30.4444 22.0722 30.3 22.3 30.1 22.5L22.7667 29.8333H18.6667ZM27.4333 22.3667L28.6667 21.0667L27.4333 19.8333L26.1667 21.1L27.4333 22.3667ZM17.3333 12.5H24L17.3333 5.83333V12.5Z"
        fill={color}
      />
    </g>
  </svg>
);
