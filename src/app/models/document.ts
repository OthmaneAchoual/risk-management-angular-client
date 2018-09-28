import { Risk } from './risk';
import { WorkContext } from './work-context';
import { Choice } from './choice';

export interface Document {
    ID: string;
    code: string;
    title: string;
    category: Choice;
    filePath?: string;
    risk?: Risk;
    workContext?: WorkContext;
}
