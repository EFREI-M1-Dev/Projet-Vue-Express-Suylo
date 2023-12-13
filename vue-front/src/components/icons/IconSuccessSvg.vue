<script setup>
const props = defineProps({
	color: String,
})
</script>

<template>
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_105_2883)">
			<path d="M9.00039 16.2L4.80039 12L3.40039 13.4L9.00039 19L21.0004 7.00001L19.6004 5.60001L9.00039 16.2Z" :fill='color ? color : "black"'/>
		</g>
		<defs>
			<clipPath id="clip0_105_2883">
				<rect width="24" height="24" fill="white"/>
			</clipPath>
		</defs>
	</svg>
</template>

<style scoped lang='scss'>

</style>