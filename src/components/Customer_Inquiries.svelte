<script>
	import { page } from '$app/stores';
	import { Asset_list, Asset } from '../store/asset';

	const id = $page.params.id;

	const current_asset = Asset_list.find((asset) => asset.id === id);
	const name = current_asset.name;
	const sector = current_asset.sector;
</script>

<div>
	Customer Inquiries
	<div>
		Asset Details
		<div>Asset ID: {id} <br /> Client name: sample client name</div>
		<div>Add picture</div>
	</div>
	<div>
		Conversations
		<div>[input conversation here]</div>
	</div>
</div>
