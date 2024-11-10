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
	import {EProcessStatus} from "$lib/types/program";
	import {t} from "$i18n/index";

	import {Host} from "$lib/store/hosts.model";
	import ProgramsTable from "./ProgramsManagerWidgets/ProgramsTable.svelte";
	import HostConfEditor from "$lib/widgets/ProgramsManagerWidgets/HostConfEditor.svelte";
	import {setContext} from "svelte";

	export let host = new Host({});
	const endpoint: string = host.endpoint!;

	const {getProgramList} = new ProgramClient(endpoint);
	const {send: refreshList} = useRequest(getProgramList, {force: true});

	setContext<string>("host.endpoint", endpoint);
	let filtered;

</script>


<main
		class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
>
	<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		<ProgramsTable host={host}></ProgramsTable>

	</div>

	<!-- S conf editor -->
	<HostConfEditor refresh={()=>refreshList()}/>
	<!-- E conf editor -->
</main>

