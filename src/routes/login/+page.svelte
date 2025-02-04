<script lang="ts">
	import Login from '$lib/components/forms/login.svelte';
	let { error } = $props();
</script>

<div class="flex min-h-screen flex-col justify-center bg-gradient-to-tr to-purple-50 from-purple-200">
	<header class="text-center p-4 flex-col flex gap-4">
		<h1 class="font-bold pt-[5vh] text-5xl text-primary">Puppy Fetch</h1>
		<p class="text-lg">Fetching buddies one paw at a time</p>
	</header>
	<div class="mx-auto min-h-full w-full max-w-sm flex-1 pt-[10vh]">
		{#if error}
			<p>{error}</p>
		{/if}
		<Login />
	</div>
</div>
