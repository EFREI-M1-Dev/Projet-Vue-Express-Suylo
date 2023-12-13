<script setup>
import { ref } from 'vue';
import IconTrashSvg from '@/components/icons/IconTrashSvg.vue';
import { artworksService } from '@/_services';

const props = defineProps({
	art: {},
});

let imgUrl = ref(import.meta.env.VITE_API_BASE_URL + '/images/');

// input
let title = ref(props.art.name);

// emits
const emit = defineEmits(['close', 'refresh', 'notif']);
const closePopin = () => { emit('close'); };
const refreshArtworksList = () => { emit('refresh'); };
const showNotification = async () => { 	emit('notif') };

const submitDeleteArtwork = async () => {
	let btnSubmit = document.querySelector('.popin__content__btn.btn');
	btnSubmit.classList.add('--loading', '--red');

	const response = await artworksService.deleteArtwork(props.art.id);
	if (response === 200){
		setTimeout(() => {
			closePopin();
			refreshArtworksList();
			btnSubmit.classList.remove('--loading', '--red');
		}, 1000);
		await showNotification();
	}
};
</script>

<template>
	<form class='popin__content__layout' @submit.prevent='submitDeleteArtwork'>
		<div class='popin__content__block-img'>
			<img class='popin__content__img' :src='imgUrl + art?.image' :alt='art?.name' />
		</div>
		<div class='popin__content__text'>
			<h2 class='title'>
				Suppression d'une oeuvre
			</h2>
			<p class='title'>
				<span class='small'>
					Titre de l'œuvre qui va être supprimée :
				</span>
				<br>
				{{ art?.name }}
			</p>

			<p class='required__delete'>
				Êtes-vous sûr de vouloir supprimer cette oeuvre ?
				<br>
				Cette action est irréversible.
			</p>

			<button class='popin__content__btn btn btn-red' type='submit'>
				Supprimer
				<IconTrashSvg />
			</button>
		</div>
	</form>

</template>

<style scoped lang='scss'>
.popin__content {

	&__text {
		display: flex;
		flex-direction: column;

		.required {
			&__delete{
				font-size: 1.8rem;
				color: $red;
				margin-top: 1rem;
				font-family: $opensans;
				font-weight: 700;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				gap: 1rem;
			}
		}

	}

	&__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: auto;
		width: 100%;
	}

	&__block-img {
		box-sizing: border-box;
		position: relative;
		z-index: 0;
		border: 2rem solid $white;
		transition: all .2s ease-in-out;
	}

	&__img {
		padding: 0;
		position: relative;
		z-index: 2;
	}
}

</style>