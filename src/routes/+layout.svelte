<script lang="ts">
    import '../app.css';

    import {open} from '@tauri-apps/plugin-shell';
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
    import {GitFork} from "lucide-svelte";
    import {PUBLIC_GITHUB_LINK} from "$env/static/public";
    import LangSelector from "$lib/widgets/LangSelector.svelte";
    import {SettingsModel} from "$lib/store/settings.model";
    import {setContext} from "svelte";
    import AsideNavs from "$lib/widgets/AsideNavs.svelte";

    setContext(SettingsModel.Namespace, new SettingsModel());


</script>
<Toaster></Toaster>
<div class="bg-muted/40 flex min-h-screen w-full flex-col">
    <AsideNavs/>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header
                class="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
        >

            <LangSelector/>
            <!--			<Breadcrumbs/>-->
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
                            <Avatar.Image src="/favicon.png" alt="@supervisord-plus"/>
                            <Avatar.Fallback>CN</Avatar.Fallback>
                        </Avatar.Root>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>
                        <Button class="flex items-center justify-center gap-2"
                                variant="link"
                                size="sm"
                                on:click={()=>open(PUBLIC_GITHUB_LINK)}>
                            <GitFork class="w-3.5 h-3.5"/>
                            <span>Github</span>
                        </Button>
                    </DropdownMenu.Label>
                    <DropdownMenu.Separator/>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </header>
        <slot></slot>
    </div>
</div>
