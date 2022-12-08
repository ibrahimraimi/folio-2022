<script lang="ts">
	export let rel = 'nofollow noopener noreferrer';
	export let target = '_blank';
	export let href: string;
	export let ariaLabel: string;
	export let classes = 'italic text-red-600 hover:opacity-80';
</script>

<a class={classes} aria-label={ariaLabel} {href} {rel} {target}><slot /></a>
