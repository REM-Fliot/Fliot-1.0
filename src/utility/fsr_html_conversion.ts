export class FSRdata {
    header: string;
    type: string;
    listCount: number;
    contents: contentsArray;

    constructor(header: string, type: string, listCount: number, contents: contentsArray) {
        this.header = header;
        this.type = type;
        this.listCount = listCount;
        this.contents = contents;
    }
}

// export class SubContent {
//     checked: boolean;
//     type: string;
//     label: string;
//     value: string;
//     constructor (checked: boolean, type: string, label: string, value: string){
//         if(type == "text"){
//             this.label = label
//         }
//     }
// }

export class ContentTextarea{
    label: string;
    value: string;
    constructor (label:string = "", value: string = ""){
        this.label = label
        this.value = value;
    }
}

export class ContentText{
    label: string;
    value: string;
    constructor (label: string = "", value: string = ""){
        this.label = label;
        this.value = value;
    }
}

export class ContentRadio{
    checked: boolean;
    label: string;
    constructor (checked: boolean = false, label: string = ""){
        this.checked = checked;
        this.label = label;
    }
}

export class ContentCheckbox{
    checked: boolean;
    label: string;
    constructor (checked: boolean = false, label: string = ""){
        this.checked = checked;
        this.label = label;
    }
}

export type typeToContent = {
    "textarea": ContentTextarea,
    "radio": ContentRadio,
    "checkbox": ContentCheckbox,
    "text": ContentText,
};

export const typeToContentMap = {
    "textarea": ContentTextarea,
    "radio": ContentRadio,
    "checkbox": ContentCheckbox,
    "text": ContentText,
}

export type contentsArray = typeToContent[keyof typeToContent][]


let value = "";
let header = "";
let checked = false;
let type = "";
let label = "";
let dataIndex = "0";
let id = 0;
export let idRange = id;


export const FsrDataToHtml = (components: FSRdata[]) => {
    const componentCount = components.length;
    let htmlString:string[] = [];

    for(let i = 0; i < componentCount; i++){
        dataIndex = i.toString()
        
        const component = components[i];
        
        header = component.header;
        type = component.type;

        htmlString.push(`<label>${header} </label> <br/>`);

        for(let j = 0; j < component.contents.length; j++){

            const content = component.contents[j];

            value = "value" in content ? content.value : "";
            checked = "checked" in content ? content.checked : false;
            label = "label" in content ? content.label : "";
            htmlString.push(TypeToHTML()[type]);
            id ++;
        }
    }
    idRange = id;
    id = 0;
    return htmlString
}

export const HtmlToFsrData = (elements:(HTMLElement)[], structuredData: FSRdata[]) => {
    let groupIndex = 0;
    let prevGroupIndex = 0;
    let indexTracker = 0;
    for(let i = 0; i < elements.length; i++){
        const element = elements[i];
        groupIndex = Number(element.dataset.index);
        indexTracker = groupIndex != prevGroupIndex ? Number(element.id) : indexTracker;
        const elementIndex = Number(element.id) - indexTracker;
        if("type" in element && typeof element.type == "string"){
            type = element.type;
        }

        const valueArray = valuesToChange[type]
        const obj = structuredData[groupIndex].contents[elementIndex];
        for(let j = 0; j < valueArray.length; j++){
            const keyValue = valueArray[j];
            obj[keyValue as keyof typeof obj] = element[keyValue as keyof typeof element];
        }
        structuredData[groupIndex].contents[elementIndex] = obj;
        prevGroupIndex = groupIndex;
    }
    return structuredData;
}

export const makeFsrFirestoreReadable = (FsrDataArray: FSRdata[]) => {
    const length = FsrDataArray.length;
    for(let i = 0; i < length; i++){
        const FsrData = FsrDataArray[i]
        const contentsLength = FsrData.contents.length
        for(let j = 0; j < contentsLength; j++){
            FsrDataArray[i].contents[j] = Object.assign({}, FsrData.contents[j]);
            FsrDataArray[i] = Object.assign({}, FsrDataArray[i]);
        }
    }
    return FsrDataArray;
}


export const getHtmlElements = () => {
    let elements:(HTMLElement)[] = []
    for(let i = 0; i < idRange; i++){
        const element = document.getElementById(i.toString())
        if(element !== null){
            elements.push(element)
        }
    }
    return elements;
}

const TypeToHTML = () => {

    const labelHtml = `<label for='${id}' >${label} </label>` 

    const obj:{[key: string]: string} = {
        "textarea": `${labelHtml}<br /><textarea data-index=${dataIndex} type='${type}' id='${id}' value='${value}' rows='8' cols='53'/>`,
        "radio": `<input data-index=${dataIndex} type='${type}' name='${dataIndex}' id='${id}' ${checked ? "checked": null} />${labelHtml}`,
        "checkbox": `<input data-index=${dataIndex} type='${type}' id='${id}' ${checked ? "checked": null} />${labelHtml}`,
        "text": `${labelHtml}<input data-index=${dataIndex} type='${type}' id='${id}' value='${value}' /><br />`,
    }

    return obj
}

const valuesToChange:{[key: string]: string[]} = {
    "textarea": ["value"],
    "radio": ["checked"],
    "checkbox": ["checked"],
    "text": ["value"],
}
