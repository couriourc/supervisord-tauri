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

	import dayjs from "dayjs";
	import AddHostDialog from "$lib/widgets/AddHostDialog.svelte";
	import {HostsManager, useHostsManager} from "$lib/store/hosts.model";
	import {setContext} from "svelte";
	import {Import, LucidePlusCircle} from "lucide-svelte";
	import HostsManagerTable from "$lib/widgets/HostsManager.svelte";
	import {t} from "$i18n/index";
	import HostsDashboard from "$lib/widgets/HostsDashboard.svelte";

	setContext<ReturnType<typeof useHostsManager>>(HostsManager.ContextKey, useHostsManager());


</script>


<main
		class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
>
	<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		<div class="flex ">
			<Card.Root class="w-full relative">
				<Card.Header class="pb-3">
					<Card.Title>It's Your SupervisordPlus DashBoard</Card.Title>
					<Card.Description class="max-w-lg text-balance leading-relaxed">
						Computer language design is just like a stroll in the park. Jurassic Park, that is.🙌
					</Card.Description>
				</Card.Header>

				<Card.Footer class="absolute bottom-0 right-1">
					<AddHostDialog>
						<Button class="flex gap-1">
							<LucidePlusCircle class="h-4 w-4"/>
							<span>{$t("hosts.add_host")}</span>
						</Button>
					</AddHostDialog>
				</Card.Footer>
			</Card.Root>
		</div>

		<Tabs.Root value="week">
			<HostsManagerTable/>
		</Tabs.Root>
	</div>
	<div>
		<HostsDashboard/>
	</div>
</main>
