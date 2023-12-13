<script setup>

import { onBeforeMount, ref } from 'vue';
import { artistsService, artworksService } from '@/_services';
import IconWarningSvg from '@/components/icons/IconWarningSvg.vue';
import IconPencilSvg from '@/components/icons/IconPencilSvg.vue';

const props = defineProps({
	art: Object,
});

let artists = ref([]);
let imgUrl = ref(import.meta.env.VITE_API_BASE_URL + '/images/');

// inputs
let title = ref(props.art.name);
let artist = ref(props.art.artistId);
let description = ref(props.art.description);
let price = ref(props.art.price);
let image = ref(props.art.image);

// Ref submit
let errors = ref();

const fetchArtistsData = async () => {
	artists.value = await artistsService.getArtists();
};

onBeforeMount(fetchArtistsData);

// emits
const emit = defineEmits(['close', 'refresh', 'edit']);
const closePopin = () => { emit('close'); };
const refreshArtworksList = () => { emit('refresh'); };
const showNotification = async () => { 	emit('edit') };


const submitUpdateArtwork = async () => {

	if (!title.value || !artist.value || !description.value) {
		errors.value = 'Le titre, l\'artiste et la description sont obligatoires.';
		return;
	}

	if (title.value.length < 3) {
		errors.value = 'Le titre doit contenir au moins 3 caractères.';
		return;
	}

	if (description.value.length < 3) {
		errors.value = 'La description doit contenir au moins 3 caractères.';
		return;
	}

	if (price.value && isNaN(parseInt(price.value))) {
		errors.value = 'Le prix doit être un nombre.';
		return;
	}

	if (!image.value) {
		errors.value = 'L\'image ne peut pas être vide.';
		return;
	}

	const updateArtwork = {
		id: props.art.id,
		name: title.value,
		description: description.value,
		price: parseInt(price.value),
		image: image.value,
		artistId: artist.value,
	};

	try{
		let btnSubmit = document.querySelector('.popin__content__btn.btn');
		btnSubmit.classList.add('--loading');
		const updateCall = await artworksService.updateArtwork(updateArtwork.id, updateArtwork);

		if (updateCall === 200){
			setTimeout(() => {
				btnSubmit.classList.remove('--loading');
				closePopin();
				refreshArtworksList();
			}, 1000);
			await showNotification();
		} else {
			errors.value = 'Une erreur est survenue lors de la mise à jour de l\'oeuvre.';
		}
	} catch (error) {
		console.log(error);
	}
};

</script>

<template>
	<form class='popin__content__layout' @submit.prevent='submitUpdateArtwork'>
		<div class='popin__content__block-img'>
			<img class='popin__content__img' :src='imgUrl + art?.image' :alt='art?.name' />
		</div>
		<div class='popin__content__text'>
			<h2 class='title'>
				Modifier une oeuvre
			</h2>
			<p class='title small'>
				* Titre :
				<input type='text' v-model='title' placeholder="Le titre de l'oeuvre" class='input' name='title' required>
			</p>
			<p class='artist small'>
				* Artiste :
				<select v-model='artist' class='input' name='artist' required>
					<option v-for='artist in artists' :key='artist.id' :value='artist.id'>
						{{ artist.firstName }}&nbsp;{{ artist.lastName }}
					</option>
				</select>
			</p>
			<p class='description small'>
				* Description :
				<input type='text' v-model='description' placeholder='Sa description' class='input' name='desc' required>
			</p>
			<p class='price small'>
				Prix estimé :
				<input type='number' v-model='price' placeholder='Son prix en €' class='input' name='price'>
			</p>
			<div class='required'>
				* Champs obligatoires

				<p class='required__errors' v-if='errors'>
					<IconWarningSvg />
					{{ errors }}
				</p>
			</div>

			<button class='popin__content__btn btn btn-reverse' type='submit'>
				Modifier
				<IconPencilSvg />
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
			font-size: 1.4rem;
			color: #515151;
			margin-top: 1rem;
			font-family: $opensans;
			font-weight: 500;

			&__errors{
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1rem;
				color: $red;
				font-size: 1.6rem;
				margin-top: 2rem;
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