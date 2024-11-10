<script lang="ts">
	import {LottiePlayer} from '@lottiefiles/svelte-lottie-player';
	import animationData from './empty.json?url';

	console.log(animationData);
</script>

<LottiePlayer
		src={animationData}
		renderer='svg'
		background='transparent'
		height={100}
		width={100}
/>
