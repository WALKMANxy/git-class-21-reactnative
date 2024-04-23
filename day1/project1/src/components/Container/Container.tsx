import React, { ReactNode } from 'react';

type ContainerProps ={
    value?: number
    children?: ReactNode;
}

export const Container = (props: ContainerProps) => {
    return (
        <div className="container">
            <li>{props.value}</li>
        </div>
    );
}






export default Container;