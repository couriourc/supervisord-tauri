<script lang="ts">

	import {writable, type Writable} from "svelte/store";

	interface Props {
		checked: Writable<boolean>;
		someRowsSelected?: Writable<boolean>;
	}

	const {checked, someRowsSelected}: Props = $props();
	import {Checkbox} from "$lib/components/ui/checkbox";

</script>
<Checkbox class="border-gray-500 data-[state=checked]:border-primary" bind:checked={$checked}/>
