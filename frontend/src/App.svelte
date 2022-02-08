<script>
	let data;
	let server = location.search.replace('?','')
	setInterval(async () => {
		let res = await fetch('/api/'+server)
		data = await res.json();
	}, 5000)
</script>
<div class=content>
	{#if data && !data.error}
		{data.host} ({data.version_from_protocol}, {data.players.online}/{data.players.max}):
		{#each data.players.sample.sort((a,b)=>a.username>b.username) as player}
			<div class=player>
			<img src="https://crafatar.com/renders/head/{player.uuid}" alt="Head of {player.username}"> {player.username}
			</div>
		{/each}
		{#if (+data.players.sample.length < +data.players.online)}
			{+data.players.online - +data.players.sample.length} more																		 
		{/if}
	{:else if data && data.error}
    Something went wrong. Check the server URL or try again later
	{:else}
		Loading...
	{/if}
</div>

<style>
	.player img {
		height: 20px;
		vertical-align: middle;
	}
	.content {
		font-family: Minecraftia, sans-serif;
		color: #fef !important;
	}
	:root {
		font-size: 14px;
		background: #2e3440;
	}
</style>

<link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/minecraftia" type="text/css"/> 
