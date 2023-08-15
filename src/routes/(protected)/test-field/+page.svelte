<script lang="ts">
	import { onMount } from 'svelte';
	import {
		FsrDataToHtml,
		HtmlToFsrData,
		getHtmlElements,
		FSRdata,
		ContentCheckbox,
		ContentText,
		ContentRadio,
		ContentTextarea,
		type contentsArray,
		type typeToContent,
		typeToContentMap,
		makeFsrFirestoreReadable
	} from '../../../utility/fsr_html_conversion';
	import { addDoc, collection } from 'firebase/firestore';
	import { client_auth, db } from '$lib/firebase/firebase';
	import { invalidateAll } from '$app/navigation';
	import { current_company } from '../../../store/authStores';

	let componentsList = [];
	let fsrDataHolder: FSRdata[] = [];
	let type: string = 'text';
	let header = '';
	let listCount = 1;
	let html = FsrDataToHtml(fsrDataHolder);
	let templateName = '';
	let isSaveDisabled: boolean;
	$: isSaveDisabled = fsrDataHolder.length == 0 || templateName.length == 0;

	function createContentInstance(
		type: keyof typeToContent
	): InstanceType<typeToContent[keyof typeToContent]> {
		const ContentConstructor = typeToContentMap[type];
		if (!ContentConstructor) {
			throw new Error(`Invalid type: ${type}`);
		}
		return new ContentConstructor();
	}

	const addComponent = () => {
		let contents = [];
		for (let i = 0; i < listCount; i++) {
			const contentInstance = createContentInstance(type as keyof typeToContent);
			if ('label' in contentInstance) {
				contentInstance.label = document.querySelector(`input[for='${i}'][type='text']`)?.value;
			}
			contents.push(contentInstance);
		}
		fsrDataHolder.push(new FSRdata(header, type, listCount, contents));
		header = '';
		listCount = 1;
		fsrDataHolder = [...fsrDataHolder];
		html = FsrDataToHtml(fsrDataHolder);
	};

	const typeToHtml = (type: string, id: number) => {
		const labelInput = `<input type='text' for='${id}' placeholder='Label (optional)' />`;
		const obj: { [key: string]: string } = {
			textarea: `${labelInput}<br /><textarea type='${type}' id='${id}' rows='8' cols='53' />\t`,
			radio: `<input type='${type}' name='${header}' id='${id}'' />${labelInput}`,
			checkbox: `<input type='${type}' id='${id}' />${labelInput}`,
			text: `${labelInput}<input type='${type}' id='${id}' />`
		};
		return obj[type];
	};

	const saveTemplate = async (dataHolder: FSRdata[]) => {
		if ($current_company !== null) {
			await addDoc(collection(db, 'companies', $current_company, 'fsr_templates'), {
				NAME: templateName,
				STRUCTURE: makeFsrFirestoreReadable(dataHolder)
			}).then(async () => {
				console.log('submitting...');
				await invalidateAll();
			});

			alert('Template Submitted!');
		} else {
			alert('Error: User Not Found.');
		}
	};
</script>

<div class="big-container">
	<!-- <label for="template-name">Enter Template Name: </label> -->
	<input
		type="text"
		id="template-name"
		placeholder="Enter Template Name"
		bind:value={templateName} />
	<button disabled={isSaveDisabled} on:click={() => saveTemplate(fsrDataHolder)}
		>Save Template</button>
	<div class="container">
		<div class="scrollable" id="input-container">
			<form on:submit={() => addComponent()}>
				<input type="text" placeholder="Header" bind:value={header} />
				<select bind:value={type}>
					<option value="textarea">text field</option>
					<option value="radio">radio button</option>
					<option value="checkbox">checklist</option>
					<option value="text">list</option>
				</select>
				<input type="number" min="1" max="100" bind:value={listCount} />
				<button type="submit" disabled={header.length == 0}>Add Component</button>
			</form>
			{#each Array(listCount) as _, idx}
				<div id="user-input">
					{@html typeToHtml(type, idx)}
				</div>
			{/each}
		</div>

		<div class="scrollable" id="generated-template-container">
			{#each html as html}
				<div>
					{@html html}
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- const contents1:ContentCheckbox[] = [
        new ContentCheckbox(false, "red"),
        new ContentCheckbox(false, "green"),
        new ContentCheckbox(false, "blue"),
        new ContentCheckbox(true, "yellow"),
    ]

    const contents2:ContentRadio[] = [
        new ContentRadio(false, "red"),
        new ContentRadio(false, "green"),
        new ContentRadio(true, "blue"),
        new ContentRadio(false, "yellow"),
        new ContentRadio(false, "magenta")
    ]

    const contents3:ContentText[] = [
        new ContentText("Lab", ""),
        new ContentText("Typer", ""),
        new ContentText("Clargo", ""),
        new ContentText("", ""),
    ]

    const contents4:ContentTextarea[] = [
        new ContentTextarea(""),
    ]


    const data = [
        new FSRdata("Colour Checklist", "checkbox", 4, contents1),
        new FSRdata("Colour Radio Buttons", "radio", 4, contents2),
        new FSRdata("Colour List", "text", 4, contents3),
        new FSRdata("Colour Text Field", "textarea", 1, contents4),
    ] -->

<style>
	.big-container {
		margin-top: 20px;
		margin-left: 20px;
	}
	.container {
		display: flex;
	}
	.scrollable {
		flex: 0 0 auto; /* Prevent automatic growth */
		border: none;
		padding: 10px;
	}

	.scrollable::-webkit-scrollbar {
		width: 6px;
	}

	.scrollable::-webkit-scrollbar-thumb {
		background-color: rgba(47, 47, 47, 0.318); /* Set the color of the scrollbar thumb */
		border-radius: 3px; /* Set the border radius of the thumb */
	}

	#input-container {
		width: 29%;
		max-height: 78vh;
		overflow: hidden;
		overflow-x: auto;
		overflow-y: scroll;
	}

	#generated-template-container {
		width: 68%;
		max-height: 78vh;
		overflow: hidden;
		overflow-x: auto;
		overflow-y: scroll;
	}
</style>
