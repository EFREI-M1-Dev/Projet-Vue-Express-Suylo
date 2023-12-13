<script setup>
import { ref } from 'vue';

let imgUrl = ref(import.meta.env.VITE_API_BASE_URL + '/images/');

const props = defineProps({
	artwork: {},
});

const emit = defineEmits(['openPopin']);

const openPopinView = (artwork) => {
	emit('openPopin', artwork);
};
</script>

<template>
	<div class='gallery__item'>
		<img class='gallery__item__img' :src='imgUrl + artwork.image' :alt='artwork.title' />
		<div class='gallery__item__text'>
			<p class='desc'>
				Titre de l'œuvre :
			</p>
			<h2 class='name'>
				{{ artwork.name }}
			</h2>
			<button class='btn' @click='openPopinView(artwork)'>
				En savoir plus
			</button>
		</div>
	</div>

</template>

<style scoped lang='scss'>
.gallery__item {
	$and: &;
	position: relative;
	overflow: hidden;

	&__text {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		visibility: hidden;
		transition: all .3s ease-in-out;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-family: $jakarta;
		padding: 2rem;
		background-color: $blue;
		box-sizing: border-box;

		.name {
			font-size: 2rem;
			font-weight: 600;
			color: $white;
			margin-bottom: 1rem;
			line-height: 1.5;
		}

		.desc {
			font-size: 1.5rem;
			font-weight: 400;
			color: $white;
			margin-bottom: 1rem;
		}

		.price {
			font-size: 1.5rem;
			font-weight: 600;
			color: $white;

		}

		p, h2, button {
			transition: all .2s ease-in-out;
			transform: translateY(2rem);
		}
	}

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&:hover {
		#{$and}__text {
			opacity: 1;
			visibility: visible;
			color: $white;

			p, h2, button {
				transform: translateY(0);
			}
		}
	}
}
</style>