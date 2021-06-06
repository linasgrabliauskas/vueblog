<template>
  <main class="not-found">
    <div class="container">
      <h1 class="heading-1">Oops... This page does not exist</h1>
      <button @click="$router.go(-1)" class="btn">Back to previous page</button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFount404'
}
</script>

<style scoped>
.not-found{
    text-align: center;
}
.not-found button{
    margin-top: 15px;
}
</style>