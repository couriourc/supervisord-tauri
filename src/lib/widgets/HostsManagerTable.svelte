<script lang="ts">
	import {Badge} from '$lib/components/ui/badge/index.js';
	import {Button} from '$lib/components/ui/button/index.js';
	import {HostsManager, useHostsManager} from '$lib/store/hosts.model.js';
	import {RingLoader} from 'svelte-loading-spinners';
	import * as Table from "$lib/components/ui/table";
	import {t} from "$i18n/index";
	import {getContext} from "svelte";
	import {Empty} from "$lib/components/ui/empty";
	import * as Card from "$lib/components/ui/card/index";
	import {writable} from "svelte/store";
	import AddHostDialog from "$lib/widgets/AddHostDialog.svelte";

	const {
		data: hosts,
		loading: isLoadingData,
		refresh: refreshList,
		remove: handleRemove
	} = getContext<ReturnType<typeof useHostsManager>>("hostsManager");
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>#</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head class="hidden sm:table-cell">
				EndpointUrl
			</Table.Head>
			<Table.Head class="hidden sm:table-cell">Action</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#if $isLoadingData}
			<div class="flex items-center justify-center  w-full  my-[24px] mx-auto">
				<RingLoader color="hsl(var(--primary) / 0.9)"></RingLoader>
			</div>
		{:else }
			{#each $hosts as host,index }
				<Table.Row class="bg-accent">
					<Table.Cell>
						<div class="font-medium">{index + 1}</div>
					</Table.Cell>
					<Table.Cell>
						<div class="font-medium">{host.name}</div>
					</Table.Cell>
					<Table.Cell class="hidden sm:table-cell">
						<Badge class="text-xs" variant="secondary">
							{host.endpoint}
						</Badge>
					</Table.Cell>
					<Table.Cell>
						<Button variant="link" class="text-gray-400">
							<a href={`host?host_id=${host.id}`}>{$t("hosts.check")}</a>
						</Button>

						<Button variant="link">
							{$t("hosts.edit")}
						</Button>

						<Button on:click={handleRemove.bind(null,host)} variant="link"
						        class="text-red-400">
							{$t("hosts.delete")}
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}

		{/if}

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
