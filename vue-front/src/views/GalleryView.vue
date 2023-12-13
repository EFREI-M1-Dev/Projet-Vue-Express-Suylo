<script setup>
import { artistsService, artworksService } from '@/_services';
import { onBeforeMount, ref } from 'vue';
import PopinArtworkComponent from '@/components/PopinArtworkComponent.vue';

let artworks = ref([]);
let artSelected = ref(null);
let showArtworkPopin = ref(false);
let showArtworkAddPopin = ref(false);

const fetchData = async () => {
	artworks.value = await artworksService.getArtworks();
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
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
							d='M12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12.75V17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H11.25V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6Z'
							fill='white' />
				</svg>
			</button>
		</div>

		<div class='gallery__content'>
			<div class='gallery__item' v-for='artwork in artworks' :key='artwork.id'>
				<img class='gallery__item__img' :src='"/arts/img/"+ artwork.image' :alt='artwork.title' />
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
		</div>

		<transition>
			<PopinArtworkComponent :type='"view"' :art='artSelected' v-if='showArtworkPopin' @close='closePopin' />
		</transition>
		<transition>
			<PopinArtworkComponent :type='"add"' v-if='showArtworkAddPopin' @close='closePopin' />
		</transition>
	</section>
</template>

<style scoped lang='scss'>
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

			svg {
				margin-left: 1rem;
				margin-right: -1rem;

				path {
					transition: all .2s ease-in-out;
				}
			}

			&:hover {
				svg path {
					fill: $blue;
				}
			}
		}
	}

	&__content {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		padding: 2rem;
		animation: fade .2s ease-in-out;
		min-height: 700px;
		margin-top: 4rem;
	}

	&__item {
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
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

</style>