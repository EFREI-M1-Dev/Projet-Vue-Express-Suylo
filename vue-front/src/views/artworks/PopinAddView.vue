<script setup>

import { onBeforeMount, ref } from 'vue';
import { artistsService, artworksService } from '@/_services';
import IconCloseSvg from '@/components/icons/IconCloseSvg.vue';
import IconSaveSvg from '@/components/icons/IconSaveSvg.vue';
import IconWarningSvg from '@/components/icons/IconWarningSvg.vue';

const emit = defineEmits(['close']);

let artists = ref([]);

// inputs
let title = ref('');
let artist = ref('');
let description = ref('');
let price = ref('');
let image = ref('');

let errors = ref();

const fetchArtistsData = async () => {
	artists.value = await artistsService.getArtists();
};

onBeforeMount(fetchArtistsData);

const onPictureChange = (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.readAsDataURL(file);
	reader.onload = () => {
		image.value = reader.result;
	};
};

const removePictureView = () => {
	image.value = '';
};

const closePopin = () => {
	emit('close');
};


const submitNewArtwork = async () => {
	let imgName = 'img-' + title.value.replace(/\s/g, '-').toLowerCase() + '-' + Date.now() + '.png';

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

	const newArtwork = {
		name: title.value,
		description: description.value,
		price: parseInt(price.value),
		image: imgName,
		artistId: artist.value,
	};

	try{
		let btnSubmit = document.querySelector('.popin__content__btn.btn');
		btnSubmit.classList.add('--loading');
		const firstCall = await artworksService.newArtwork(newArtwork);

		if (firstCall === 200){
			const sndCall = await artworksService.uploadArtworkImage(image.value, imgName);

			if (sndCall === 200){
				setTimeout(() => {
					btnSubmit.classList.remove('--loading');
					closePopin();
				}, 1000);
			} else {
				errors.value = 'Une erreur est survenue lors de l\'upload de l\'image.';
			}
		} else {
			errors.value = 'Une erreur est survenue lors de la création de l\'oeuvre.';
		}
	} catch (error) {
		console.log(error);
	}
};

</script>

<template>
	<form @submit.prevent='submitNewArtwork' class='popin__content__layout'>
		<div class='popin__content__block-img'>
			<input id='upPicture' type='file' @change='onPictureChange' hidden='hidden'/>
			<label for='upPicture' class='label'>
				<img class='popin__content__img' :src='image' v-if='image' />
			</label>
			<div class='picture__remove' @click='removePictureView' v-if='image' title="Supprimer l'image">
				<IconCloseSvg />
			</div>
		</div>
		<div class='popin__content__text'>
			<h2 class='title'>
				Ajouter une nouvelle œuvre
			</h2>
			<p class='title small'>
				* Titre :
				<input type='text' v-model='title' placeholder="Le titre de l'oeuvre" class='input' name='title' required>
			</p>
			<p class='artist small'>
				* Artiste :
				<select v-model='artist' class='input' name='artist' required>
					<option value='' selected disabled hidden>Choisir un artiste</option>
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
				Sauvegarder
				<IconSaveSvg />
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

	.label {
		height: 100%;
		width: 100%;
		min-height: 626px;
		display: flex;
		cursor: pointer;

		&::before {
			content: "Modifier l'image";
			transition: all .2s ease-in-out;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			color: $white;
			font-family: $jakarta;
			font-size: 2rem;
			font-weight: 600;
			text-transform: uppercase;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0;
		}

		&:has(img) {
			&:hover {
				&:before {
					opacity: 1;
					content: "Modifier l'image";
					pointer-events: none;
					transition: all .2s ease-in-out;
					background-color: rgba($blue, .5);
					z-index: 3;
				}
			}
		}
	}

	.picture__remove {
		position: absolute;
		top: 0rem;
		right: 0rem;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		z-index: 5;
		transition: all .2s ease-in-out;

		&:hover {
			background-color: rgba($red, .5);
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
		background-color: rgba($blue, .7);

		position: relative;
		z-index: 0;
		border: 2rem solid $white;
		transition: all .2s ease-in-out;

		&:before {
			content: 'Ajouter une image';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			pointer-events: none;
			transition: all .2s ease-in-out;
			font-family: $jakarta;
			text-transform: uppercase;
			font-size: 2rem;
			font-weight: 600;
			color: $white;
			z-index: 1;
		}

		&:hover {

			&::before {
				transform: scale(1.1);
			}
		}
	}

	&__img {
		padding: 0;
		position: relative;
		z-index: 2;
	}
}

</style>