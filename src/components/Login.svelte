<script>
    import Profile from "./Profile.svelte";
    import Appointments from "./Appointments.svelte";
    import { auth, googleProvider } from "../firebase";
    import { authState } from "rxfire/auth";

    export let user;
    export let URLParamRandomID;
    export let URLParamuid;

    const unsubscribe = authState(auth).subscribe((u) => (user = u));

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<section>
    {#if URLParamRandomID === undefined || URLParamuid === undefined}
        {#if user}
            <Profile {...user} />
            <button on:click={() => auth.signOut()} class="button"
                >Logout</button
            >
            <Appointments uid={user.uid} isLoggedIn="true" />
        {:else}
            <button on:click={login} class="button">
                Signin with Google
            </button>
        {/if}
    {:else}
        <Appointments uid={URLParamuid} RandomID={URLParamRandomID} />
    {/if}
</section>

<style>
    section {
        background: rgb(235, 235, 235);
        padding: 20px;
    }
</style>
