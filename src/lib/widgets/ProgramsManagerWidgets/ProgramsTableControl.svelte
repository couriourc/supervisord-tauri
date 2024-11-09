<script lang="ts">
	import {EProcessStatus} from '$lib/types/program.js';
	import {Button} from "$lib/components/ui/button";
	import {t} from '$i18n/index';
	import type {ProcessModel} from "$lib/store/process.model";

	interface Props {
		start: () => void;
		stop: () => void;
		process: ProcessModel;

		[key: string]: unknown;
	}

	let {start, stop, process}: Props = $props();

</script>

<Button size="sm"
        variant="default"
        disabled={[EProcessStatus.Running,EProcessStatus.Starting].includes(process.statename)}
        on:click={start}
>
	{$t("program.run")}
</Button>
<Button
		size="sm"
		variant="destructive"
		disabled={[EProcessStatus.Stopped,EProcessStatus.Starting,EProcessStatus.Exited].includes(process.statename)}
		on:click={stop}
>{$t("program.stop")}
</Button>
