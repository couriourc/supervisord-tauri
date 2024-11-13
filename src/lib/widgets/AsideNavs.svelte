<script lang="ts">
    import Package2 from "lucide-svelte/icons/package-2";
    import {t} from "$i18n/index"
    import {UploadCloud} from "lucide-svelte";


</script>
<aside class="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
    <nav class="flex flex-col items-center gap-4 px-2 py-4">
        <a
                href={'/'}
                class="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
            <Package2 class="h-4 w-4 transition-all group-hover:scale-110"/>
            <span class="sr-only">{$t("nav.dashboard")}</span>
        </a>
    </nav>
    <nav class="flex flex-col items-center gap-4 px-2">
        <a
                href={'/updater'}
                class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
            <UploadCloud class="h-4 w-4 transition-all group-hover:scale-110"/>
            <span class="sr-only">{$t("nav.dashboard")}</span>
        </a>
    </nav>
    <!--		<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">-->
    <!--			<SettingDialog>-->
    <!--				<Button variant="link">-->
    <!--					<Settings class="h-5 w-5"/>-->
    <!--					<span class="sr-only">{$t("nav.setting")}</span>-->
    <!--				</Button>-->
    <!--			</SettingDialog>-->
    <!--		</nav>-->
</aside>
