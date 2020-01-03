<template>
<h1 style="background-color: blue">VIEWS</h1>
</template>

<script>
import mountableAsDynamicMixin from "@/mixins/mountableAsDynamic.mixin"

export default {
  mixins: [mountableAsDynamicMixin],

  data: () => ({
    // defined if mountableAsDynamicMixin is included
    dynamicTitle: 'VIEWS title'
  })
}
</script>
