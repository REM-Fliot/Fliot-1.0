<script>
	import { construct_svelte_component } from 'svelte/internal';

	class Asset {
		constructor(name, id, sector) {
			this.name = name;
			this.id = id;
			this.sector = sector;
		}
	}

	// const Asset_class_properties = ['name', 'id', 'sector'];

	let name_input = '',
		id_input = '',
		sector_input = '';

	const Asset_list = [
		new Asset('Magnetic Resonance Imaging (MRI) Scanner', '598', 'Radiology'),
		new Asset('Computed Tomography (CT) Scanner', '326', 'Radiology'),
		new Asset('Linear Accelerator (LINAC)', '721', 'Oncology'),
		new Asset('Positron Emission Tomography (PET) Scanner', '492', 'Nuclear Medicine'),
		new Asset('Robotic Surgical System', '185', 'Surgery'),
		new Asset('Gamma Camera', '622', 'Nuclear Medicine'),
		new Asset('Lithotripsy Machine', '851', 'Urology')
	];

	let returned_items = Asset_list;

	const updateResults = (event) => {
		event.preventDefault();
		returned_items =
			name_input.trim() === '' && id_input === '' && sector_input === ''
				? Asset_list
				: Asset_list.filter((asset) =>
						asset.name.toLowerCase().trim().includes(name_input.toLowerCase().trim())
				  )
						.filter((asset) =>
							asset.id.toLowerCase().trim().includes(id_input.toLowerCase().trim())
						)
						.filter((asset) => {
							return asset.sector.toLowerCase().trim().includes(sector_input.toLowerCase().trim());
						});
	};
</script>

<div>
	<form on:submit={updateResults}>
		<input placeholder="Search by Name" bind:value={name_input} />
		<input placeholder="Search by ID" bind:value={id_input} />
		<input placeholder="Search by Sector" bind:value={sector_input} />
		<button type="submit">Search</button>
	</form>
	<table class="returned-results">
		<tr>
			<th class="table-heading">Asset Name</th>
			<th class="table-heading">Asset ID</th>
			<th class="table-heading">Asset Sector</th>
		</tr>
		{#each returned_items as result}
			<tr>
				<td class="table-entry">{result.name}</td>
				<td class="table-entry">{result.id}</td>
				<td class="table-entry">{result.sector}</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	.returned-results {
		margin: 20px 0 0 0;
		padding: 0;
	}
	.table-heading {
		text-align: left;
		padding-bottom: 5px;
	}
	.table-entry {
		margin-left: 20px;
		padding-right: 50px;
	}
</style>
