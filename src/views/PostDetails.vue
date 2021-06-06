<template>
  <main class="post-details">
     <div class="container">  
          <Post :username="this.$route.params.username" :id="this.$route.params.id" :currentUser="currentUser"/>
     </div>
  </main>
</template>


<script>
import Post from '@/components/Post.vue'
export default {
     name: 'PostDetails',
     components: {
          Post
     },
     data(){
          return{
               currentUser: ''
          }
     },
     mounted(){
          this.currentUser = localStorage.getItem('vueblog-username')
     }
}
</script>


<style scoped>
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
     .post-details .container{
          max-width: 700px;
          margin: 0 auto;
     }
}
</style>