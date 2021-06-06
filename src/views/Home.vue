<template>
  <main class="home">
    <div class="container">

      <div class="hero">
        <h1>VueBlog</h1>
      </div>

      <PostsList/>

    </div>
  </main>
</template>

<script>
import PostsList from '@/components/PostsList.vue'

export default {
  name: 'Home',
  components: {
    PostsList
  }
}
</script>

<style scoped>
  .hero{
    height: 50vh;
    background-image: url('../assets/img/blogHero.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>