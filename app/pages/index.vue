<script setup lang="ts">
// Markdown content to be rendered
const md = `
# Hello MDC


- List 1
- List 2
- List 3
`

// Parse the markdown content
const { data: ast, error } = await useAsyncData('markdown', () => parseMarkdown(md))

// Watch for errors during parsing
watchEffect(() => {
  if (error.value) {
    console.error(error.value)
  }
})
</script>

<template>
  <div>
    <!-- Render markdown content using MDC component -->
    <span>
      Using MDC to render markdown content with `# Hello MDC`
    </span>
    <MDC :value="md" tag="article" />

    <!-- Render markdown content using MDCRenderer component -->
    <pre>
      Using MDCRenderer to render markdown content with:

      const { data: ast, error } = await useAsyncData('markdown', () => parseMarkdown('md'))
    </pre>

    <MDCRenderer v-if="ast" :body="ast.body" :data="ast.data" />

    <span>
      Take a look at the console for errors
    </span>
  </div>
</template>
