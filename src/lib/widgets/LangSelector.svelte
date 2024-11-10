<script lang="ts">
	import * as Select from "$lib/components/ui/select/index";
	import {locales, locale, t, loading} from "$i18n/index";
	import {getContext} from "svelte";
	import {SettingsModel} from "$lib/store/settings.model";

	const settings = getContext<SettingsModel>(SettingsModel.Namespace);

	function handleUpdateSelected({value}: { value: string }) {
		$locale = value;
		settings.setLocale(value);
	}
</script>
<Select.Root highlightOnHover
             onSelectedChange={handleUpdateSelected}
>
	<Select.Trigger
			class="w-[180px]">
		<Select.Value placeholder={$t(`lang.${$locale}`)}/>
	</Select.Trigger>
	<Select.Content>
		{#each $locales as locale}
			<Select.Item value={locale}>{$t(`lang.${locale}`)}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
