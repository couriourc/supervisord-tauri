<script lang="ts">
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import Copy from "lucide-svelte/icons/copy";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import File from "lucide-svelte/icons/file";
	import House from "lucide-svelte/icons/house";
	import ChartLine from "lucide-svelte/icons/chart-line";
	import ListFilter from "lucide-svelte/icons/list-filter";
	import EllipsisVertical from "lucide-svelte/icons/ellipsis-vertical";
	import Package from "lucide-svelte/icons/package";
	import Package2 from "lucide-svelte/icons/package-2";
	import PanelLeft from "lucide-svelte/icons/panel-left";
	import Search from "lucide-svelte/icons/search";
	import Settings from "lucide-svelte/icons/settings";
	import ShoppingCart from "lucide-svelte/icons/shopping-cart";
	import Truck from "lucide-svelte/icons/truck";
	import UsersRound from "lucide-svelte/icons/users-round";

	import {Badge} from "$lib/components/ui/badge";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import {Button} from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import {Input} from "$lib/components/ui/input";
	import * as Pagination from "$lib/components/ui/pagination";
	import * as Avatar from "$lib/components/ui/avatar";
	import {Progress} from "$lib/components/ui/progress";
	import {Separator} from "$lib/components/ui/separator";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Table from "$lib/components/ui/table";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import {ProgramClient} from "$lib/services/program";
	import {useRequest} from "alova/client";
	import {RingLoader} from "svelte-loading-spinners";
	import {EProcessStatus} from "$lib/types/program";
	import {copy} from '$lib/directives/copy';
	import {t} from "$i18n/index";

	import dayjs from "dayjs";
	import {MetricsClient} from "$lib/services/metrics";
	import {Host} from "$lib/store/hosts.model";
	import {SupervisorClient} from "$lib/services/supervisor";
	import {Edit, Eye, EyeIcon, RefreshCwIcon, SaveIcon} from "lucide-svelte";
	import ProgramsTable from "./ProgramsManagerWidgets/ProgramsTable.svelte";
	import HostConfEditor from "$lib/widgets/ProgramsManagerWidgets/HostConfEditor.svelte";
	import {get, writable} from "svelte/store";
	import type {Editor} from "svelte-ace";


	export let host = new Host({});
	const endpoint: string = host.endpoint!;

	let editable = false;
	let editor: { getEditorValue: () => string };

	const {getProgramList, postProgramStartByName, postProgramStopByName,} = new ProgramClient(endpoint);
	const {getSupervisorConfig, getSupervisorSummary} = new SupervisorClient(endpoint);
	const {getMetrics} = new MetricsClient(endpoint);

	const {
		loading: isLoadingData,
		data: processes,
		send: refreshList
	} = useRequest(getProgramList, {force: true});
	const {loading: isLoadingMetrics, data: metrics} = useRequest(getMetrics, {force: true});
	const {
		data: editorConfig,
		loading: isLoadingEditorConfig,
		send: refreshSupervisorConfig
	} = useRequest(getSupervisorConfig);

	async function handleRefreshSupervisorConfig() {
		await refreshSupervisorConfig();
	}

	async function handlePostProgramStartByName(name: string) {
		await postProgramStartByName(name);
		await refreshList();
	}

	async function handlePostStopStartByName(name: string) {
		await postProgramStopByName(name);
		await refreshList();
	}

	async function handleUpdateConfig(canEdit: boolean) {
		console.log(editor.getEditorValue());
	}

</script>


<main
		class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
>
	<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		<Tabs.Root value="program">
			<div class="flex items-center">
				<div class="ml-auto flex items-center gap-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button
									variant="outline"
									size="sm"
									class="h-7 gap-1 text-sm"
									builders={[builder]}
							>
								<ListFilter class="h-3.5 w-3.5"/>
								<span class="sr-only sm:not-sr-only">Filter</span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Label>Filter by Status</DropdownMenu.Label>
							<DropdownMenu.Separator/>
							{#each Object.entries(EProcessStatus) as [status] }
								<DropdownMenu.CheckboxItem>
									{$t(`program.${status.toLowerCase()}`)}
								</DropdownMenu.CheckboxItem>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
						<File class="h-3.5 w-3.5"/>
						<span class="sr-only sm:not-sr-only">Export</span>
					</Button>
				</div>
			</div>
			<Tabs.Content value="program">
				<ProgramsTable host={host} endpoint={endpoint}></ProgramsTable>
			</Tabs.Content>
		</Tabs.Root>
	</div>

	<div>
		<HostConfEditor refresh={()=>refreshList()}
		                endpoint={endpoint}/>
	</div>
</main>
