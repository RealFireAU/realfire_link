<script>
    // api url = /api/v1/link
    let url;

    async function handleClick() {
        const res = await fetch('/api/v1/link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        });

        const data = await res.json();
        console.log(data);
    }

</script>

<!-- Add a notice that this site is currently in development -->
<p>This site is currently in development and is not yet ready for public use.</p>
<input type="text" placeholder="Input" bind:value={url}>
<button class="btn" on:click={handleClick}>Button</button>
