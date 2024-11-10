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
	import {Progress} from "$lib/components/ui/progress";
	import {Separator} from "$lib/components/ui/separator";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import {useRequest} from "alova/client";
	import {RingLoader} from "svelte-loading-spinners";
	import {EProcessStatus} from "$lib/types/program";
	//	import {getMetrics} from "$lib/services/metrics";

	import dayjs from "dayjs";
	import AddHostDialog from "$lib/widgets/AddHostDialog.svelte";
	import {useHostsManager} from "$lib/store/hosts.model";
	import {setContext} from "svelte";
	import {Import, LucidePlusCircle} from "lucide-svelte";
	import HostsManagerTable from "$lib/widgets/HostsManagerTable.svelte";
	import {t} from "$i18n/index";

	setContext("hostsManager", useHostsManager());


	//	const {loading: isLoadingMetrics, data: metrics} = useRequest(getMetrics, {force: true});


	function handleToAddNewHosts() {

	}

</script>


<main
		class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
>
	<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			<Card.Root class="sm:col-span-2 relative">
				<Card.Header class="pb-3">
					<Card.Title>Your Programs</Card.Title>
					<Card.Description class="max-w-lg text-balance leading-relaxed">
						Computer language design is just like a stroll in the park. Jurassic Park, that is.🙌
					</Card.Description>
				</Card.Header>

				<Card.Footer class="absolute bottom-0 right-1">
					<AddHostDialog>
						<Button on:click={handleToAddNewHosts} class="flex gap-1">
							<LucidePlusCircle class="h-4 w-4"/>
							<span>{$t("hosts.add_host")}</span>
						</Button>
					</AddHostDialog>
				</Card.Footer>
			</Card.Root>
			<Card.Root>
				<Card.Header class="pb-2">
					<Card.Description>Now</Card.Description>
					<Card.Title class="text-4xl">执行信息</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="text-muted-foreground text-xs"></div>
				</Card.Content>
				<Card.Footer>
					<Progress value={25} aria-label="25% increase"/>
				</Card.Footer>
			</Card.Root>
			<Card.Root>
				<Card.Header class="pb-2">
					<Card.Description>Now</Card.Description>
					<Card.Title class="text-3xl">运行情况</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="text-muted-foreground text-xs">1/2</div>
				</Card.Content>
				<Card.Footer>
					<Progress value={12} aria-label="12% increase"/>
				</Card.Footer>
			</Card.Root>
		</div>

		<Tabs.Root value="week">
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
							<DropdownMenu.Label>Filter by</DropdownMenu.Label>
							<DropdownMenu.Separator/>
							<DropdownMenu.CheckboxItem checked>
								Fulfilled
							</DropdownMenu.CheckboxItem>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
						<File class="h-3.5 w-3.5"/>
						<span class="sr-only sm:not-sr-only">Export</span>
					</Button>
					<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
						<Import class="h-3.5 w-3.5"/>
						<span class="sr-only sm:not-sr-only">Import</span>
					</Button>
				</div>
			</div>
			<Tabs.Content value="week">
				<Card.Root>
					<Card.Header class="px-7">
						<Card.Title>Hosts</Card.Title>
						<Card.Description>All Hosts from your created.</Card.Description>
					</Card.Header>
					<Card.Content>
						<HostsManagerTable/>
					</Card.Content>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
	<div>
		<Card.Root class="overflow-hidden">
			<Card.Header class="bg-muted/50 flex flex-row items-start">
				<div class="grid gap-0.5">
					<Card.Title class="group flex items-center gap-2 text-lg">
						Metrics
						<Button
								size="icon"
								variant="outline"
								class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Copy class="h-3 w-3"/>
							<span class="sr-only">Copy Order ID</span>
						</Button>
					</Card.Title>
					<Card.Description>Date: {dayjs().format("YYYY-MM-DD hh:mm")}</Card.Description>
				</div>
				<div class="ml-auto flex items-center gap-1">
					<Button size="sm" variant="outline" class="h-8 gap-1">
						<Truck class="h-3.5 w-3.5"/>
						<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
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
					<!--{#if $isLoadingMetrics}-->
					<div class="mx-auto">
						<RingLoader></RingLoader>
					</div>
					<!--{:else }-->
					<!--	{@html $metrics?.data}-->
					<!--{/if}-->
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
	</div>
</main>
