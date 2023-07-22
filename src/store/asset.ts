export class Asset {
    name: string;
    id: string;
    sector: string;
    client: string;
    constructor(name:string, id:string, sector:string, client:string) {
        this.name = name;
        this.id = id;
        this.sector = sector;
        this.client = client;
    }
}

export const Asset_list = [
    new Asset('Magnetic Resonance Imaging (MRI) Scanner', '598', 'Radiology', '1'),
    new Asset('Computed Tomography (CT) Scanner', '326', 'Radiology', '2'),
    new Asset('Linear Accelerator (LINAC)', '721', 'Oncology', '1'),
    new Asset('Positron Emission Tomography (PET) Scanner', '492', 'Nuclear Medicine', '3'),
    new Asset('Robotic Surgical System', '185', 'Surgery','3'),
    new Asset('Gamma Camera', '622', 'Nuclear Medicine', '3'),
    new Asset('Lithotripsy Machine', '851', 'Urology', '2')
]
