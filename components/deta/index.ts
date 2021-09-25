import { Deta } from "deta";

export interface User {
    key: string,
    name: string,
    disqualified: boolean,
    completed: boolean,
    selected: boolean,
    instagram: string,
    position: string,
    won: boolean,
}

const deta = Deta(process.env.DETA_PROJECT_KEY as string);

export default deta;
