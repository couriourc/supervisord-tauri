<script lang="ts">
	import HostsTable from "$lib/widgets/HostsManagerWidgets/HostsTable.svelte";
	import * as Card from "$lib/components/ui/card";
	import {Button} from "$lib/components/ui/button";
	import {File, Import, ListFilter, RefreshCwIcon} from "lucide-svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Tabs from "$lib/components/ui/tabs";
	import {t} from "$i18n/index";
	import {Host, HostsManager, useHostsManager} from "$lib/store/hosts.model";
	import {importFile, saveFile} from "$lib/utils/save";
	import {getContext} from "svelte";
	import toast from "svelte-french-toast";

	const {
		batchUpdate,
		refresh: refreshList,
	} = getContext<ReturnType<typeof useHostsManager>>(HostsManager.ContextKey);
	let hostsTable: {
		getData: Function
	};

	function handleExport() {
		const keys = hostsTable.getData() as Host[];
		const header = Object.keys(keys[0]).join(",");  // Combine all keys into a single string, separated by commas
		const csvContent = keys.map(host => Object.values(host).join(",")).join("\n");  // Combine all values into a single string, separated by commas
		saveFile(`hosts.csv`, header + "\n" + csvContent);
	}

	async function handleImport() {
		// TODO: Implement file upload and import functionality
		const [header, ...data] = (await importFile()).split("\n");
		const headers = header.split(",");
		await batchUpdate(data.map((item) => {
			const obj: any = {};
			const data = item.split(",");
			headers.forEach((header, index) => {
				obj[header as keyof Host] = data[index];
			});
			return new Host(obj);
		}));
		toast.success("Import Successfully!");
	}


</script>

<div class="flex items-center">
	<div class="ml-auto flex items-center gap-2">
		<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
			<File class="h-3.5 w-3.5"/>
			<button class="sr-only sm:not-sr-only capitalize"
			        on:click={handleExport}
			>{$t('common.export')}</button>
		</Button>
		<!--		<Button size="sm" variant="outline" class="h-7 gap-1 text-sm" on:click={handleImport}>-->
		<!--			<Import class="h-3.5 w-3.5"/>-->
		<!--			<span class="sr-only sm:not-sr-only capitalize">{$t('common.import')}</span>-->
		<!--		</Button>-->
	</div>
</div>
<Tabs.Content value="week">
	<Card.Root>
		<Card.Header class="px-7">
			<Card.Title>Hosts

				<Button
						size="icon"
						variant="outline"
						class="h-6 w-6 transition-opacity"
						on:click={refreshList.bind(null)}
				>
					<RefreshCwIcon class="h-3 w-3 "/>
					<span class="sr-only">{$t("program.refresh")}</span>
				</Button>
			</Card.Title>
			<Card.Description>All Hosts from by you created.</Card.Description>
		</Card.Header>
		<Card.Content>
			<HostsTable/>
		</Card.Content>
	</Card.Root>
</Tabs.Content>
