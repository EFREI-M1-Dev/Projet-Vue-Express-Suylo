<script setup>
import IconQuoteLeftSvg from '@/components/icons/IconQuoteLeftSvg.vue';
import IconQuoteRightSvg from '@/components/icons/IconQuoteRightSvg.vue';

const props = defineProps({
	art: {},
});

</script>

<template>
	<img class='popin__content__img' :src='"/arts/img/"+ art?.image' :alt='art?.title' />
	<div class='popin__content__text'>
		<h1 class='title'>
			<span class='small'>Nom de l'œuvre :</span>
			<br>
			{{ art?.name }}
		</h1>
		<p v-if='art?.artist' class='artist'>
			<span class='small'>
				Artiste :
			</span>
			<br>
			<strong>{{ art?.artist?.firstName }} {{ art?.artist?.lastName }}</strong>
		</p>
		<p v-if='art?.description' class='description'>
			<span class='small'>
				Description :
			</span>
			<br>
			<span class='svg'>
				<IconQuoteLeftSvg />
			</span>
			{{ art?.description }}
			<span class='svg'>
				<IconQuoteRightSvg />
			</span>
		</p>
		<p v-if='art?.price' class='price'>
			<span class='small'>
				Prix estimé :
			</span>
			<br>
			{{ art?.price }}&nbsp;€
		</p>
	</div>
</template>

<style scoped lang='scss'>

</style>