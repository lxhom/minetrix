<script>
	import inspect from 'browser-util-inspect';
	let data;
	let newServer = ''
	let changeServer = () => location.search = '?' + newServer
	let server = location.search.replace('?','')
	let refresh = async () => {
		if (!server) return
		try {
			let res = await fetch('/api/'+server)
			data = await res.json();
		} catch(e) { data = {error: e} }
	}
	refresh()
	setInterval(refresh, 5000)
</script>
<div class=content>
	{#if server === ''}
		Enter an URL: <input bind:value={newServer}> <button on:click={changeServer}>Go</button> or to /?server.tld to view the tablist.
	{:else if data && !data.error}
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
		Something went wrong. Check the server URL or try again later.<pre>{inspect(data.error)}</pre>
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
