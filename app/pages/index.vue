<script setup lang="ts">
// Markdown content to be rendered

const url = shallowRef<'/api/md1' | '/api/md2'>('/api/md1')

// Parse the markdown content
const { data: rawMD } = useFetch(url)

const { data: ast, error: parseError } = useAsyncData('markdown', () => {
  console.log('Parsing markdown content')
  return parseMarkdown(rawMD.value ?? '')
}, {
  watch: [rawMD],
})

watchEffect(() => {
  if (ast.value) {
    console.log('Parsed ast', ast.value)
  }
})

watchEffect(() => {
  if (parseError.value) {
    console.error(parseError.value)
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
        <MDC :value="rawMD ?? ''" tag="article" />
      </div>

      <!-- Render markdown content using MDCRenderer component -->
      <!-- <div class="mdc-renderer-section">
        <span>
          Using MDCRenderer to render markdown content with:
          const { data: ast, error } = await useAsyncData('markdown', () => parseMarkdown('md'))
        </span>
        <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />
      </div> -->

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
  grid-template-columns: 1fr;
  gap: 1rem;
}

.mdc-section,
.mdc-renderer-section {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}
</style>
