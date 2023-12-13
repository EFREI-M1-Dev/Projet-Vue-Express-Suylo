<script setup>
import { ref } from 'vue';
import IconTrashSvg from '@/components/icons/IconTrashSvg.vue';
import IconPencilSvg from '@/components/icons/IconPencilSvg.vue';

let imgUrl = ref(import.meta.env.VITE_API_BASE_URL + '/images/');

const props = defineProps({
	artwork: {},
});

const emit = defineEmits(['openPopin', 'openPopinEdit', 'openPopinDelete']);

const openPopinView = (artwork) => { 	emit('openPopin', artwork); };
const openPopinEdit = (artwork) => { 	emit('openPopinEdit', artwork); };
const openPopinDelete = (artwork) => { 	emit('openPopinDelete', artwork); };
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
			<div class='gallery__item__buttons'>
				<button class='btn btn-orange' @click='openPopinEdit(artwork)'>
					<IconPencilSvg />
					Modifier
				</button>
				<button class='btn btn-red' @click='openPopinDelete(artwork)'>
					<IconTrashSvg />
					Supprimer
				</button>
			</div>

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

		.btn{
			display: flex;
			align-items: center;
			gap: 2rem;

			svg{
				margin-left: -.5rem;
			}
		}
	}

	&__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&__buttons{
		display: flex;
		gap: 2rem;
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