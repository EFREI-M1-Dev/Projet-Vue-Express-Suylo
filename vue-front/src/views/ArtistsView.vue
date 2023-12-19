<script setup>
import { artistsService } from '@/_services';
import { onBeforeMount, ref } from 'vue';
import ArtistItemComponent from '@/components/artists/ArtistItemComponent.vue';
import HeadContentComponent from '@/components/HeadContentComponent.vue';
import GalleryPopinComponent from '@/components/gallery/GalleryPopinComponent.vue';
import ArtistPopinComponent from '@/components/artists/ArtistPopinComponent.vue';

let artists = ref([]);
let artistsByLetter = ref({});

let artistSelected = ref(null);
let typePopin = ref('');

let showArtistPopin = ref(false);
let showArtistAddPopin = ref(false);
let showArtistEditPopin = ref(false);
let showArtistDeletePopin = ref(false);


const fetchData = async () => {
	artists.value = await artistsService.getArtists();

	artistsByLetter.value = artists.value.reduce((acc, artist) => {
		let letter = artist.lastName[0].toUpperCase();
		if (!acc[letter]) {
			acc[letter] = [];
		}
		acc[letter].push(artist);
		return acc;
	}, {});

	artistsByLetter.value = Object.keys(artistsByLetter.value).sort().reduce((acc, key) => {
		acc[key] = artistsByLetter.value[key];
		return acc;
	}, {});
};
const refreshArtworks = () => {
	fetchData();
};
onBeforeMount(fetchData);

const openPopinByType = (artist, type) => {
	switch (type) {
		case 'add':
			showArtistAddPopin.value = true;
			typePopin.value = type;
			break;
		case 'view':
			artistSelected.value = artist;
			showArtistPopin.value = true;
			typePopin.value = type;
			break;
		case 'edit':
			artistSelected.value = artist;
			showArtistEditPopin.value = true;
			typePopin.value = type;
			break;
		case 'delete':
			artistSelected.value = artist;
			showArtistDeletePopin.value = true;
			typePopin.value = type;
			break;
	}
};

const showTypePopin = (type) => {
	switch (type) {
		case 'add':
			return showArtistAddPopin.value;
		case 'view':
			return showArtistPopin.value;
		case 'edit':
			return showArtistEditPopin.value;
		case 'delete':
			return showArtistDeletePopin.value;
	}
};

const closePopin = () => {
	showArtistPopin.value = false;
	showArtistAddPopin.value = false;
	showArtistEditPopin.value = false;
	showArtistDeletePopin.value = false;
};

</script>

<template>
	<section class='artists'>
		<HeadContentComponent @click='openPopinByType(null, "add")'>
			<template v-slot:title>
				Les artistes
			</template>
			<template v-slot:text>
				Découvrez les artistes qui ont réalisé les œuvres de la galerie.
				<br>Classés par ordre alphabétique, vous pouvez
				accéder à leur biographie en cliquant sur leur nom.
			</template>
			<template v-slot:button>
				Ajouter un artiste
			</template>
		</HeadContentComponent>

		<div class='artists__content'>
			<ArtistItemComponent v-for='(artists, letter) in artistsByLetter'
													 :key='letter'
													 :artists='artists'
													 :letter='letter' />
		</div>

		<transition>
			<ArtistPopinComponent v-if='showTypePopin(typePopin)'
														:type='typePopin'
														:artist='artistSelected'
														@close='closePopin'
														@refresh='refreshArtworks'
			/>
		</transition>
	</section>
</template>

<style scoped lang='scss'>
.artists {
	padding: 5rem 0;

	&__content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 2rem;
		padding: 2rem;
		animation: fade .2s ease-in-out;
		min-height: 450px;
		margin-top: 4rem;
	}
}
</style>