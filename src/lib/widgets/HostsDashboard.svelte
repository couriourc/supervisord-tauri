<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import dayjs from 'dayjs';
	import {RingLoader} from 'svelte-loading-spinners';
	import {ChevronLeft, ChevronRight, Copy, EllipsisVertical, Truck} from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Pagination from '$lib/components/ui/pagination';
	import {t} from "$i18n/index";

</script>

<Card.Root class="overflow-hidden">
	<Card.Header class="bg-muted/50 flex flex-row items-start">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				{$t("hosts.dashboard")}
				<Button
						size="icon"
						variant="outline"
						class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<Copy class="h-3 w-3"/>
				</Button>
			</Card.Title>
		</div>
		<div class="ml-auto flex items-center gap-1">
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
			<div class="mx-auto">
				<RingLoader></RingLoader>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="bg-muted/50 flex flex-row items-center border-t px-6 py-3">
		<div class="text-muted-foreground text-xs">
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
