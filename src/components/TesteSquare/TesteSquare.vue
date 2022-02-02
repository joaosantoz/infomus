<script>
import { ref } from "vue";
import { mapState } from "pinia";
import spotifyApi from "../../services/spotify";
import { useStatsStore } from "../../stores";
import domtoimage from 'dom-to-image';

export default {
	setup() {
		const albums = ref([]);
		const mosaic = ref(null);
		const time = ref('short');

		return {
			albums,
			mosaic,
			time,
		}
	},
	methods: {
		exportImage(div) {
			domtoimage.toPng(div)
				.then(function (base) {
					const a = document.createElement("a");
					a.href = base;
					a.download = "Image.png";
					a.click();
				})
				.catch(function (error) {
					console.error('oops, something went wrong!', error);
				});
		},
		fetchImages() {
			spotifyApi.get(`/me/top/artists?time_range=${this.time}_term&limit=49`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.getUserToken}`,
				},
			}).then((response) => {
				this.albums = response.data.items;
				console.log(this.albums)
			})
		}
	},
	created() {
		this.fetchImages();
		console.log(this.getUserName);

	},
	computed: {
		...mapState(useStatsStore, ["getUserToken", "getUserName"])
	}
}
</script>

<template>
	<button @click="exportImage(mosaic)">gerar foto</button>
	<input type="radio" name="time" id="short" v-model="time" value="short" />
	<label for="short">Short</label>
	<input type="radio" name="time" id="medium" v-model="time" value="medium" />
	<label for="medium">Medium</label>
	<input type="radio" name="time" id="long" v-model="time" value="long" />
	<label for="long">Long</label>
	<button @click="fetchImages()">atualizar</button>
	<div class="container">
		<div ref="mosaic" class="mosaic" v-if="albums">
			<img class="image" v-for="item in albums" :src="item.images[1].url" alt :key="item" />
		</div>
	</div>
</template>

<style lang="scss">
$imageSize: 250px;

.container {
	display: flex;
	align-items: center;
	justify-content: center;
}
.mosaic {
	max-width: calc(7 * $imageSize);
	width: 100%;
	.image {
		max-height: $imageSize;
		max-width: $imageSize;
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		vertical-align: middle;
		object-fit: cover;
	}
}
</style>