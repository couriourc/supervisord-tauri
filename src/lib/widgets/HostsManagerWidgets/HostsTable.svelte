<script lang="ts">
	import {Host, HostsManager, useHostsManager} from "$lib/store/hosts.model";
	import {Button} from "$lib/components/ui/button";
	import {RingLoader} from "svelte-loading-spinners";
	import {Badge} from "$lib/components/ui/badge";
	import {Empty} from "$lib/components/ui/empty";

	import * as Table from "$lib/components/ui/table";
	import {t} from "$i18n/index";
	import {getContext} from "svelte";
	import * as Card from "$lib/components/ui/card/index";
	import {readable} from "svelte/store";
	import AddHostDialog from "$lib/widgets/AddHostDialog.svelte";
	import {createRender, createTable, Render, Subscribe} from "svelte-headless-table";
	import {addHiddenColumns, addSelectedRows} from "svelte-headless-table/plugins";
	import HostsManagerTableCheckbox from "./HostsManagerTableCheckbox.svelte";
	import {cn} from "$lib/utils";
	import HostsTableAction from "$lib/widgets/HostsManagerWidgets/HostsTableAction.svelte";

	const {
		data: hosts,
		loading: isLoadingData,
		refresh: refreshList,
		remove: handleRemove
	} = getContext<ReturnType<typeof useHostsManager>>(HostsManager.ContextKey);

	function renderTable(hosts: Host[]) {
		let table = createTable(readable(hosts), {
			select: addSelectedRows(),
			hide: addHiddenColumns(),
		});
		const columns = table.createColumns([
			table.column({
				id: 'selection',
				header: (_, {pluginStates}) => {
					const {allPageRowsSelected} = pluginStates.select;
					return createRender(HostsManagerTableCheckbox, {
						checked: allPageRowsSelected,
					});
				},
				accessor: (info) => info,
				cell: ({row}, {pluginStates}) => {
					const {getRowState} = pluginStates.select;
					const {isSelected} = getRowState(row);
					return createRender(HostsManagerTableCheckbox, {
						checked: isSelected
					});
				}
			}),
			table.column({
				accessor: ({name}) => name,
				header: $t("hosts.manager.index"),
				id: "index",
				cell(info) {
					console.log(info);
					return (~~info.row.id) + 1;
				}
			}),
			table.column({
				accessor: "name",
				header: $t("hosts.manager.name"),
			}),
			table.column({
				accessor: "endpoint",
				header: $t("hosts.manager.endpoint"),
			}),
			table.column({
				accessor: "username",
				id: "username",
				header: $t("hosts.manager.username"),
				cell({value}) {
					if (!value?.length) return "--";
					return value;
				}
			}),
			table.column({
				accessor: "password",
				id: "password",
				header: $t("hosts.manager.password"),
				cell({value}) {
					if (!value?.length) return "--";
					return value;
				}
			}),
			table.column({
				accessor: (info) => info,
				id: 'action',
				header: $t("hosts.manager.action"),
				cell({value: info}) {
					return createRender(HostsTableAction, {
						host: info,
						remove:handleRemove
					});
				}
			}),
		]);
		return table.createViewModel(columns);
	}

	let {headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates} = renderTable($hosts);
	let {selectedDataIds} = pluginStates.select;
	const tableHeaderClassMap: Record<any, any> = {
		'selection': "w-[4em] text-center",
		'index': "w-[4em] text-center",
		'name': " text-center",
		'username': "text-center",
		"password": "text-center",
		"action": " [&.cell]:gap-[12px] w-[15em] text-center",
	};
	$: {
		const {
			headerRows: _headerRows,
			pageRows: _pageRows,
			tableAttrs: _tableAttrs,
			tableBodyAttrs: _tableBodyAttrs,
			pluginStates: {select: {selectedDataIds: _selectedDataIds}},
		} = renderTable($hosts);
		headerRows = _headerRows;
		pageRows = _pageRows;
		tableAttrs = _tableAttrs;
		tableBodyAttrs = _tableBodyAttrs;
		selectedDataIds = _selectedDataIds;
	}


</script>

<Table.Root {...$tableAttrs}>
	<Table.Header>
		{#each $headerRows as headerRow}
			<Subscribe rowAttrs={headerRow.attrs()}>
				<Table.Row
				>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs let:props
						           props={cell.props()}>
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
				<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && "selected"}
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
{#if !$hosts.length}
	<Card.Root class="shadow-none rounded-[0] border-0">
		<Card.Content>
			<div class="w-full pt-[12px] flex-col flex items-center justify-center mx-auto">
				<Empty/>
				<AddHostDialog>
					<Button size="sm" variant="link">{$t("hosts.add_host?")}</Button>
				</AddHostDialog>
			</div>
		</Card.Content>
		<Card.Footer>
		</Card.Footer>
	</Card.Root>
{/if}
