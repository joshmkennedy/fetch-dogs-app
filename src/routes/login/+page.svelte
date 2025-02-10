<script lang="ts">
	import Login from '$lib/components/forms/login.svelte';
	let { error } = $props();
</script>

<div
	class="flex min-h-screen flex-col justify-center bg-gradient-to-tr from-purple-200 to-purple-50"
>
	<header class="flex flex-col gap-4 p-4 text-center">
		<h1 class="pt-[5vh] text-5xl font-bold text-primary">Puppy Fetch</h1>
		<p class="text-lg">Fetching buddies one paw at a time</p>
	</header>
	<div class="mx-auto min-h-full w-full max-w-sm flex-1 pt-[10vh]">
		{#if error}
			<p>{error}</p>
		{/if}
		<Login />
	</div>
</div>
