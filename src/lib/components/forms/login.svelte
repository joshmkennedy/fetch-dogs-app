<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	//	action="https://frontend-take-home-service.fetch.com/auth/login"

</script>

<form
	class="flex flex-col gap-4 w-full p-4 py-8 rounded-lg shadow-md min-w-full"
	 action="/login" 
	method="POST"
>
	<h2 class="font-bold">Login to get started</h2>
	<div class="flex flex-col gap-1 w-full">
		<label for="name">Name</label>
		<input type="name" name="name" id="name" />
	</div>
	<div class="flex flex-col gap-1 w-full">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
	</div>
	<div class="">
		<Button type="submit">Login</Button>
	</div>
</form>
