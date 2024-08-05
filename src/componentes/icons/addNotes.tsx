// esse arquivo representa um componente que é usado como ícone editável do arquivo App

import React from 'react';

//vamos pegar a cor e tamanho que são pegos como parâmetro ao chamar o componente
interface IconProps {
  color?: string;
  size?: number;
}

//nessa parte jogamos a estrutura do svg base para construir o ícone substituindo os valores padrão de cor e size
export const AddNotes: React.FC<IconProps> = ({ color = '#A2CFFE', size = 32, ...props }) => (
<svg
    width={size} 
    height={size} 
    viewBox="0 0 128 129" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    >
    
<path d="M12.8 115.7C9.28 115.7 6.26667 114.447 3.76 111.94C1.25333 109.433 0 106.42 0 102.9V13.3C0 9.78 1.25333 6.76667 3.76 4.26C6.26667 1.75333 9.28 0.5 12.8 0.5H102.4C105.92 0.5 108.933 1.75333 111.44 4.26C113.947 6.76667 115.2 9.78 115.2 13.3V56.18C113.173 55.22 111.093 54.3933 108.96 53.7C106.827 53.0067 104.64 52.5 102.4 52.18V13.3H12.8V102.9H51.52C51.84 105.247 52.3467 107.487 53.04 109.62C53.7333 111.753 54.56 113.78 55.52 115.7H12.8ZM12.8 102.9V13.3V52.18V51.7V102.9ZM25.6 90.1H51.68C52 87.86 52.5067 85.6733 53.2 83.54C53.8933 81.4067 54.6667 79.3267 55.52 77.3H25.6V90.1ZM25.6 64.5H64.64C68.0533 61.3 71.8667 58.6333 76.08 56.5C80.2933 54.3667 84.8 52.9267 89.6 52.18V51.7H25.6V64.5ZM25.6 38.9H89.6V26.1H25.6V38.9ZM96 128.5C87.1467 128.5 79.6 125.38 73.36 119.14C67.12 112.9 64 105.353 64 96.5C64 87.6467 67.12 80.1 73.36 73.86C79.6 67.62 87.1467 64.5 96 64.5C104.853 64.5 112.4 67.62 118.64 73.86C124.88 80.1 128 87.6467 128 96.5C128 105.353 124.88 112.9 118.64 119.14C112.4 125.38 104.853 128.5 96 128.5ZM92.8 115.7H99.2V99.7H115.2V93.3H99.2V77.3H92.8V93.3H76.8V99.7H92.8V115.7Z" fill={color}/>
</svg>

);






