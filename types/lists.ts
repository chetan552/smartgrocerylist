import {IGrocery} from "@/types/grocery";

export interface IList {
    id: string;
    name: string;
    groceries: IGrocery[];
}
