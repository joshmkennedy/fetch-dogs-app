<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
</script>

<form
	class="flex w-full min-w-full flex-col gap-4 rounded-lg border-t-8 border-t-purple-900 bg-white p-4 py-6 shadow-md shadow-purple-200"
	action="/login"
	method="POST"
>
	<h2 class="text-center font-bold text-purple-800">Login to get started</h2>
	<div class="flex w-full flex-col gap-1">
		<label for="name">Name</label>
		<Input type="text" name="name" id="name" class="bg-purple-50" />
	</div>
	<div class="flex w-full flex-col gap-1">
		<label for="email">Email</label>
		<Input type="email" name="email" id="email" class="bg-purple-50" />
	</div>
	<div class="">
		<Button type="submit">Login</Button>
	</div>
</form>
