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
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>#</Table.Head>
					<Table.Head>
						{$t("program.name")}
					</Table.Head>
					<Table.Head class="hidden sm:table-cell">
						{$t("program.status")}
					</Table.Head>
					<Table.Head class="hidden sm:table-cell">{$t("program.control")}</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if $isLoadingData}
					<div class="flex items-center justify-center  w-full my-[24px] mx-auto">
						<RingLoader color="hsl(var(--primary) / 0.9)"></RingLoader>
					</div>
				{:else }
					{#each processes as process,index }
						<Table.Row class="bg-accent">
							<Table.Cell>
								<div class="font-medium">{index + 1}</div>
							</Table.Cell>
							<Table.Cell>
								<div class="font-medium">{process.name}</div>
							</Table.Cell>
							<Table.Cell class="hidden sm:table-cell">
								<Badge class="text-xs" variant="outline">
									{$t(`program.${process.statename.toLowerCase()}`,
											{default: process.statename})}
								</Badge>
							</Table.Cell>
							<Table.Cell>
								<!-- S Control Button-->
								<Button size="sm"
								        variant="default"
								        disabled={[EProcessStatus.Running,EProcessStatus.Starting].includes(process.statename)}
								        on:click={handlePostProgramStartByName.bind(null,process.name)}>
									{$t("program.start")}
								</Button>
								<Button
										size="sm"
										variant="destructive"
										disabled={[EProcessStatus.Stopped,EProcessStatus.Starting,EProcessStatus.Exited].includes(process.statename)}
										on:click={handlePostStopStartByName.bind(null,process.name)}
								>{$t("program.stop")}
								</Button>
								<!-- E Control Button-->
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
