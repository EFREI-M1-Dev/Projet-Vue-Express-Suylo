<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header class='header'>
      <nav class='nav'>
        <RouterLink to="/" class='nav__link'>Accueil</RouterLink>
        <RouterLink to="/galerie" class='nav__link'>Galerie</RouterLink>
        <RouterLink to="/" class='nav__link'>Artistes</RouterLink>
      </nav>
    </header>

    <main>
        <RouterView />
    </main>
</template>

<style scoped lang='scss'>
.header{
	background-color: $white;
	border-bottom: 3px solid $black;
	justify-content: center;
	display: flex;
	align-items: center;
	padding: 4rem 2rem;
	.nav{
		&__link{
			color: $black;
			text-transform: uppercase;
			text-decoration: none;
			font-weight: 500;
			font-family: $jakarta;
			font-size: 3rem;
			display: inline-block;
			margin: 0 3rem;
			transition: all .2s ease-in-out;
		}

		&:hover .nav__link:not(:hover){
			opacity: 0.5;
		}

		&__link:hover{
			color: $blue;
		}
	}
}
</style>
