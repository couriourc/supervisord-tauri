<script lang="ts">
	import {hostsManager} from "$lib/store/hosts.model";
	import {page} from "$app/stores";
	import {RingLoader} from "svelte-loading-spinners";
	import ProgramsTable from "$lib/widgets/ProgramsTable.svelte";

	const hostQuery = hostsManager.Query($page.url.searchParams.get("host_id")!)!;

</script>
{#await hostQuery}
	<div class="m-auto">
		<RingLoader/>
	</div>
{:then host}
	<ProgramsTable host={host}/>
{/await}

