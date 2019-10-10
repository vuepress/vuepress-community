<template>
  <a
    :href="`https://www.npmjs.com/package/${pkg}`"
    :title="pkg"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      class="no-zoom"
      :src="`https://img.shields.io/npm/v/${pkg}.svg?style=flat-square`"
      alt="npm"
    />
  </a>
</template>

<script>
export default {
  name: 'NpmLink',

  props: {
    pkg: {
      type: String,
      required: true,
    },
  },
}
</script>
