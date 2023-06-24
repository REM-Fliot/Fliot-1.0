export class Asset {
    constructor(name:string, id:string, sector:string) {
        this.name = name;
        this.id = id;
        this.sector = sector;
    }
}

export const Asset_list = [
    new Asset('Magnetic Resonance Imaging (MRI) Scanner', '598', 'Radiology'),
    new Asset('Computed Tomography (CT) Scanner', '326', 'Radiology'),
    new Asset('Linear Accelerator (LINAC)', '721', 'Oncology'),
    new Asset('Positron Emission Tomography (PET) Scanner', '492', 'Nuclear Medicine'),
    new Asset('Robotic Surgical System', '185', 'Surgery'),
    new Asset('Gamma Camera', '622', 'Nuclear Medicine'),
    new Asset('Lithotripsy Machine', '851', 'Urology')
]