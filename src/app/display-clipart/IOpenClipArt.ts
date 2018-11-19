interface IOpenClipArt{
    payload: IPayLoad[];
}

interface IPayLoad{
    title: string;
    svg: ISvg;
}

interface ISvg{
    url:string;
}