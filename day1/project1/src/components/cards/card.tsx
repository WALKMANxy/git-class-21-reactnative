import React from  'react';
import './card.scss';
//import { Frame } from '../frame/frame';

type CardProps = {
    title: string,
    subtitle: string,
    placeholder: boolean,
    image?: string
}

export const Card = (props: CardProps) => {
        return (
            <div className="card">
                <div className="circle-picture">
                    <img src={process.env.PUBLIC_URL + props.image} alt="Logo" className="logo" />
                </div>
                <div className="info">
                    <h1>{props.title}</h1>
                    <p>{props.subtitle}</p>
        
                    <p>{props.placeholder && <span>Open to work!</span>}</p>
                   
                </div>
            </div>
        );
    };
    
    export default Card;