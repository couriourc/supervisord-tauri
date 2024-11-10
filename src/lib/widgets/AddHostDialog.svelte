<script lang="ts">
	import {
		Button,
		buttonVariants
	} from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import {Input} from "$lib/components/ui/input";
	import {Label} from "$lib/components/ui/label";
	import {Host, HostsManager, hostsManager, useHostsManager} from "$lib/store/hosts.model";
	import {useForm, Hint, validators, required} from "svelte-use-form";
	import {t} from "$i18n/index";
	import toast from 'svelte-french-toast';
	import {getContext} from "svelte";

	const {refresh: refreshList,} = getContext<ReturnType<typeof useHostsManager>>(HostsManager.ContextKey);
	export let host: Host = new Host({
		endpoint: ""
	});
	export let isEdit: boolean = false;

	const form = useForm({
		name: {
			initial: host.name
		},
		endpoint: {
			initial: host.endpoint
		},
		username: {
			initial: host.username
		},
		password: {
			initial: host.password
		},
	});


	async function handleAddNewHost() {
		if (isEdit) {
			await hostsManager.Replace(new Host({...host, ...$form.values}));
			toast.success('Host edited successfully');
		} else {
			await hostsManager.Create(new Host({...$form.values}));
			toast.success('Host added successfully');
		}
		await refreshList();

	}

</script>

<Dialog.Root>
	<Dialog.Trigger>
		<slot></slot>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>
				{$t(isEdit ? "hosts.edit_host" : "hosts.add_new_host")}
			</Dialog.Title>
			<Dialog.Description>
				{$t("hosts.add_new_host.description")}
			</Dialog.Description>
		</Dialog.Header>
		<form class="grid gap-4 py-4" use:form>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">{$t("hosts.add_new_host.name")}*</Label>
				<Input id="name" name="name" class="col-span-3" placeholder="host-1"/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="endpoint" class="text-right">{$t("hosts.add_new_host.endpoint")}*</Label>
				<Input name="endpoint" id="endpoint" placeholder="http://localhost:9001/" class="col-span-3"/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">{$t("hosts.add_new_host.username")}</Label>
				<Input name="username" id="username" placeholder="（可选）" class="col-span-3"/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="password" class="text-right">{$t("hosts.add_new_host.password")}</Label>
				<Input name="password" id="password" placeholder="（可选）" class="col-span-3"/>
			</div>
		</form>
		<Dialog.Footer>
			<Button type="submit" disabled={!$form.valid}
			        on:click={()=>handleAddNewHost()}>{
					$t(!isEdit ? "hosts.submit_new_host" : "hosts.submit_edited_host")}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
