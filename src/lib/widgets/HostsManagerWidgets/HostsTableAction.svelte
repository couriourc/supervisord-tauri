<script lang="ts">
	import {EProcessStatus} from '$lib/types/program.js';
	import {Button} from "$lib/components/ui/button";
	import {MoreHorizontal, PlayCircle, StopCircle} from "lucide-svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Menubar from "$lib/components/ui/menubar";
	import AddHostDialog from "$lib/widgets/AddHostDialog.svelte";
	import type {Host} from "$lib/store/hosts.model";
	import {t} from "$i18n/index";

	interface Props {
		remove: (host: Host) => void;
		host: Host;
	}

	const {remove, host}: Props = $props();

</script>

<div class="flex items-center justify-center">
	<a href={`/host?host_id=${host.id}`}>
		<Button size="sm"
		        variant="link"
		        class="text-info"
		>{$t("hosts.check")}
		</Button>
	</a>
	<AddHostDialog host={host} isEdit={true}>
		<Button size="sm"
		        variant="link"
		        class="text-primary"
		>{$t("hosts.edit")}
		</Button>
	</AddHostDialog>
	<Button size="sm"
	        variant="link"
	        class="text-destructive"
	        on:click={remove.bind(null,host)}
	>{$t("hosts.remove")}
	</Button>
</div>
