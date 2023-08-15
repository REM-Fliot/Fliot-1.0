<script lang="ts">
	import { collection, addDoc } from 'firebase/firestore/lite';
	import { auth_user } from '../../../store/authUser';
	import { db } from '$lib/firebase/firebase';
    import { 
        FsrDataToHtml,
        FSRdata, 
        ContentCheckbox, 
        ContentText, 
        ContentRadio, 
        ContentTextarea  
    } from '../../../utility/fsr_html_conversion';

    let components_list:string[] = [];
    let selectedComponent:string;
    let specificAttribute;
    let componentHeader = "";
    let componentCount:number;
    let arrayFlag = 0;
    let arrayTempHolder:string[] = [""];
    let customName = "";
    let labelTag:string;
    let blurFlag = false;
    let templateName = "";
    let structuredData:{}[] = [];
    
    
    // [
    //     {
    //         Header: "sample Header",
    //         type: "textarea",
    //         listCount: 1
    //         Contents: [
    //             {text: "blah blah blah"},
    //         ]
    //     },
    //     {
    //         Header: "sample Header 2",
    //         type: "checkbox",
    //         listCount: 8,
    //         Contents: [
    //             {checked: true, label: "hi"},
    //             {checked: true, label: "hi"},
    //             {checked: true, label: "hi"},
    //             {checked: true, label: "hi"},
    //             {checked: true, label: "hi"},
    //             {checked: true, label: "hi"},
    //             {checked: true, label: "hi"},
    //             {checked: true, label: "hi"},
    //         ]
    //     },
    //     {
    //         Header: "sample Header 3",
    //         type: "radio",
    //         listCount: 3,
    //         Contents: [
    //             {selected: true, label: "hi"},
    //             {selected: false, label: "hi"},
    //             {selected: false, label: "hi"},
    //         ]
    //     },
    //     {
    //         Header: "sample Header 4",
    //         type: "text",
    //         listCount: 4,
    //         Contents: [
    //             {label: null, text: "hi"},
    //             {label: null, text: "hi"},
    //             {label: "howdy: ", text: "hi"},
    //             {label: "goodbye: ", text: "hi"},

    //         ]
    //     }
    // ];

    let user;
	auth_user.subscribe(value => {
		user = value;
	})


    $:{
        if(arrayComponents.includes(selectedComponent)){
            arrayFlag = 1;
        }else{
            arrayFlag = 0;
        }
    }

    const AddComponent = async (type:string, arrayFlag:number) => {
        
        if(arrayFlag == 0){
            components_list.push(valueHtmlMap[type])
            structuredData.push({
                Header: componentHeader,
                type: type,
                listCount: 1,
                Contents: [structureMap[type]]
            })
        }

        else{
            const listCount = arrayTempHolder.length;
            console.log(listCount);
            let content = [];
            let str = labelTag;
            for(let i = 0; i < listCount; i++){
                await (customName = arrayTempHolder[i]);
                str += valueHtmlMap[type]
                content.push(structureMap[type])
            }
            components_list.push(str);
            structuredData.push({
                Header: componentHeader,
                type: type,
                listCount: listCount,
                Contents: content,
            })
        }

        components_list = [...components_list]
        componentHeader = "";
        arrayTempHolder = [""];
        componentCount = 1;

    }

    const handleTemplateSubmit = async () => {

        await addDoc(collection(db, "companies", user.company, "fsr_templates"), {
                NAME: templateName,
				HTML_ARRAY: components_list,
                STRUCTURE: structuredData,
		});

        alert("Template Submitted!");
    }

    $: {
        arrayTempHolder[componentCount - 1] = "";
    }
    let structureMap:{[key: string]:{}};

    let valueHtmlMap:{[key: string]:string} = {};
    $:{
        labelTag = `<label>${componentHeader}<label/><br />`;

        valueHtmlMap = {
            "textarea": `${labelTag}<textarea rows='8' cols='53' />`,
            "radio": `<input type='radio' name='${componentHeader}' id='${customName}' /><label for='${customName}'>${customName}</ label>`,
            "checkbox": `<input type='checkbox' name='${componentHeader}' id='${customName}' /><label for='${customName}'>${customName}</ label>`,
            "text": `<input type='text' /><br />`
        }

        structureMap = {
            "textarea": {text: ""},
            "radio": {selected: false, label: customName},
            "checkbox": {checked: false, label: customName},
            "text": {label: customName? customName: null, text: ""}
        };
    }

    const arrayComponents = [
        "radio",
        "checkbox",
        "text",
    ]
</script>

{#if blurFlag}
    <div class="centered">
        <div class=save-container>
            <form on:submit={() => handleTemplateSubmit()}>
                <label for="template-name" >Enter Template Name: </label>
                <input class="template-name" type="text" id="template-name" bind:value={templateName}/>
                <button type="submit">Save</button>
                <button on:click={() => blurFlag = false}> &lt; Go back </button>
            </form>

        </div>
    </div>
{/if}
<div class:blurred={blurFlag}>
    {#if components_list.length > 0}
        <button on:click={() => blurFlag = true}>save template</button>
    {/if}
    {#if blurFlag}
        <div>
            <input type="text" />
        </div>
    {/if}
    <div>
        {#each components_list as comp}
            <div>{@html comp}</div>
        {/each}
    </div>
    <form on:submit={() => AddComponent(selectedComponent, arrayFlag)}>
        <input type="text" placeholder="Header" bind:value={componentHeader}/>
        <select bind:value={selectedComponent}>
            <option value="textarea">text field</option>
            <option value="radio">radio button</option>
            <option value="checkbox">checklist</option>
            <option value="text">list</option>
        </select>
        {#if arrayComponents.includes(selectedComponent)}
            <input type="number" min='1' max='100' bind:value={componentCount}/>
            {#each Array(componentCount) as _, idx}
                <div>
                    <input type="text" placeholder="Label (optional)" bind:value={arrayTempHolder[idx]} />
                    <input type={selectedComponent} name={componentHeader} tabindex="-1"/>
                </div>
            {/each}
        {/if}
        <button type="submit" tabindex="-1" disabled='{componentHeader==""}'>Add component</button>
    </form>
    
</div>

<style>
    .blurred{
        filter: blur(3px);
    }
    .centered{
        position: sticky;
        z-index: 1;
        position: absolute;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 80%;
        min-width: 80%;
    }
    .save-container{
        background-color: white;
        padding: 40px;
        box-shadow: 1px 1px 20px 7px rgb(0,0,0,0.25);
        border-radius: 5px;
        outline: none;
    }
    .template-name{
        border-radius: 5px;
    }
</style>
