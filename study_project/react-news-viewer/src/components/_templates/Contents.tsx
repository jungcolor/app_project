import React from "react";

interface IContents {
    subpage: JSX.Element;
}

const Contents = ({ subpage }: IContents) => {
    return (
        <div className="contents">{subpage}</div>
    );
};

export default Contents;
