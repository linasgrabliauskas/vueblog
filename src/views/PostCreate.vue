<template>
  <main class="post-create">
     <div class="container"> 
         <h1 class="heading-1">Create new post</h1>
          <div class="post-create__preview">
               <h3>Preview of post:</h3>
               <Post :post="post" :preview="true"/>
          </div>
          <PostForm @formChange="updatePreview"/>
     </div>
  </main>
</template>


<script>
import Post from '@/components/Post.vue'
import PostForm from '@/components/PostForm.vue'

export default {
     name: 'PostCreate',
     components: {
          Post,
          PostForm
     },
     data(){
          return {
               post: {
                    description: "Description",
                    title: "Title",
                    image: ""
               }
          }
     },
     methods: {
          updatePreview: function ({description, title, imageUrl}) {
               this.post.description = description
               this.post.title = title
               this.post.image = imageUrl
          }
     }
    
}
</script>


<style scoped>
.post-create__preview{
     margin-top: 20px;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
     .post-create .container{
          max-width: 600px;
          margin: 0 auto;
     }
}
</style>