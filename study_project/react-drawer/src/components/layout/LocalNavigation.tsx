import React from "react";
import Button from "../component/Button";
import Horizontal from "../component/Horizontal";
import List from "../component/List";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface ILocalNavigation {
    toggle?: boolean;
    clickHandlerClose: () => void;
}

function LocalNavigation(props: ILocalNavigation) {
    const menu1 = [{ text: "inbox" }, { text: "Starred" }, { text: "Send email" }, { text: "Drafts" }];
    const menu2 = [{ text: "All mail" }, { text: "Trash" }, { text: "Spam" }];
    const onClickHandler = () => {
        props.clickHandlerClose();
    };

    return (
        <div className={"lnb" + props.toggle ? "open" : ""}>
            <div>
                <ArrowBackIosNewIcon className="toggleIcon toggleClose" onClick={onClickHandler} fontSize="small" />
            </div>
            <Horizontal />
            <List>{menu1}</List>
            <Horizontal />
            <List>{menu2}</List>
        </div>
    );
}

export default LocalNavigation;
