export interface IData {
    url: string;
    title: string;
    urlToImage: string;
    description: string;
    content?: string;
}

export interface IDatas {
    datas: IData[];
}
