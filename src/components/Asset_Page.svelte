<script>
	import { page } from '$app/stores';
	import { Asset_list, Asset } from '../store/asset';
	import { goto } from '$app/navigation';
	import AddPicture from './Add_Picture.svelte';

	export let data
	let red = data.red


	const id = $page.params.id;

	const current_asset = Asset_list.find((asset) => asset.id === id);
	const name = current_asset.name;
	const sector = current_asset.sector;
	const client = current_asset.client;

	const handleBtnClick = (event) => {
		console.log($page.url.href);
		const div_id = event.target.id;
		if (div_id) {
			goto(`${$page.url.href}/${div_id}`);
		}
	};
</script>

<div>
	<h1>{red}</h1>
	<div>Asset Selected: {name} #{id}</div>
	<div>Asset ID: #{id}</div>
	<div>Client Name: {client}</div>
	<div on:click={() => handleBtnClick(event)}>
		<div class="add-picture btn"><AddPicture /></div>
		<div class="attachments btn" id="attachments">
			<img class="attachments" src="src/assets/attachments.png" />
		</div>
		<div class="asset-history btn" id="history">Asset History</div>
	</div>
	<div>Action Items</div>
	<div on:click={() => handleBtnClick(event)}>
		<div class="new-report btn" id="new_report">New Report</div>
		<div class="customer-inquiries btn" id="customer_inquiries">Customer inquiries</div>
	</div>
</div>

<style>
	.btn:hover {
		cursor: pointer;
		height: auto;
	}
	.attachments {
		width: 200px;
	}
</style>
