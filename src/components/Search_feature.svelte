<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let assets;

	let asset_list = assets;

	let user_input = '';

	onMount(() => {
		// FetchData();
		// console.log($Asset_list)
	});

	// let asset_list_copy
	// Asset_list.subscribe((value) => {
	// 	asset_list_copy = value;
	// })

	// let returned_items = asset_list_copy;

	$: {
		asset_list =
			user_input.trim() === ''
				? asset_list
				: asset_list.filter((asset) => {
						let a = asset.data();
						const input_lowercase = user_input.toLowerCase().trim();
						return (
							a.ASSET_NAME.toLowerCase().trim().includes(input_lowercase) ||
							// asset.id.toString().toLowerCase().trim().includes(input_lowercase) ||
							// asset.location.toLowerCase().trim().includes(input_lowercase) ||
							a.CLIENT_NAME.toLowerCase().trim().includes(input_lowercase)
						);
				  });
	}

	const handleClicker = (event, id) => {
		if (event.target.classList.contains('table-entry')) {
			goto(`./${id}`);
		}
	};
</script>

<div class="flex flex-col">
	<!-- <form class="w-"> -->
	<div class="w-full flex my-10 relative">
		<input
			class=" grow text-xl p-3 border-black border-2 rounded-2xl"
			placeholder="Search by client, asset, location"
			bind:value={user_input}
		/>
		<img
			class="absolute bottom-0.5 right-1"
			alt="An arrow to login"
			src="/svgs/assets/search.svg"
		/>
	</div>

	<!-- </form> -->
	<table class="returned-results">
		<tr>
			<th class="table-heading">Asset Name</th>
			<th class="table-heading">Asset ID</th>
			<th class="table-heading">Client Name</th>
			<th class="table-heading">Asset Location</th>
		</tr>
		{#each asset_list as result, index}
			<tr class="table-row" on:click={() => handleClicker(event, result.data().ASSET_ID)}>
				<td class="table-entry">{result.data().ASSET_NAME}</td>
				<td class="table-entry">{result.data().ASSET_ID}</td>
				<td class="table-entry">{result.data().CLIENT_NAME}</td>
				<td class="table-entry">{result.data().ASSET_LOCATION}</td>
				<td><a href={`./asset/${result.data().ASSET_ID}/new_report`}>+ New Report</a></td>
				<td><a href={`./asset/${result.data().ASSET_ID}/history`}>Asset History</a></td>
				<td>
					<a href={`./asset/${result.data().ASSET_ID}/customer_inquiries`}>Customer Inquiries</a>
				</td>
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
