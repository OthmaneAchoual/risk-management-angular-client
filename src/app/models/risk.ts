import { Choice } from './choice';

export interface Risk {
    ID: string;
    reference: string;
    title: string;
    description: string;
    type: Choice;
    root?: Risk;
}
