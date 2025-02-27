<!-- BASIC FUNCTIONALITY -->
<!-- Clicking Shift does not register text input -->
<!-- Key presses highlights key -->
<!-- Key clicks highlights key -->
<!-- Keyboard presses matches up with clicks -->

<!-- ADVANCED -->
<!-- Clicking Shift enables shift, so that the next key click OR press is uppercased -->
<!-- Clicking or pressing Shift when shift is enabled disables shift -->
<!-- Clicking or pressing Caps Lock enables caps lock for clicks -->

<script lang="ts">
  import { keyRows, type KeyConfig } from "./keys";
  import { SvelteSet } from "svelte/reactivity";

  let shiftPressed = $state(false);
  let currentPressedKeys = $state(new SvelteSet());
  let keypresses = $state([]);
  $inspect(currentPressedKeys);

  const updateKeypresses = (key: string) => {
    keypresses.push(key);
  };

  const onMouseDown = (keyConfig: KeyConfig, shiftPressed = false) => {
    currentPressedKeys.add(keyConfig.value);

    const isShiftKeyClicked = keyConfig.value === "shift";
    if (isShiftKeyClicked) {
      shiftPressed = true;
      return;
    }
    if (shiftPressed) {
      updateKeypresses(keyConfig.upper);
    } else {
      updateKeypresses(keyConfig.value);
    }
  };

  const onMouseUp = (keyConfig: KeyConfig) => {
    currentPressedKeys.delete(keyConfig.value);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.shiftKey) {
      shiftPressed = true;
    } else if (shiftPressed) {
      shiftPressed = false;
    }

    currentPressedKeys.add(event.key.toLowerCase());

    const isModifierKey = event.key.length !== 1;
    if (isModifierKey) {
      return;
    }

    if (event.shiftKey) {
      updateKeypresses(event.key.toUpperCase());
    } else {
      updateKeypresses(event.key);
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Shift") {
      shiftPressed = false;
    }
    currentPressedKeys.delete(event.key.toLowerCase());
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
</script>

<h1>Type away!</h1>

{#each keyRows as keyRow}
  <div>
    {#each keyRow as keyConfig}
      <button
        tabindex="-1"
        class={currentPressedKeys.has(keyConfig.value) ? "pressed" : ""}
        onmousedown={(event) => onMouseDown(keyConfig, event.shiftKey)}
        onmouseup={(event) => onMouseUp(keyConfig)}
      >
        {#if shiftPressed && keyConfig.value !== " "}
          {keyConfig.upper}
        {:else}
          {keyConfig.label}
        {/if}
      </button>
    {/each}
  </div>
{/each}

<div class="text-container">{keypresses.join(" ")}</div>

<style>
  .text-container {
    margin-top: 5em;
    white-space: pre-wrap;
    max-width: 95vw;
    height: 200px;
    overflow-y: auto;
  }

  .pressed {
    background-color: green;
  }
</style>
