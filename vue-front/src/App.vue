<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header class='header'>
			<div class='logo'>
				<img src='/favicon.jpeg' alt='Logo'>
			</div>
      <nav class='nav'>
        <RouterLink to="/" class='nav__link'>Accueil</RouterLink>
        <RouterLink to="/galerie" class='nav__link'>Galerie</RouterLink>
        <RouterLink to="/artistes" class='nav__link'>Artistes</RouterLink>
      </nav>
			<div class='end'>
			</div>
    </header>

    <main>
        <RouterView />
    </main>

	<footer class='footer'>
		<div class='logo'>
			<img src='/favicon-revert.jpeg' alt='Logo revert'>
		</div>
		<div class='copyrights'>
			<p>Tous droits réservés © 2023 - Louis LUBINEAU.</p>
			<p>
				Cours de M. Pierre VIARA - EFREI Paris.
			</p>
		</div>
	</footer>
</template>

<style scoped lang='scss'>
.header{
	background-color: $white;
	border-bottom: 2px solid $black;
	justify-content: space-between;
	display: grid;
	grid-template-areas: "logo nav .";
	grid-template-columns: repeat(3, 1fr);
	align-items: center;
	padding: 1rem 2rem;
	.logo{
		grid-area: logo;
		img{
			width: 8rem;
			border: 2px solid $black;
		}
	}
	.nav{
		grid-area: nav;
		display: flex;
		justify-content: center;
		&__link{
			color: $black;
			text-transform: uppercase;
			text-decoration: none;
			font-weight: 500;
			font-family: $jakarta;
			font-size: 2rem;
			display: inline-block;
			margin: 0 3rem;
			transition: all .2s ease-in-out;
			&.router-link-active{
				color: $blue;
			}
		}

		&:hover .nav__link:not(:hover){
			opacity: 0.5;
		}

		&__link:hover{
			color: $blue;
		}
	}
}

.footer{
	padding: 4rem 2rem;
	background-color: $black;
	color: $white;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-areas: "logo copy .";

	.logo{
		grid-area: logo;
		img{
			width: 8rem;
			border: 2px solid $white;
		}
	}

	.copyrights{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		grid-area: copy;

		font-family: $jakarta;
		p{
			font-size: 1.5rem;
			margin: 0;
			text-align: center;
			line-height: 1.8;
		}
	}
}
</style>
