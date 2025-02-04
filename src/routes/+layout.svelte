<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>
<div class="flex flex-col p-2 min-h-screen">
{@render children()}
</div>
