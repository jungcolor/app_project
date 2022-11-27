import React from 'react';

interface IButton {
    className?: string;
    text: string;
}

function Button(props: IButton) {
    return <button className={props.className}>{props.text}</button>;
}

export default Button;