import { Risk } from './risk';
import { User } from './user';
import { Location } from './location';
import { Document } from './document';
import { Equipment } from './equipment';
import { Choice } from './choice';

export interface WorkContext {
    ID: string;
    name: string;
    code: string;
    type?: any;
    shortDescription?: string;
    fullDescription?: string;
    risks?: Risk[];
    users?: User[];
    locations?: Location[];
    documents?: Document[];
    equipments?: Equipment[];
    types?: Choice[];
}
