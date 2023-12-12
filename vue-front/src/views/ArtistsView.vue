<script setup>
import { artworksService } from '@/_services';
import { onBeforeMount, ref } from 'vue';
import PopinComponent from '@/components/PopinComponent.vue';

const fetchData = async () => {
};

onBeforeMount(fetchData);
</script>

<template>
	<section class='artists'>
		<h1>Les artistes</h1>
		<p>
			Découvrez les artistes qui ont réalisé les œuvres de la galerie.
		</p>
	</section>
</template>

<style scoped lang='scss'>
.artists {
	padding: 5rem 0;

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
		margin: 3rem auto;
		animation: fadeRight .2s ease-in-out;
	}

	&__content {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 2rem;
		padding: 2rem;
		animation: fade .2s ease-in-out;
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

			p, h2, button{
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

				p, h2, button{
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