<script lang="ts">
	import '../app.css';
	let { children } = $props();

</script>

<div class="flex min-h-screen flex-col">
	{@render children()}
</div>
