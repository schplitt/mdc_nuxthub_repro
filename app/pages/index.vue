<script setup lang="ts">
const md = `
# Hello MDC

::alert
Hello MDC
::

- List 1
- List 2
- List 3
`
</script>

<template>
  <MDC :value="md" tag="article" />
</template>
