<script>
    import { db } from "../firebase";
    import { collectionData } from "rxfire/firestore";
    import { startWith } from "rxjs/operators";
    import AppointmentItem from "./AppointmentItem.svelte";
    import TimePicker from "svelte-touch-timepicker"; // 4.38kb gzipped
    import DatePicker from "svelte-touch-datepicker";

    let date = new Date();
    $: _date = date.toLocaleDateString("en-US");
    let time = new Date();
    $: _time = time.toLocaleTimeString("en-US");

    export let uid; //user ID after auth or true in case we're querying for an appointment
    export let RandomID = "";
    export let isLoggedIn = false;

    let query = db
        .collection("appointments")
        .where("uid", "==", uid)
        .orderBy("created");
    if (RandomID != "") {
        query = query.where("RandomID", "==", RandomID);
    }
    const appointments = collectionData(query, "id").pipe(startWith([]));

    function add() {
        RandomID = Math.random().toString(36).substr(2, 11);
        let QRURL = window.location.hostname + "?rid=" + RandomID + "&uid=" + uid;
        db.collection("appointments").add({
            RandomID,
            Date: Date(_date),
            Time: _time,
            QRURL,
            created: Date.now(),
            uid,
        });
    }

    function removeItem(event) {
        console.log(event);
        const id = event.detail.id;
        db.collection("appointments").doc(id).delete();
    }
</script>

{#if isLoggedIn}
    <hr />
    <p>Create new appointment:</p>
    <div class="container">
        <div class="center">
            <p>Date:
            <DatePicker bind:date /></p>
        </div>
    </div>
    <div class="container">
        <div class="center">
            <p>Time:
            <TimePicker bind:time /></p>
        </div>
    </div>
    <button on:click={add}>Create</button>
{/if}

<hr>

<ul>
    {#if $appointments.length > 0}
        {#each $appointments as appointment}
            <AppointmentItem {...appointment} on:remove={removeItem} />
        {/each}
    {:else}
        No appointment(s) found
    {/if}
</ul>


<style>
    .container {
        height: 100%;
        width: 100%;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
