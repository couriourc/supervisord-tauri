<script lang="ts">
	import {AceEditor, type Editor} from "svelte-ace";
	import "brace/mode/json";
	import "brace/theme/chrome";
	import {useRequest} from "alova/client";
	import {SupervisorClient} from "$lib/services/supervisor";
	import {RingLoader} from "svelte-loading-spinners";
	import dayjs from "dayjs";
	import {
		Copy,
		ChevronLeft,
		ChevronRight,
		EllipsisVertical,

		Loader
	} from "lucide-svelte";
	import {Button} from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Pagination from "$lib/components/ui/pagination";
	import {copy} from '$lib/directives/copy';
	import {RefreshCwIcon, SaveIcon} from "lucide-svelte";
	import {goto} from '$app/navigation';

	interface Props {
		endpoint: string;
		refresh: () => void;
	}

	const {endpoint, refresh}: Props = $props();
	let content = $state("");

	let editor: Editor;

	const {getSupervisorConfig, postSupervisorConfig, postSupervisorReload} = new SupervisorClient(endpoint);


	const {
		data: editorConfig,
		loading: isLoadingEditorConfig,
		send: refreshSupervisorConfig
	} = useRequest(getSupervisorConfig, {
		force: true
	});
	const {
		send: updateSupervisorConfig,
		loading: isUpdatingSupervisorConfig
	} = useRequest(postSupervisorConfig, {
		immediate: false
	});

	async function handleRefreshSupervisorConfig() {
		await refreshSupervisorConfig();
		editor.setValue($editorConfig?.data.content);
	}

	async function handleUpdateConfig() {
		if ($isUpdatingSupervisorConfig) return;
		await updateSupervisorConfig(content);
		await postSupervisorReload();
//		window.navigation.reload();
		refresh();
//		window.location.reload()
	}

	$effect(() => {
		content = $editorConfig?.data.content;
	});

</script>


<Card.Root class="overflow-hidden">
	<Card.Header class="bg-muted/50 flex flex-row items-start">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				{$editorConfig?.data.filename}
				<div use:copy={$editorConfig?.data.filename}>
					<Button
							size="icon"
							variant="outline"
							class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<Copy class="h-3 w-3"/>
						<span class="sr-only">Copy config path</span>
					</Button>
				</div>
			</Card.Title>
			<Card.Description>Date: {dayjs().format("YYYY-MM-DD hh:mm")}</Card.Description>
		</div>
		<div class="ml-auto flex items-center gap-1">
			<Button size="sm" variant="outline" class="h-8 gap-1" on:click={handleRefreshSupervisorConfig}>
				<RefreshCwIcon class="h-3.5 w-3.5"/>
			</Button>

			<Button size="sm" variant="outline" class="h-8 gap-1" on:click={handleUpdateConfig}>
				{#if $isUpdatingSupervisorConfig}
					<Loader class="h-3.5 w-3.5"></Loader>
				{:else}
					<SaveIcon class="h-3.5 w-3.5"/>
				{/if}
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
							builders={[builder]}
							size="icon"
							variant="outline"
							class="h-8 w-8"
					>
						<EllipsisVertical class="h-3.5 w-3.5"/>
						<span class="sr-only">More</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Edit</DropdownMenu.Item>
					<DropdownMenu.Item>Export</DropdownMenu.Item>
					<DropdownMenu.Separator/>
					<DropdownMenu.Item>Trash</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
	<Card.Content class="p-6 text-sm">
		<div class="grid gap-3 max-h-[500px] overflow-y-auto">
			{#if $isLoadingEditorConfig}
				<div class="mx-auto">
					<RingLoader></RingLoader>
				</div>
			{:else }
				<AceEditor
						on:init={(_editor) => {
							editor= _editor.detail;
							console.log(_editor.detail)
						}}
						on:commandKey={(obj) => console.log(obj.detail)}
						width='100%'
						height='60vh'
						lang="text"
						bind:value={content}
						options={{fontSize:14 }}
				/>
			{/if}
		</div>
	</Card.Content>
	<Card.Footer class="bg-muted/50 flex flex-row items-center border-t px-6 py-3">
		<div class="text-muted-foreground text-xs">
			Updated
			<time dateTime="2023-11-23">November 23, 2023</time>
		</div>
		<Pagination.Root count={10} class="ml-auto mr-0 w-auto">
			<Pagination.Content>
				<Pagination.Item>
					<Button size="icon" variant="outline" class="h-6 w-6">
						<ChevronLeft class="h-3.5 w-3.5"/>
						<span class="sr-only">Previous Order</span>
					</Button>
				</Pagination.Item>
				<Pagination.Item>
					<Button size="icon" variant="outline" class="h-6 w-6">
						<ChevronRight class="h-3.5 w-3.5"/>
						<span class="sr-only">Next Order</span>
					</Button>
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</Card.Footer>
</Card.Root>
