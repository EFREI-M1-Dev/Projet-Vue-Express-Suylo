<script setup>
import IconCloseSvg from '@/components/icons/IconCloseSvg.vue';
import ArtistPopinAdd from '@/views/artists/ArtistPopinAdd.vue';

const props = defineProps({
	type: String,
	artist: Object,
});

const emit = defineEmits(['close', 'refresh', 'notif']);
const closePopin = () => { emit('close'); };
const refreshArtistsList = () => { emit('refresh'); };
</script>

<template>
	<section class='popin' @click='closePopin'>
		<div class='popin__content' @click.stop>
			<div class='popin__content__artist'>
				<ArtistPopinAdd v-if='props.type === "add"' />

				<div class='popin__close' @click='closePopin' title='Fermer la popin'>
					<IconCloseSvg :color='"black"'/>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang='scss' scoped>
.popin {
	content: '';
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	z-index: 0;

	&__content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		pointer-events: none;

		&__artist {
			background-color: $white;
		}
	}

	&__close {
		position: absolute;
		top: 1.5rem;
		right: 1rem;

		&:hover {
			svg path {
				fill: $red;
			}

			cursor: pointer;
		}
	}
}

</style>