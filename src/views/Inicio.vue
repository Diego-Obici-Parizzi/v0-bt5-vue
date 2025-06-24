<template>
    <div class="container bg-light mt-5">
      <div class="row">
        <div class="col-md-12">
          <p class="text-center fs-1">Apresentação</p>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'Inicio',
  props: {
    logo: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
}
</script>
