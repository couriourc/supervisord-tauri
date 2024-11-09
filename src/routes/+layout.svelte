<script lang="ts">
	import '../app.css';

	import * as Avatar from "$lib/components/ui/avatar";
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
	import Settings from "lucide-svelte/icons/settings";
	import ShoppingCart from "lucide-svelte/icons/shopping-cart";
	import UsersRound from "lucide-svelte/icons/users-round";
	import toast, {Toaster} from 'svelte-french-toast';
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import {Button} from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import {Input} from "$lib/components/ui/input";
	import * as Pagination from "$lib/components/ui/pagination";
	import {Progress} from "$lib/components/ui/progress";
	import {Separator} from "$lib/components/ui/separator";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Table from "$lib/components/ui/table";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import SettingDialog from "$lib/widgets/SettingDialog.svelte";
	import {loadTranslations, t} from "$i18n/index";
	import Breadcrumbs from "$lib/widgets/Breadcrumbs.svelte";

	loadTranslations("zh");

</script>
<Toaster></Toaster>
<div class="bg-muted/40 flex min-h-screen w-full flex-col">

	<aside class="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
		<nav class="flex flex-col items-center gap-4 px-2 py-4">
			<a
					href={'/'}
					class="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
			>
				<Package2 class="h-4 w-4 transition-all group-hover:scale-110"/>
				<span class="sr-only">{$t("nav.Dashboard")}</span>
			</a>
		</nav>
		<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
			<SettingDialog>
				<Button variant="link">
					<Settings class="h-5 w-5"/>
					<span class="sr-only">{$t("nav.Settings")}</span>
				</Button>
			</SettingDialog>
		</nav>
	</aside>

	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
				class="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>

			<Breadcrumbs/>
			<div class="relative ml-auto flex-1 md:grow-0">
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
							variant="outline"
							size="icon"
							class="overflow-hidden rounded-full"
							builders={[builder]}
					>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn"/>
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator/>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<slot></slot>
	</div>
</div>
