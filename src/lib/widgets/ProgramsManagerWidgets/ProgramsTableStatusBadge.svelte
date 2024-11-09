<script lang="ts">
	import {EProcessStatus} from '$lib/types/program.js';
	import {t} from '$i18n/index';
	import type {ProcessModel} from "$lib/store/process.model";
	import {Badge} from '$lib/components/ui/badge/index';

	interface Props {
		statename: ProcessModel["statename"];

		[key: string]: unknown;
	}

	let {statename = EProcessStatus.Starting}: Props = $props();

</script>

<Badge class="text-xs" variant="outline">
	{$t(`program.${statename.toLowerCase()}`, {default: statename})}
</Badge>
