<template>
  <main class="user-details">
    <div class="container">
        <h1>{{this.$route.params.username}}</h1>
        <div class="posts-container">
          <PostsList :username="this.$route.params.username"/>
        </div>
    </div>
  </main>
</template>

<script>
import PostsList from '@/components/PostsList.vue'

export default {
  name: 'UserDetails',
  components: {
    PostsList
  }
}
</script>

<style scoped>

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
  .posts-container{
    max-width: 700px;
    margin: 0 auto;
  }
}
</style>