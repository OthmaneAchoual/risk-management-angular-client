import { Risk } from './risk';
import { WorkContext } from './work-context';

export interface Document {
    ID: string;
    code: string;
    title: string;
    category: any;
    file?: string;
    risk?: Risk;
    workContext?: WorkContext;
}
