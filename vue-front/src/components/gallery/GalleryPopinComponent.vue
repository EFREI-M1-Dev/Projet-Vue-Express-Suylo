<script setup>
import { onBeforeMount } from 'vue';
import { artistsService } from '@/_services';
import IconCloseSvg from '@/components/icons/IconCloseSvg.vue';
import GalleryPopinAdd from '@/views/gallery/GalleryPopinAdd.vue';
import GalleryPopinUpdate from '@/views/gallery/GalleryPopinUpdate.vue';
import GalleryPopinDelete from '@/views/gallery/GalleryPopinDelete.vue';
import GalleryPopinView from '@/views/gallery/GalleryPopinView.vue';

const props = defineProps({
	type: String,
	art: Object,
});

const fetchData = async () => {
	if (props.type === 'view') {
		if (props.art){
			props.art.artist = await artistsService.getArtistById(props.art.artistId);
		}
	}
};

onBeforeMount(fetchData);

const emit = defineEmits(['close', 'refresh', 'notif']);
const closePopin = () => { emit('close'); };
const refreshArtworksList = () => { emit('refresh'); };
const showNotification = async () => { 	emit('notif'); };
</script>

<template>
	<section class='popin' @click='closePopin'>
		<div class='popin__content' @click.stop>
			<div class='popin__content__layout'>
				<GalleryPopinView v-if='props.type === "view"'
													:art='props.art' />

				<GalleryPopinAdd v-else-if='props.type === "add"'
											@refresh='refreshArtworksList'
											@close='closePopin'
											@notif='showNotification'/>

				<GalleryPopinUpdate v-else-if='props.type === "edit"'
											 :art='props.art'
											 @refresh='refreshArtworksList'
											 @close='closePopin'
											 @notif='showNotification'/>

				<GalleryPopinDelete v-else-if='props.type === "delete"'
											 :art='props.art'
											 @refresh='refreshArtworksList'
											 @close='closePopin'
											 @notif='showNotification'/>

				<div class='popin__close' @click='closePopin' title='Fermer la popin'>
					<IconCloseSvg :color='"black"'/>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang='scss'>
.popin{
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

		&__layout {
			display: grid;
			grid-template-columns: 666px 450px;
			background-color: $white;
			position: relative;
			pointer-events: auto;
			grid-template-rows: 666px;
		}

		&__text {
			width: 100%;
			padding: 2rem 4rem 2rem 2rem;
			box-sizing: border-box;
			border-left: 1px solid $black;

			.title {
				font-family: $jakarta;
				font-size: 2.5rem;
				font-weight: 600;
				margin-bottom: 2rem;
				line-height: 1.2;

			}

			.description, .price, .artist {
				font-family: $opensans;
				font-size: 2rem;
				font-weight: 400;
				margin-bottom: 2rem;
				line-height: 1.6;
			}
			.description{
				font-style: italic;
				font-size: 1.7rem;
			}

			.price, .artist{
				font-family: $jakarta;
				font-weight: 600;
			}

			.artist{
				:not(.small){
					color: $blue;
				}
			}

			.small{
				font-size: 1.5rem;
				font-weight: 400;
				margin-right: .25rem;
				font-style: normal;

			}
		}

		&__img {
			padding: 2rem;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			object-fit: cover;
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