<script lang="ts">
	import { construct_svelte_component } from 'svelte/internal';
	import { Asset, Asset_list } from '../store/asset';
	import { goto } from '$app/navigation';

	let user_input = '';

	let returned_items = Asset_list;

	$: {
		returned_items =
			user_input.trim() === ''
				? Asset_list
				: Asset_list.filter((asset) => {
						const input_lowercase = user_input.toLowerCase().trim();
						return (
							asset.name.toLowerCase().trim().includes(input_lowercase) ||
							asset.id.toLowerCase().trim().includes(input_lowercase) ||
							asset.location.toLowerCase().trim().includes(input_lowercase) ||
							asset.client.toLowerCase().trim().includes(input_lowercase)
						);
				  });
	}

	const handleClicker = (event, id) => {
		if (event.target.classList.contains('table-entry')) {
			goto(`./${id}`);
		}
	};
</script>

<div>
	<form>
		<input placeholder="Search by client, asset, location" bind:value={user_input} />
	</form>
	<table class="returned-results">
		<tr>
			<th class="table-heading">Asset Name</th>
			<th class="table-heading">Asset ID</th>
			<th class="table-heading">Client Name</th>
			<th class="table-heading">Asset Location</th>
		</tr>
		{#each returned_items as result, index}
			<tr class="table-row" on:click={() => handleClicker(event, result.id)}>
				<td class="table-entry">{result.name}</td>
				<td class="table-entry">{result.id}</td>
				<td class="table-entry">{result.client}</td>
				<td class="table-entry">{result.location}</td>
				<td><a href={`./${result.id}/new_report`}>+ New Report</a></td>
				<td><a href={`./${result.id}/history`}>Asset History</a></td>
				<td><a href={`./${result.id}/customer_inquiries`}>Customer Inquiries</a></td>
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
		margin-left: 100px;
		padding-right: 100px;
	}
	.table-row:hover {
		background-color: aqua;
		cursor: pointer;
	}
	input {
		width: 400px;
	}
</style>
