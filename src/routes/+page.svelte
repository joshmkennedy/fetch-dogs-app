<script lang="ts">
	import SearchForm from '$lib/components/forms/search-form.svelte';
	import type { PageData } from './+page.server';
	let {data} = $props();
	let {breeds, searchData} = data
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<SearchForm {breeds}/>
<pre>

	<code>
		{JSON.stringify(breeds, null, 2)}
	</code>

</pre>
