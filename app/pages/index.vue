<script setup lang="ts">
// Markdown content to be rendered

const url = shallowRef<'/api/md1' | '/api/md2'>('/api/md1')

const rawMD = ref<string>((await $fetch(url.value)).md)

const ast = ref(await parseMarkdown(rawMD.value))

// Watch for errors during parsing
async function switchMD() {
  url.value = url.value === '/api/md1' ? '/api/md2' : '/api/md1'
  rawMD.value = (await $fetch(url.value)).md
  ast.value = await parseMarkdown(rawMD.value)
}
</script>

<template>
  <div class="content-container">
    <span>
      Take a look at the console for errors
    </span>

    <button @click="switchMD">
      Switch MD
    </button>

    <div class="markdown-grid">
      <!-- Render markdown content using MDC component -->
      <div class="mdc-section">
        <span>
          Using MDC to render markdown content
        </span>
        <MDC v-if="rawMD" :value="rawMD" />
      </div>

      <!-- Render markdown content using MDCRenderer component -->
      <div class="mdc-renderer-section">
        <span>
          Using MDCRenderer to render markdown content
        </span>
        <MDCRenderer :body="ast.body" :data="ast.data" />
      </div>

      {{ rawMD }}
    </div>
  </div>
</template>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.markdown-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.mdc-section,
.mdc-renderer-section {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}
</style>
