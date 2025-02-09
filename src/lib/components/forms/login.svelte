<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";

</script>

<form
	class="flex flex-col gap-4 w-full p-4 py-6 rounded-lg shadow-md shadow-purple-200 min-w-full bg-white border-t-purple-900  border-t-8"
	 action="/login" 
	method="POST"
>
	<h2 class="font-bold text-center text-purple-800">Login to get started</h2>
	<div class="flex flex-col gap-1 w-full">
		<label for="name">Name</label>
		<Input type="text" name="name" id="name" class="bg-purple-50"/>
	</div>
	<div class="flex flex-col gap-1 w-full">
		<label for="email">Email</label>
		<Input type="email" name="email" id="email" class="bg-purple-50" />
	</div>
	<div class="">
		<Button type="submit">Login</Button>
	</div>
</form>
