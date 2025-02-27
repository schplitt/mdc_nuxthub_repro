<script setup lang="ts">
// Markdown content to be rendered

const url = shallowRef<'/api/md1' | '/api/md2'>('/api/md1')

// Parse the markdown content
const { data: rawMD } = useFetch(url)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsedMD = ref<any>(undefined)

watchEffect(async () => {
  if (rawMD.value) {
    try {
      const parsed = await parseMarkdown(rawMD.value.md)
      parsedMD.value = parsed
    }
    catch (error) {
      console.error(error)
    }
  }
})

// Watch for errors during parsing
function switchMD() {
  url.value = url.value === '/api/md1' ? '/api/md2' : '/api/md1'
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
        <MDC v-if="rawMD" :value="rawMD.md" />
      </div>

      <!-- Render markdown content using MDCRenderer component -->
      <div class="mdc-renderer-section">
        <span>
          Using MDCRenderer to render markdown content
        </span>
        <MDCRenderer v-if="parsedMD" :body="parsedMD.body" :data="parsedMD.data" />
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
