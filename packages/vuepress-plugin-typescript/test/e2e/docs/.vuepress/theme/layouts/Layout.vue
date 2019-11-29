<template>
  <div>
    <h1>{{ message }}</h1>
    <Content />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Layout extends Vue {
  message = 'Hello, TypeScript'
}
</script>
