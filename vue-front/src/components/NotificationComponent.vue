<script setup>

const props = defineProps({
	type: String,
});

</script>

<template>
	<div class='notification' :class='"--" + props.type'>
		<div class='notification__content'>
			<div class='notification__content__icon'>
				<slot name='icon'></slot>
			</div>
			<div class='notification__content__text'>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
.notification {
	$and: &;
	position: fixed;
	bottom: 4rem;
	right: 4rem;
	min-width: 250px;
	background-color: $white;
	padding: 2rem;

	&__content{
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		&__text{
			font-family: $jakarta;
			font-weight: 500;
			letter-spacing: 1px;
			color: $white;
		}
	}

	&.--success{
		background-color: #4caf50;
		#{$and}__content{
		}
	}
}
</style>