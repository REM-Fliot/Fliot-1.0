<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { addDoc, collection } from 'firebase/firestore';
	import { db } from '../lib/firebase/firebase';
	import { current_company } from '../store/authStores';
	import {
		FsrDataToHtml,
		HtmlToFsrData,
		getHtmlElements,
		makeFsrFirestoreReadable
	} from '../utility/fsr_html_conversion';

	export let assets;
	export let templates;
	const id = $page.params.id;

	const company = $current_company!;

	let asset_list = assets;
	let templates_list = templates;
	$: asset_list = assets;
	$: templates_list = templates;
	let matched = false;
	let current_asset;
	let selectedDate: string;
	$: console.log(typeof selectedDate);
	let selected_template_idx = 0;

	// const assets_length = asset_list.length
	// if(asset_list){
	for (let i = 0; i < asset_list.length; i++) {
		if (asset_list[i].data().ASSET_ID == id) {
			matched = true;
			current_asset = asset_list[i].data();
			break;
		}
	}
	// }

	let name: string;
	let client: string;
	if (current_asset) {
		name = current_asset.ASSET_NAME;
		client = current_asset.CLIENT_NAME;
	}

	let html = FsrDataToHtml(templates_list[selected_template_idx].data().STRUCTURE);

	const logger = async () => {
		if (!selectedDate) return;
		const stuff = HtmlToFsrData(
			getHtmlElements(),
			templates_list[selected_template_idx].data().STRUCTURE
		);
		await addDoc(collection(db, 'companies', company, 'fs reports'), {
			CLIENT: client,
			DATE: selectedDate,
			STRUCTURE: makeFsrFirestoreReadable(stuff)
		}).then(async () => {
			console.log('submitting...');
			await invalidateAll();
		});
	};
</script>

{#if matched}
	<table>
		<tr>
			<td>{name}</td>
			<td>{id}</td>
			<td>{client}</td>
			<td><a href={`../${id}`}>View History & Files</a></td>
			<button
				on:click={() => {
					logger();
				}}>log</button>
		</tr>
	</table>
	<select bind:value={selected_template_idx}>
		{#each templates_list as template, idx}
			<option value={idx}>{template.data().NAME}</option>
		{/each}
	</select>
	Date of Service:
	<input type="date" bind:value={selectedDate} />
	<div>
		{#each html as html}
			<div>
				{@html html}
			</div>
		{/each}
		<!-- New Report:
		<form on:submit={handleNewReportSubmission}>
			{#each html_array as html}
				<div>{@html html}</div>
			{/each}
			<button>submit</button>
		</form> -->
	</div>
{/if}

<!-- const populateHtmlArray = async () => {
		for(let i = 0; i < structure_array.length; i++){
			const currentComponent = structure_array[i];

			await (componentHeader = currentComponent.Header);
			let htmlString = "";
			htmlString += `<label>${componentHeader}</ label><br />`;
			for(let j = 0; j < currentComponent.Contents.length; j++){
				await (customName = currentComponent.Contents[j].label);
				await (isChecked = currentComponent.Contents[j].checked)
				await (isSelected = currentComponent.Contents[j].selected)
				htmlString += map[currentComponent.type];
			}
			
		}
	}

	populateHtmlArray();


	let map;

	$: {
		map = {
			"textarea": `${labelTag}<textarea rows='8' cols='53' value="sample text" />`,
            "radio": `<input type='radio' name='${componentHeader}' id='${customName}' checked={${isChecked}}/><label for='${customName}'>${customName}</ label>`,
            "checkbox": `<input type='checkbox' name='${componentHeader}' id='${customName}' checked={${isSelected}}/><label for='${customName}'>${customName}</ label>`,
            "text": `<input type='text' value="sample text"/><br />`
		}
	}

	const id = $page.params.id;
	const assets_length = asset_list.length
	let matched = false;
	let current_asset;
	for (let i = 0; i < assets_length; i++){
		if(asset_list[i].data().ASSET_ID == id){
			matched = true;
			current_asset = asset_list[i].data()
			break;
		}
	}
	let name:string
	let client:string
	if (current_asset) {
	
		name = current_asset.ASSET_NAME;
		client = current_asset.CLIENT_NAME;
	}
	
	const pro = `<input type='checkbox' }/>`

	let reportText = '';

	const handleNewReportSubmission = async () => {
		await addDoc(collection(db, "companies", $auth_user.company, "FSreports"), {
                ASSET_ID: id,
				CONTENT: reportText,
		});
	}; -->

<style>
	/* .full-report-field {
		font-family: Arial, Helvetica, sans-serif;
	} */
</style>
