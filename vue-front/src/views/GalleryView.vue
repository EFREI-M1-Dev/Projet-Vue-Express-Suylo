<script setup>
import { artworksService } from '@/_services';
import { onBeforeMount, ref } from 'vue';
import PopinArtworkComponent from '@/components/PopinArtworkComponent.vue';
import IconPlusSvg from '@/components/icons/IconPlusSvg.vue';
import GalleryItemComponent from '@/components/gallery/GalleryItemComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';
import IconSuccessSvg from '@/components/icons/IconSuccessSvg.vue';

let artworks = ref([]);
let artSelected = ref(null);
let showArtworkPopin = ref(false);
let showArtworkAddPopin = ref(false);
let success = ref(false);

const fetchData = async () => {
	artworks.value = await artworksService.getArtworks();
};

const refreshArtworks = () => {
	fetchData();
};

const openPopinView = (artwork) => {
	artSelected.value = artwork;
	showArtworkPopin.value = !showArtworkPopin.value;
};

const openPopinAdd = () => {
	showArtworkAddPopin.value = !showArtworkAddPopin.value;
};

const closePopin = () => {
	showArtworkPopin.value = false;
	showArtworkAddPopin.value = false;
};

const showNotification = async () => {
	success.value = true;
	await timeout(4000);
	success.value = false;
};

const timeout = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

onBeforeMount(fetchData);
</script>

<template>
	<section class='gallery'>
		<div class='gallery__head'>
			<h1>La galerie</h1>
			<p>
				La galerie d'art est un lieu d'exposition d'œuvres d'art. Elle peut être publique ou privée, appartenir à un
				État,
				à une collectivité locale, à une entreprise ou à un particulier. Elle peut être spécialisée dans un domaine
				artistique particulier (peinture, sculpture, photographie, etc.) ou présenter des œuvres de tous types.
			</p>
			<button class='btn btn-reverse' @click='openPopinAdd'>
				Ajouter une œuvre
				<IconPlusSvg />
			</button>
		</div>

		<div class='gallery__content'>
			<GalleryItemComponent v-for='artwork in artworks' :artwork='artwork' @openPopin='openPopinView(artwork)'/>
		</div>

		<transition>
			<PopinArtworkComponent :type='"view"' :art='artSelected' v-if='showArtworkPopin' @close='closePopin' />
		</transition>
		<transition>
			<PopinArtworkComponent :type='"add"' v-if='showArtworkAddPopin' @close='closePopin' @refresh='refreshArtworks' @add='showNotification' />
		</transition>

		<transition name='slide-from-right'>
			<NotificationComponent :type='"success"' v-if='success'>
				<template v-slot:icon>
					<IconSuccessSvg :color='"white"'/>
				</template>
				La nouvelle œuvre a bien été ajoutée !
			</NotificationComponent>
		</transition>
	</section>
</template>

<style lang='scss'>
.gallery {
	padding: 5rem 0;

	&__head {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		h1 {
			font-family: $jakarta;
			font-size: 4rem;
			text-transform: uppercase;
			font-weight: 600;
			color: $blue;
			text-align: center;
			margin-bottom: 3rem;
			animation: fadeLeft .2s ease-in-out;
		}

		& > p {
			font-family: $opensans;
			font-size: 2rem;
			font-weight: 400;
			text-align: center;
			max-width: 80%;
			margin: 0rem auto;
			animation: fadeRight .2s ease-in-out;
		}

		.btn {
			margin-top: 3rem;
			display: flex;
			align-items: center;
			animation: fadeRight .2s ease-in-out;
			margin-bottom: 0;


		}
	}

	&__content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(400px, 1fr));
		grid-gap: 2rem;
		padding: 2rem;
		animation: fade .2s ease-in-out;
		min-height: 700px;
		margin-top: 4rem;
	}

}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.slide-from-right-enter-active,
.slide-from-right-leave-active {
	transition: all .1s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-from-right-enter-from,
.slide-from-right-leave-to {
	transform: translateX(100%);
}

.slide-from-right-enter-to,
.slide-from-right-leave-from {
	transform: translateX(0);
}



</style>