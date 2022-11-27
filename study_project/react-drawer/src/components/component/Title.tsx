import React from 'react';

interface ITitle {
    title: string;
}

function Title(props: ITitle) {
    return <h3>{props.title}</h3>;
}

export default Title;