export interface IData {
    title: string;
    contents: string;
}

export interface IPostWrite {
    handleSave: (data: IData[]) => void;
}
