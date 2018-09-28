import { Choice } from './choice';

export interface Equipment {
    ID: string;
    title: string;
    code: string;
    description: string;
    type: Choice;
    instructions?: string[];
    imagePath?: string; // link
    epc: boolean;
    training: boolean;
}
