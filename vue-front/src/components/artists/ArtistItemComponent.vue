<script setup>
const props = defineProps({
	artists: Object,
	letter: {},
});
</script>

<template>
	<div class='artists__byletter'>
		<h2 class='artists__letter'>{{ letter }}</h2>
		<ul class='artists__items'>
			<li class='artists__items__item' v-for='artist in artists' :key='artist.id'>
						<span>
							{{ artist.firstName }} {{ artist.lastName }}
						</span>
			</li>
		</ul>
	</div>

</template>

<style scoped lang='scss'>
.artists{
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