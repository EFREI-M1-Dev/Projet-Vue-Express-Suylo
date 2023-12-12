<script setup>
import { artistsService } from '@/_services';
import { onBeforeMount, ref } from 'vue';

let artists = ref([]);
let artistsByLetter = ref({});

const fetchData = async () => {
	/**
	 * @typedef {Object} Artist
	 * @property {number} id
	 * @property {string} firstName
	 * @property {string} lastName
	 * @property {string} description
	 */

	/** @type {Artist[]} */
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

onBeforeMount(fetchData);
</script>

<template>
	<section class='artists'>
		<div class='artists__head'>
			<h1>Les artistes</h1>
			<p>
				Découvrez les artistes qui ont réalisé les œuvres de la galerie.
				<br>Classés par ordre alphabétique, vous pouvez
				accéder à leur biographie en cliquant sur leur nom.
			</p>
			<button class='btn btn-reverse'>
				Ajouter un artiste
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
							d='M12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12.75V17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H11.25V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6Z'
							fill='white' />
				</svg>
			</button>
		</div>


		<div class='artists__content'>
			<div class='artists__byletter' v-for='(artists, letter) in artistsByLetter' :key='letter'>
				<h2 class='artists__letter'>{{ letter }}</h2>
				<ul class='artists__items'>
					<li class='artists__items__item' v-for='artist in artists' :key='artist.id'>
						<span>
							{{ artist.firstName }} {{ artist.lastName }}
						</span>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style scoped lang='scss'>
.artists {
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

	&__letter {
		font-family: $jakarta;
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 2rem;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 2px;
			background-color: $blue;
			margin-top: 1rem;
		}
	}

	&__byletter {
		min-height: 300px;
		background-color: $white;
		border: 2px solid $black;
		padding: 2rem;
	}

	&__content {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		padding: 2rem;
		animation: fade .2s ease-in-out;
		min-height: 450px;
		margin-top: 4rem;
	}

	&__items {
		list-style-type: disc;
		padding-left: 2rem;
		color: $blue;

		&__item {
			font-family: $opensans;
			font-size: 1.7rem;
			font-weight: 500;
			margin-bottom: 2rem;
			cursor: pointer;
			transition: all .2s ease-in-out;

			& > span {
				color: $black;
			}

			&:hover {
				span {
					color: $blue;
				}
			}
		}
	}

}


</style>