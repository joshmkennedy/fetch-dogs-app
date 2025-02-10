<script lang="ts">
	import { cn } from '$lib/utils';

	const { value = $bindable(), ...props } = $props();
	let className = props.class;
</script>

<input
	{...props}
	{value}
	class={cn(
		'rounded-md border-slate-300 p-2 focus:border-muted focus:outline-0 focus:ring-purple-800 focus:ring-offset-2 focus:ring-offset-background',
		className
	)}
/>
