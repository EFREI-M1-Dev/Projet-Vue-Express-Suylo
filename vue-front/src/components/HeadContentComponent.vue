<script setup>
import IconPlusSvg from '@/components/icons/IconPlusSvg.vue';

const emit = defineEmits(['click']);
const onBtnClick = () => {
	emit('click');
};
</script>

<template>
	<div class='content__head'>
		<h1>
			<slot name='title'></slot>
		</h1>
		<p>
			<slot name='text'></slot>
		</p>
		<button class='btn btn-reverse' @click='onBtnClick'>
			<slot name='button'></slot>
			<IconPlusSvg />
		</button>
	</div>
</template>

<style scoped lang='scss'>
.content__head{
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
</style>