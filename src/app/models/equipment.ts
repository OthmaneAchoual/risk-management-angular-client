export interface Equipment {
    ID: string;
    title: string;
    code: string;
    description: string;
    type: any;
    instructions: string[];
    image: string; // link
    is_epc: boolean;
    training: boolean;
}
