export class Asset {
    constructor(name:string, id:string, sector:string, client:string, location:string) {
        this.name = name;
        this.id = id;
        this.sector = sector;
        this.client = client;
        this.location = location;
    }
}

export const Asset_list = [
    new Asset('Magnetic Resonance Imaging (MRI) Scanner', '598', 'Radiology', 'HrM Hospital', 'Operating block'),
    new Asset('Computed Tomography (CT) Scanner', '326', 'Radiology', 'Credit Valley Hospital', "Main floor"),
    new Asset('Linear Accelerator (LINAC)', '721', 'Oncology', 'New Age Clinic', "Second floor"),
    new Asset('Positron Emission Tomography (PET) Scanner', '492', 'Nuclear Medicine', 'Credit Valley Hospital', "Operating block"),
    new Asset('Robotic Surgical System', '185', 'Surgery','HrM Hospital', "Main floor"),
    new Asset('Gamma Camera', '622', 'Nuclear Medicine', 'HrM Hospital', "Second floor"),
    new Asset('Lithotripsy Machine', '851', 'Urology', 'New Age Clinic', "Operating block")
]
