<script>
    import { fade, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import QrCode from "svelte-qrcode";

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch("remove", { id });
    }

    export let id;
    export let Date;
    export let Time
    export let QRURL;
</script>

<li in:fly={{ x: 900, duration: 500 }}>
    <h2>Appointment confirmed!</h2>
    <h3>Date and Time: {Date} {Time}</h3>
    <h3>
        Please have the below QR code ready when you arrive at the location!
    </h3>
    <QrCode class="qrcode" value={QRURL} size="100" /><br>
    <button on:click={remove}>Cancel Appointment</button>
</li>

<style>
    :global(.qrcode) {
        vertical-align: middle;
    }
    h2 {
        background-color: green;
        color: white;
    }
</style>
