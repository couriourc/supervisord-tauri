<script lang="ts">

	import {Host} from "$lib/store/hosts.model";
	import ProgramsTable from "./ProgramsManagerWidgets/ProgramsTable.svelte";
	import HostConfEditor from "$lib/widgets/ProgramsManagerWidgets/HostConfEditor.svelte";
	import {setContext} from "svelte";

	export let host: Host = new Host({});
	setContext<Host>(Host.ContextKey, host);


</script>


<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
	<!-- S program table -->
	<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		<ProgramsTable/>
	</div>
	<!-- E program table -->

	<!-- S conf editor -->
	<HostConfEditor/>
	<!-- E conf editor -->
</main>

