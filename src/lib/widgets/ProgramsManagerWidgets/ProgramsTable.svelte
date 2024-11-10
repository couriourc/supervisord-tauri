<script lang="ts">
	import {Badge} from '$lib/components/ui/badge/index';
	import {Button} from '$lib/components/ui/button/index';
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import type {Host} from '$lib/store/hosts.model';
	import {RingLoader} from 'svelte-loading-spinners';
	import {ProgramClient} from "$lib/services/program";
	import {useRequest} from "alova/client";
	import {FilterX, ListFilter} from "lucide-svelte";
	import {type ProcessModel} from "$lib/store/process.model";
	import {Label} from "$lib/components/ui/label";
	import {RefreshCwIcon} from "lucide-svelte";
	import {addHiddenColumns, addSelectedRows} from "svelte-headless-table/plugins";
	import {t} from '$i18n/index';

	export let host: Host;
	let endpoint = getContext<string>("host.endpoint");

	const {getProgramList, postProgramStartByName, postProgramStopByName,} = new ProgramClient(endpoint);

	const {
		loading: isLoadingData,
		data: processesData,
		send: refreshList
	} = useRequest(getProgramList, {force: true});
	let processes: ProcessModel[] = [];
	let filtered: EProcessStatus | undefined;
	$: processes = $processesData?.data ?? [];

	// S start a program,and refresh list
	async function handlePostProgramStartByName(name: string) {
		await postProgramStartByName(name);
		await refreshList();
	}

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
	import {getContext} from "svelte";
	import {EProcessStatus} from "$lib/types/program";
	import AddHostDialog from "$lib/widgets/AddHostDialog.svelte";
	import {Empty} from "$lib/components/ui/empty";

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
		} = renderTable(processes.filter((process) => {
			if (!filtered) return true;
			return process.statename === filtered;
		}));
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

	function handleFilterProgramList(condition: string) {
		if (filtered === condition) return filtered = undefined;
		filtered = condition as EProcessStatus;

	}
</script>


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
						<FilterX class={cn("h-3.5 w-3.5 ",{
							"text-primary": !!filtered
						})}></FilterX>
						<span class="sr-only sm:not-sr-only">Filter</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>Filter by Status</DropdownMenu.Label>
					<DropdownMenu.Separator/>
					{#each Object.entries(EProcessStatus) as [status] }
						<DropdownMenu.CheckboxItem checked={status===filtered}
						                           on:click={()=>handleFilterProgramList(status)}>
							{$t(`program.${status.toLowerCase()}`)}
						</DropdownMenu.CheckboxItem>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<Tabs.Content value="program">
		<Card.Root>
			<Card.Header class="px-7">
				<Card.Title>Program
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


					{#if !$pageRows.length}
						<Card.Root class="shadow-none rounded-[0] w-full border-0">
							<Card.Content>
								<div class="w-full pt-[12px] flex-col flex items-center justify-center mx-auto">
									<Empty/>
									<Button size="sm" variant="default" on:click={refreshList}>{$t(
											"program.refresh")}</Button>
								</div>
							</Card.Content>
							<Card.Footer>
							</Card.Footer>
						</Card.Root>
					{/if}
				{/if}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
