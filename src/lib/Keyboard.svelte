<script lang="ts">
  import { keyRows, type KeyConfig } from "./keys";
  import { SvelteSet } from "svelte/reactivity";

  let shiftPressed = $state(false);
  let currentPressedKeys = $state(new SvelteSet());
  let keypresses = $state([]);
  $inspect(currentPressedKeys);

  const addKeypress = (key: string) => {
    keypresses.push(key);
  };

  const delKeypress = () => {
    keypresses.pop();
  };

  const onMouseDown = (keyConfig: KeyConfig, shiftPressed = false) => {
    currentPressedKeys.add(keyConfig.value);

    const isShiftKeyClicked = keyConfig.value === "shift";
    if (isShiftKeyClicked) {
      shiftPressed = true;
      return;
    }

    const isBackspace = keyConfig.value === "backspace";
    if (isBackspace) {
      delKeypress();
      return;
    }

    if (shiftPressed) {
      addKeypress(keyConfig.upper);
    } else {
      addKeypress(keyConfig.value);
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

    const isBackspace = event.key.toLowerCase() === "backspace";
    if (isBackspace) {
      delKeypress();
      return;
    }

    const isEnter = event.key.toLowerCase() === "enter";
    if (isEnter) {
      addKeypress("\n");
      return;
    }

    const isModifierKey = event.key.length !== 1;
    if (isModifierKey) {
      return;
    }

    if (event.shiftKey) {
      addKeypress(event.key.toUpperCase());
    } else {
      addKeypress(event.key);
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
        class={[
          currentPressedKeys.has(keyConfig.value) ||
          currentPressedKeys.has(keyConfig.label.toLowerCase()) ||
          currentPressedKeys.has(keyConfig.upper)
            ? "pressed"
            : "",
          keyConfig.value === " " ? "spacebar" : "",
        ]}
        onmousedown={(event) => onMouseDown(keyConfig, event.shiftKey)}
        onmouseup={() => onMouseUp(keyConfig)}
      >
        {#if shiftPressed && !["\n", " "].includes(keyConfig.value)}
          {keyConfig.upper}
        {:else}
          {keyConfig.label}
        {/if}
      </button>
    {/each}
  </div>
{/each}

<div class="text-container">{keypresses.join("")}</div>

<style>
  .text-container {
    margin-top: 5em;
    white-space: pre-wrap;
    width: 100%;
    height: 200px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-gutter: stable;
  }

  .spacebar {
    width: 300px;
  }

  .pressed {
    background-color: green;
  }
</style>
