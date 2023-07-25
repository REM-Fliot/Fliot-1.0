<script lang="ts">
	import { page } from '$app/stores';
	import { Asset_list } from '../store/asset';

	export let data
	let red = data.red

	const id = $page.params.id;

	const current_asset = Asset_list.find((asset) => asset.id === id);
	let name:string
	let sector:string
	if (current_asset) {
	
		name = current_asset.name;
		sector = current_asset.sector;
	}
	

	let reportText = '';

	const handleNewReportSubmission = () => {
		alert(`report submitted: ${reportText}`);
	};
</script>
<h1>{red}</h1>
{#if current_asset}
	<table>
		<tr>
			<td>{name}</td>
			<td>{id}</td>
			<td>{sector}</td>
			<td><a href={`../${id}`}>View History & Files</a></td>
		</tr>
	</table>

	<div>
		New Report:
		<form on:submit={handleNewReportSubmission}>
			<input type="radio" name="maintainence" value="preventive" id="preventive" />
			<label for="preventive">Preventive Maintainence</label>
			<input type="radio" name="maintainence" value="corrective" id="corrective" />
			<label for="corrective">Corrective Maintainence</label>
			<br />
			<textarea rows="8" cols="53" class="full-report-field" bind:value={reportText} />
			<br />
			<button>submit</button>
		</form>
	</div>
{/if}

<style>
	.full-report-field {
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
