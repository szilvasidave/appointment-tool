<script>
	import Login from "./components/Login.svelte";
	import queryString from "query-string";

	let queryParams;
	$: queryParams = queryString.parse(window.location.search);
</script>

<!-- svelte-ignore component-name-lowercase -->
<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css"
	/>
</svelte:head>

<nav>
	<a href="/">Appointment Tool</a>
</nav>
<div>
	<Login URLParamRandomID={queryParams.rid} URLParamuid={queryParams.uid}/>
</div>

<style>
	* {
		text-align: center;
	}

	nav {
		font-family: "HelveticaNeue-Light", "Helvetica Neue Light",
			"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
		font-weight: 300;
		font-size: 24px;
	}
</style>
