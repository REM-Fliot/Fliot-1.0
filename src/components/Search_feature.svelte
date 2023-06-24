<script lang="ts">
	import { construct_svelte_component } from 'svelte/internal';
	import { Asset, Asset_list } from '../store/asset';

	let name_input = '',
		id_input = '',
		sector_input = '';

	let selected_assets = [];

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

	const handleAssetClick = (index) => {
		selected_assets = !selected_assets.includes(index)
			? [...selected_assets, index]
			: selected_assets.filter((item) => item !== index);
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
		{#each returned_items as result, index}
			<tr class="table-row" on:click={() => handleAssetClick(index)}>
				<td class="table-entry">{result.name}</td>
				<td class="table-entry">{result.id}</td>
				<td class="table-entry">{result.sector}</td>
			</tr>
			{#if selected_assets.includes(index)}
				<div>
					<a href={`./${result.id}/new_report`}>+ New Report</a>
					<a href={`./${result.id}`}>View History & Files</a>
				</div>
			{/if}
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
	.table-row:hover {
		background-color: aqua;
		cursor: pointer;
	}
</style>
