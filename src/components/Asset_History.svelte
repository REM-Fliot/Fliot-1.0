<script>
	import { page } from '$app/stores';
	import { Asset_list, Asset } from '../store/store';

	const id = $page.params.id;

	const current_asset = Asset_list.find((asset) => asset.id === id);
	const name = current_asset.name;
	const sector = current_asset.sector;

	class Report {
		constructor(assetId, title, date, type, content) {
			this.assetId = assetId;
			this.title = title;
			this.date = date;
			this.type = type;
			this.content = content;
		}
	}

	console.log();

	const report_list = [
		new Report(
			id,
			'This is an example report',
			'06/24/2023',
			'Corrective',
			'This is a sample report'
		),
		new Report(id, 'This is a new report', '06/24/2023', 'Preventive', 'This is a sample')
	];
</script>

{#if current_asset}
	<table>
		<tr>
			<td>{name}</td>
			<td>{id}</td>
			<td>{sector}</td>
			<td><a href={`./${id}/new_report`}>+ New Report</a></td>
		</tr>
		{#each report_list as report}
			<tr class="table-row"> {report.assetId} {report.title} {report.date} {report.type}</tr>
		{/each}
		<tr />
	</table>
{/if}

<style>
	.table-row:hover {
		background-color: aqua;
		cursor: pointer;
	}
</style>
