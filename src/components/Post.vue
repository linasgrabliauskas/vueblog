<template>
     <li class="post">
          <Modal ref="confirmModal"/>
          <Spinner v-if="isLoading"/>

          <div class="post__content" v-if="!isLoading">
               <div class="post__img">
                    <img 
                    :src="postData.image" 
                    :alt="postData.title" 
                    onError="
                    this.onerror=null;
                    this.src='https://www.sane.org/components/com_easyblog/themes/wireframe/images/placeholder-image.png'"
                    >
               </div>
               <h1 class="post__title heading-1">{{postData.title}}</h1>
               <span class="post__timestamp" v-if="!preview">{{formatDate(postData.timestamp)}} | </span> 

               <span class="post__username">
                    <router-link :to="`/user/${postData.username}`">{{postData.username}}</router-link>
               </span>

               <p class="post__description" :class="{truncate : isPreviewOrSinglePost}" >{{postData.description}}</p>
               <router-link v-if="isPreviewOrSinglePost" :to="`/posts/${postData.username}/${postData.id}`">Read more</router-link>
               
               <div class="post__controls" v-if="(postData.username === currentUser) && !preview">
                    <button @click="deletePost" class="btn" aria-label="Delete post">Delete</button>
                    <button @click="redirectTo(`/update/${postData.username}/${postData.id}`)" class="btn" aria-label="Update post">Update</button>
               </div>
          </div>
          <Notification :message="message"/>
     </li>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
import Modal from '@/components/Modal.vue'
import Notification from '@/components/Notification.vue'

export default {
     name: 'Post',
     props: {
          post: Object,
          id: String,
          username: String,
          currentUser: String,
          preview: Boolean
     },
     components: {
          Spinner,
          Modal,
          Notification
     },
     data() {
          return {
               postData: [],
               isLoading: true,
               message: '',
               token: ''
          }
     },
     async created() {
          // Get token
          this.token = localStorage.getItem('vueblog-token')
          // Information is passed as props => do not fetch data
          if(this.post) {
               this.postData = this.post
               this.isLoading = false
               return 
          // Information is not passed as props => fetch data by username and id
          } else {
               try{
                    const response = await fetch(`http://167.99.138.67:1111/getsinglepost/${this.username}/${this.id}`)
                    if (response.status !== 200) throw new Error('Connection error')
                    const data = await response.json()
                    this.postData = data.data
                    this.isLoading = false
               } catch(err){
                    this.message = err
               }
          }
     },
     methods:{
          formatDate: function(unix){
               return new Date(unix).toLocaleString()
          },
          redirectTo: function(path){
               this.$router.push(path)
          },
          deletePost:  async function() {
               // Confirm dialog
               const isConfirmed = await this.$refs.confirmModal.show('Are you sure you want to delete this post?')
               if(!isConfirmed) return
               // Confirmed delete
               try{
                    const formData = {
                         id: this.postData.id,
                         secretKey : this.token
                    }
                    console.log(formData);
                    const response = await fetch('http://167.99.138.67:1111/deletepost', {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify(formData)
                    })
                    if (response.status !== 200) throw new Error('Connection error')
                    const data = await response.json()
                    if (!data.success) throw data.message
                    // Post deleted successfully
                    if(data.success){
                         this.$router.push('/')
                    }
               } catch(err){
                    this.message = err
               }
          }
     },
     computed:{
          isPreviewOrSinglePost: function(){
               return this.preview ? false : !this.id
          }
     }
}
</script>

<style scoped>
.post{
     display: inline-block;
     border-radius: 10px;
     width: 100%;
     margin: 15px auto;
     padding: 20px;
     overflow-wrap: break-word;
     box-shadow: 0 2px 5px 1px rgba(0,0,0,0.2);
     position: relative;
}
.post__title{
     margin-bottom: 20px;
}
.post a{
     color: var(--primary);
     font-weight: 500;
}
.post__description{
     margin-top: 20px;
     margin-bottom: 10px;
     font-size: 14px;
}
.post__img{
     overflow: hidden;
}
.post__img img{
     display: inline-block;
     width: 100%;
}
.post__controls{
     margin-top: 10px;
}
.post__controls button:last-child{
     margin-left: 10px;
}
</style>