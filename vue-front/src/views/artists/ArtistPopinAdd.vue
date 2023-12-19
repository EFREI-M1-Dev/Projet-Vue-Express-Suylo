<script setup>
import { onBeforeMount, ref } from 'vue';
import IconCloseSvg from '@/components/icons/IconCloseSvg.vue';
import IconSaveSvg from '@/components/icons/IconSaveSvg.vue';
import IconWarningSvg from '@/components/icons/IconWarningSvg.vue';

// inputs
let firstname = ref('');
let lastname = ref('');
let description = ref('');
let link = ref('');

// Ref submit
let errors = ref();

// emits
const emit = defineEmits(['close', 'refresh', 'notif']);
const closePopin = () => { emit('close'); };
const refreshArtworksList = () => { emit('refresh'); };
const showNotification = async () => { 	emit('notif'); };
</script>

<template>
	<form class='popin__content__form'>
		<div class='popin__content__text'>
			<h2 class='title'>
				Ajouter un nouvel artiste
			</h2>
			<p class='title small'>
				* Nom :
				<input type='text' v-model='lastname' placeholder="Le nom de l'artiste" class='input' name='lastname' required>
			</p>
			<p class='title small'>
				* Prénom :
				<input type='text' v-model='firstname' placeholder="Le prénom de l'artiste" class='input' name='firstname' required>
			</p>
			<p class='description small'>
				* Description :
				<input type='text' v-model='description' placeholder='Sa description' class='input' name='desc' required>
			</p>
			<p class='price small'>
				Lien (wikipédia, site web, etc.) :
				<input type='number' v-model='link' placeholder='Son lien' class='input' name='price'>
			</p>
			<div class='required'>
				* Champs obligatoires

<!--				<p class='required__errors' v-if='errors'>
					<IconWarningSvg />
					{{ errors }}
				</p>-->
			</div>

			<button class='popin__content__btn btn btn-reverse' type='submit'>
				Sauvegarder
				<IconSaveSvg />
			</button>
		</div>
	</form>

</template>

<style scoped lang='scss'>
.popin__content {

	&__text {
		display: flex;
		flex-direction: column;

		.required {
			font-size: 1.4rem;
			color: #515151;
			margin-top: 1rem;
			font-family: $opensans;
			font-weight: 500;

			&__errors{
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1rem;
				color: $red;
				font-size: 1.6rem;
				margin-top: 2rem;
			}
		}

	}

	&__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: auto;
		width: 100%;
	}
}

</style>