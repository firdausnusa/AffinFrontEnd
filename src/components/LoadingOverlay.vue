<template>
  <div class="text-center">
    
    <v-overlay :value="showOverlay" >
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  export default {
    name: 'LoadingOverlay',

    props: {
      showOverlay: Boolean
    },

    // data: () => ({

    // }),
  }
</script>
