<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import {Input} from "$lib/components/ui/input";
	import {Label} from "$lib/components/ui/label";
	import {Button} from "$lib/components/ui/button";
</script>
<Dialog.Root>
	<Dialog.Trigger>
		<slot></slot>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[625px]">
		<Dialog.Header>
			<Dialog.Title>Settings</Dialog.Title>
			<Dialog.Description>
				change the setting?
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
