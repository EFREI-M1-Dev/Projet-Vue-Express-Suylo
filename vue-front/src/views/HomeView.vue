<script setup>
</script>

<template>
	<section class='home'>
		<div class='home__banner'>
			<div class='home__banner__text'>
				<h1>Bienvenue sur le site de la galerie d'art</h1>
				<p>Cliquez ci-dessous pour découvrir toutes les oeuvres</p>
				<RouterLink to='/' class='btn'>Découvrir la galerie</RouterLink>
			</div>
			<div class='home__banner__img'>
				<img src='/arts/img/oeuvre1.jpeg' alt='home' />
				<img src='/arts/img/oeuvre2.jpeg' alt='home' class='home__banner__img__absolute'>
				<img src='/arts/img/oeuvre3.jpeg' alt='home' class='home__banner__img__absolute2'>
			</div>
		</div>


		<div class='home__text-img'>
			<div class='home__text-img__text'>
				<h2>La galerie d'art</h2>
				<p>Il vous est possible d'ajouter, de modifier et de supprimer des oeuvres du site.</p>
				<RouterLink to='/' class='btn btn-reverse'>Les oeuvres</RouterLink>
			</div>
			<div class='home__text-img__img'>
				<img src='/arts/img/oeuvre1.jpeg' alt='home' />
			</div>
			<div class='home__text-img__text'>
				<h2>Les artistes</h2>
				<p>Vous pouvez aussi ajouter de nouveaux artistes, les modifier et les supprimer.</p>
				<RouterLink to='/' class='btn'>Les artistes</RouterLink>
			</div>
			<div class='home__text-img__img'>
				<img src='/arts/img/oeuvre-paysage.jpeg' alt='home' />
			</div>
			<div class='home__text-img__img'>
				<img src='/arts/img/oeuvre-space.jpeg' alt='home' />
			</div>
			<div class='home__text-img__text'>
				<h2>À propos</h2>
				<p>Ce projet a été réalisé en <strong>VueJS</strong> (front) et <strong>ExpressJS</strong> (API).</p>
			</div>
			<div class='home__text-img__img'>
				<img src='/arts/img/oeuvre-eye.jpeg' alt='home' />
			</div>
			<div class='home__text-img__text'>
				<h2>Projet</h2>
				<p>Le projet est disponible sur mon GitHub. CSS made in China.</p>
				<a href='https://github.com/EFREI-M1-Dev/Projet-Vue-Express-Suylo' class='btn btn-reverse' target='_blank'>Lien du dépôt</a>
			</div>
		</div>
	</section>
</template>

<style lang='scss' scoped>
.home{
	h1{
		font-family: $jakarta;
		font-size: 4rem;
		font-weight: 600;
	}

	h2{
		font-family: $jakarta;
		font-size: 3rem;
		font-weight: 600;
	}

	p{
		font-family: $opensans;
		font-size: 2rem;
		font-weight: 400;
		margin: 2rem 0;
	}


	&__banner{
		background-color: $blue;
		padding: 7.5rem 2rem;
		color: $white;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		place-items: center;
		border-bottom: 2px solid $black;


		&__text{
			animation: fadeLeft .3s ease-in-out;
		}

		&__img{
			position: relative;
			z-index: 2;
			animation: fadeRight .2s ease-in-out;
			img{
				max-width: 512px;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			&__absolute{
				position: absolute;
				top: 4rem;
				left: 4rem;
				animation: fadeRight .2s ease-in-out;
				z-index: 3;
			}
			&__absolute2{
				position: absolute;
				bottom: 4rem;
				right: 4rem;
				z-index: -1;
				animation: fadeRight .2s ease-in-out;
			}
		}
	}

	&__text-img{
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-bottom: 3px solid $black;

		&__text{
			padding: 4rem;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			height: 100%;
			flex-direction: column;
			border: 2px solid $black;
			h2, p{
				animation: fadeLeft .2s ease-in-out;
			}
		}

		&__img{
			animation: fade .2s ease-in-out;
			border: 2px solid $black;
			img{

				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>