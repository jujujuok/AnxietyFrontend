<script setup>

let props = defineProps({
  msg: String
})

</script>

<template>
  <div class="home">
    <h1 class="green">{{ msg }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.home h1,
.home h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .home h1,
  .home h3 {
    text-align: left;
  }
}
</style>
