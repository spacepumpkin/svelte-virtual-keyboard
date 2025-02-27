<script>
  import svelteLogo from "/svelte.svg";
  import viteLogo from "/vite.svg";
</script>

<h4>
  Built with
  <a href="https://vite.dev" target="_blank" rel="noreferrer">
    <img src={viteLogo} class="logo vite" alt="Vite Logo" />
  </a>
  <span>+</span>
  <a href="https://svelte.dev" target="_blank" rel="noreferrer">
    <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
  </a>
</h4>

<style>
  h4 {
    display: flex;
    justify-content: center;
    gap: 0.5em;
    margin-top: 5em;
  }
  .logo {
    height: 1.5em;
    transition: filter 300ms;
  }
  .logo.vite:hover {
    filter: drop-shadow(0 0 0.5em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 0.5em #ff3e00aa);
  }
</style>
