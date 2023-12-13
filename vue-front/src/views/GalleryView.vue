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

// Popins states
let showArtworkPopin = ref(false);
let showArtworkAddPopin = ref(false);
let showArtworkEditPopin = ref(false);
let showArtworkDeletePopin = ref(false);

// Notification states
let success = ref(false);
let msgSuccess = ref('');

const fetchData = async () => {
	artworks.value = await artworksService.getArtworks();
};

const refreshArtworks = () => {
	fetchData();
};

const openPopinAdd = () => {
	showArtworkAddPopin.value = !showArtworkAddPopin.value;
};
const openPopinView = (artwork) => {
	artSelected.value = artwork;
	showArtworkPopin.value = !showArtworkPopin.value;
};
const openPopinEdit = (artwork) => {
	artSelected.value = artwork;
	showArtworkEditPopin.value = !showArtworkEditPopin.value;
};
const openPopinDelete = (artwork) => {
	artSelected.value = artwork;
	showArtworkDeletePopin.value = !showArtworkDeletePopin.value;
};

const closePopin = () => {
	showArtworkPopin.value = false;
	showArtworkAddPopin.value = false;
	showArtworkEditPopin.value = false;
	showArtworkDeletePopin.value = false;
};

const showNotification = async (type) => {
	if (type === 'add') {
		msgSuccess.value = 'L\'œuvre a bien été ajoutée.';
	} else if (type === 'edit') {
		msgSuccess.value = 'L\'œuvre a bien été modifiée.';
	} else if (type === 'delete') {
		msgSuccess.value = 'L\'œuvre a bien été supprimée.';
	}
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
			<GalleryItemComponent v-for='artwork in artworks'
														:artwork='artwork'
														@openPopin='openPopinView(artwork)' @openPopinEdit='openPopinEdit(artwork)' @openPopinDelete='openPopinDelete(artwork)'
			/>
		</div>

		<transition-group>
			<PopinArtworkComponent :type='"add"' v-if='showArtworkAddPopin'
														 @close='closePopin' @refresh='refreshArtworks' @notif='showNotification("add")'
			/>
			<PopinArtworkComponent :type='"view"' v-if='showArtworkPopin' :art='artSelected'
														 @close='closePopin'
			/>
			<PopinArtworkComponent :type='"edit"' v-if='showArtworkEditPopin' :art='artSelected'
														 @close='closePopin' @refresh='refreshArtworks' @notif='showNotification("edit")'
			/>
			<PopinArtworkComponent :type='"delete"' v-if='showArtworkDeletePopin' :art='artSelected'
														 @close='closePopin' @refresh='refreshArtworks' @notif='showNotification("delete")'
			/>
		</transition-group>

		<transition name='slide-from-right'>
			<NotificationComponent :type='"success"' v-if='success'>
				<template v-slot:icon>
					<IconSuccessSvg :color='"white"' />
				</template>
				{{ msgSuccess }}
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

</style>