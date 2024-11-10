<script lang="ts">
	import {
		Button,
		buttonVariants
	} from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import {Input} from "$lib/components/ui/input";
	import {Label} from "$lib/components/ui/label";
	import {Host, hostsManager, useHostsManager} from "$lib/store/hosts.model";
	import {useForm, Hint, validators, required} from "svelte-use-form";
	import {noop} from "underscore";
	import toast, {Toaster} from 'svelte-french-toast';
	import {getContext} from "svelte";

	const {refresh: refreshList,} = getContext<ReturnType<typeof useHostsManager>>("hostsManager");


	const form = useForm({
		name: {},
		endpoint: {},
	});

	async function handleAddNewHost() {
		await hostsManager.Create(new Host({...$form.values}));
		await refreshList();
		toast.success('Host added successfully');
	}

</script>

<Dialog.Root>
	<Dialog.Trigger>
		<slot></slot>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>New Host</Dialog.Title>
			<Dialog.Description>
				add new host for your projects
			</Dialog.Description>
		</Dialog.Header>
		<form class="grid gap-4 py-4" use:form>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" name="name" class="col-span-3"/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="endpoint" class="text-right">EndpointUrl</Label>
				<Input name="endpoint" id="endpoint" class="col-span-3"/>
			</div>
		</form>
		<Dialog.Footer>
			<Button type="submit" disabled={!$form.valid} on:click={()=>handleAddNewHost()}>Submit
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
