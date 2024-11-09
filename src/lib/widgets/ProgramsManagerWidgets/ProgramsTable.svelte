<script lang="ts">
	import {t} from '$i18n/index.js';
	import {Badge} from '$lib/components/ui/badge/index';
	import {Button} from '$lib/components/ui/button/index';
	import * as Card from "$lib/components/ui/card";
	import type {Host} from '$lib/store/hosts.model';
	import {EProcessStatus} from '$lib/types/program';
	import {RingLoader} from 'svelte-loading-spinners';
	import * as Table from '$lib/components/ui/table';
	import {ProgramClient} from "$lib/services/program";
	import {SupervisorClient} from "$lib/services/supervisor";
	import {MetricsClient} from "$lib/services/metrics";
	import {useRequest} from "alova/client";
	import {type ProcessModel} from "$lib/store/process.model";
	import {Label} from "$lib/components/ui/label";
	import {RefreshCwIcon} from "lucide-svelte";
	import {
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from "svelte-headless-table/plugins";

	export let host: Host;
	export let endpoint = "";

	const {getProgramList, postProgramStartByName, postProgramStopByName,} = new ProgramClient(endpoint);
	const {
		loading: isLoadingData,
		data: processesData,
		send: refreshList
	} = useRequest(getProgramList, {force: true});
	let processes: ProcessModel[] = [];
	$: processes = $processesData?.data ?? [];

	// S start a program,and refresh list
	async function handlePostProgramStartByName(name: string) {
		await postProgramStartByName(name);
		await refreshList();
	}

	// E start a program,and refresh list

	// S stop a program,and refresh list
	async function handlePostStopStartByName(name: string) {
		await postProgramStopByName(name);
		await refreshList();
	}

	// E stop a program,and refresh list
	import {createRender, Render, createTable, Subscribe} from "svelte-headless-table";
	import {readable, writable} from "svelte/store";
	import ProgramsTableAction from "$lib/widgets/ProgramsManagerWidgets/ProgramsTableControl.svelte";
	import ProgramsTableStatusBadge from "$lib/widgets/ProgramsManagerWidgets/ProgramsTableStatusBadge.svelte";
	import ProgramsTableCheckbox from "$lib/widgets/ProgramsManagerWidgets/ProgramsTableCheckbox.svelte";
	import {cn} from "$lib/utils";
	import dayjs from "dayjs";

	function renderTable(processes: ProcessModel[]) {
		let table = createTable(readable(processes), {
			select: addSelectedRows(),
			hide: addHiddenColumns(),
		});
		const columns = table.createColumns([
			table.column({
				id: 'selection',
				header: (_, {pluginStates}) => {
					const {allPageRowsSelected} = pluginStates.select;
					return createRender(ProgramsTableCheckbox, {
						checked: allPageRowsSelected,
					});
				},
				accessor: (info) => info,
				cell: ({row}, {pluginStates}) => {
					const {getRowState} = pluginStates.select;
					const {isSelected} = getRowState(row);
					return createRender(ProgramsTableCheckbox, {
						checked: isSelected
					});
				}
			}),
			table.column({
				accessor: ({name}) => name,
				header: $t("program.index"),
				id: "index",
				cell(info) {
					return info.row.depth + 1;
				}
			}),
			table.column({
				accessor: "name",
				header: $t("program.name"),
			}),
			table.column({
				accessor: "description",
				header: $t("program.description"),
			}),
			table.column({
				accessor: "statename",
				id: "status",
				header: $t("program.status"),
				cell({value}) {
					return createRender(ProgramsTableStatusBadge, {
						statename: value
					});
				}
			}),
			table.column({
				accessor: (info) => info,
				id: "control",
				header: $t("program.control"),
				cell: ({value: process}) => {
					return createRender(ProgramsTableAction, {
						start: handlePostProgramStartByName.bind(null, process.name),
						stop: handlePostStopStartByName.bind(null, process.name),
						process: process
					});
				}
			}),
		]);
		return table.createViewModel(columns);

	}

	let {headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates} = renderTable(processes);
	let {selectedDataIds} = pluginStates.select;

	$: {
		const {
			headerRows: _headerRows,
			pageRows: _pageRows,
			tableAttrs: _tableAttrs,
			tableBodyAttrs: _tableBodyAttrs,
			pluginStates: {select: {selectedDataIds: _selectedDataIds}},
		} = renderTable(processes);
		headerRows = _headerRows;
		pageRows = _pageRows;
		tableAttrs = _tableAttrs;
		tableBodyAttrs = _tableBodyAttrs;
		selectedDataIds = _selectedDataIds;
	}
	const tableHeaderClassMap: Record<any, any> = {
		'index': "w-[4em] text-center",
		'name': " text-center",
		'selection': "w-[2em]",
		"status": "w-[6em] text-center",
		"control": " [&.cell]:gap-[12px] w-[10em] text-center",
	};
</script>
<Card.Root>
	<Card.Header class="px-7">
		<Card.Title>Program
			<Button
					size="icon"
					variant="outline"
					class="h-6 w-6 transition-opacity"
					on:click={refreshList.bind(null)}
			>
				<RefreshCwIcon class="h-3 w-3"/>
				<span class="sr-only">Refresh Program</span>
			</Button>
		</Card.Title>
		<Card.Description>All Programs from your host<Label
				class="bg-gray-500 text-white ml-[4px] rounded-[2px]">{host.name}</Label>.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if $isLoadingData}
			<div class="w-full flex justify-center items-center  mx-auto">
				<RingLoader></RingLoader>
			</div>
		{:else }
			<Table.Root {...$tableAttrs}>
				<Table.Header>
					{#each $headerRows as headerRow}
						<Subscribe rowAttrs={headerRow.attrs()}>
							<Table.Row
							>
								{#each headerRow.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs let:props props={cell.props()}>
										<Table.Head {...attrs}
										            class={`[&:has([role=checkbox])]:pl-3 header ${tableHeaderClassMap[cell.id]}`}
										>
											<Render of={cell.render()}/>
										</Table.Head>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Header>
				<Table.Body {...$tableBodyAttrs}>
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}

							           data-state={$selectedDataIds[row.id] && "selected"}
							>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} props={cell.props()} let:attrs>
										<Table.Cell {...attrs}
										            class={cn("[&:has([role=checkbox])]:pl-3","cell", tableHeaderClassMap[cell.id])}
										>
											<Render of={cell.render()}/>
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
</Card.Root>
