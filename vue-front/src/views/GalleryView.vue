<script setup>
import { artworksService } from '@/_services';
import { onBeforeMount, ref } from 'vue';
import ModalComponent from '@/components/PopinComponent.vue';
import PopinComponent from '@/components/PopinComponent.vue';

let artworks = ref([]);

const fetchData = async () => {
	artworks.value = await artworksService.getArtworks();
}

const togglePopin = (artwork) => {
}

onBeforeMount(fetchData);
</script>

<template>
	<section class='gallery'>
		<h1>La galerie</h1>
		<p>
			La galerie d'art est un lieu d'exposition d'œuvres d'art. Elle peut être publique ou privée, appartenir à un État, à une collectivité locale, à une entreprise ou à un particulier. Elle peut être spécialisée dans un domaine artistique particulier (peinture, sculpture, photographie, etc.) ou présenter des œuvres de tous types.
		</p>

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
					<button class='btn' @click='togglePopin(artwork)'>
						En savoir plus
					</button>
					<!--<p class='desc'>{{ artwork.description }}</p>-->
					<!--<p class='price'>{{ artwork.price }} €</p>-->
				</div>
			</div>
		</div>

		<PopinComponent/>
	</section>
</template>

<style scoped lang='scss'>
.gallery{
	padding: 5rem 0;
	h1{
		font-family: $jakarta;
		font-size: 4rem;
		text-transform: uppercase;
		font-weight: 600;
		color: $blue;
		text-align: center;
		margin-bottom: 3rem;
		animation: fadeLeft .2s ease-in-out;
	}
	& > p{
		font-family: $opensans;
		font-size: 2rem;
		font-weight: 400;
		text-align: center;
		max-width: 80%;
		margin: 3rem auto;
		animation: fadeRight .2s ease-in-out;
	}

	&__content{
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		padding: 2rem;
		animation: fade .2s ease-in-out;
	}

	&__item{
		$and: &;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		&__text{
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

			.name{
				font-size: 2rem;
				font-weight: 600;
				color: $white;
				margin-bottom: 1rem;
				line-height: 1.5;
			}

			.desc{
				font-size: 1.5rem;
				font-weight: 400;
				color: $white;
				margin-bottom: 1rem;
			}

			.price{
				font-size: 1.5rem;
				font-weight: 600;
				color: $white;

			}
		}
		&__img{
			width: 100%;
			height: 100%;
		}

		&:hover{
			#{$and}__text{
				opacity: 1;
				visibility: visible;
				color: $white;
			}
		}
	}

}
</style>