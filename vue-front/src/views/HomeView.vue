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
				<p>Lorem ipsum dolor sit amet consectetur ad</p>
			</div>
			<div class='home__text-img__img'>
				<img src='/arts/img/oeuvre1.jpeg' alt='home' />
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
		font-size: 1.6rem;
		font-weight: 400;
		margin: 2rem 0;
	}


	&__banner{
		background-color: $blue;
		padding: 5rem 2rem;
		color: $white;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		place-items: center;
		border-bottom: 3px solid $black;


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
				top: 2rem;
				left: 6rem;
				animation: fadeRight .2s ease-in-out;
				z-index: 3;
			}
			&__absolute2{
				position: absolute;
				bottom: 2rem;
				right: 6rem;
				z-index: -1;
				animation: fadeRight .2s ease-in-out;
			}
		}
	}

	&__text-img{
		display: grid;
		grid-template-columns: 1fr 1fr;

		&__text{
			padding: 4rem;
			box-sizing: border-box;
		}

		&__img{
			border-left: 3px solid $black;
			img{

				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>