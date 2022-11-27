import React from 'react';

interface IParagraph {
    text: string;
}

function Paragraph(props: IParagraph) {
    return <p>{props.text}</p>;
}

export default Paragraph;