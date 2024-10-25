// esse arquivo representa um componente que é usado como ícone editável do arquivo App

import React from 'react';

//vamos pegar a cor e tamanho que são pegos como parâmetro ao chamar o componente
interface IconProps {
  color?: string;
  size?: number;
}

//nessa parte jogamos a estrutura do svg base para construir o ícone substituindo os valores padrão de cor e size
export const Description: React.FC<IconProps> = ({ color = '#A2CFFE', size = 32, ...props }) => (

    <svg
        width={size} 
        height={size} 
        viewBox="0 0 196 197" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
    <mask 
        id="mask0_114_200" 
        style={{ maskType: 'alpha' }}maskUnits="userSpaceOnUse" 
        x="0" 
        y="0" 
        width="196" 
        height="197"
    >
    <rect y="0.5" width="196" height="196" fill="#D9D9D9"/>

    </mask>

    <g mask="url(#mask0_114_200)">
        <path d="M65.3333 147.5H130.667V131.167H65.3333V147.5ZM65.3333 114.833H130.667V98.4999H65.3333V114.833ZM49 180.167C44.5083 180.167 40.6632 178.567 37.4646 175.369C34.266 172.17 32.6667 168.325 32.6667 163.833V33.1666C32.6667 28.6749 34.266 24.8298 37.4646 21.6312C40.6632 18.4326 44.5083 16.8333 49 16.8333H114.333L163.333 65.8333V163.833C163.333 168.325 161.734 172.17 158.535 175.369C155.337 178.567 151.492 180.167 147 180.167H49ZM106.167 73.9999H147L106.167 33.1666V73.9999Z" fill={color}/>
    </g>
    </svg>

);






