<template>
     <section class="post-list__wrapper">
          <div class="spinner__container"><Spinner v-if="isLoading"/></div>

          <div class="post-list__filter" v-if="!username">
               <select v-model="selected">
                    <option value="">Show posts from:</option>
                    <option>Yesterday</option>
                    <option>Last week</option>
                    <option>Last month</option>
               </select>
          </div>

          <ul class="posts-list" :class="{user : username}" v-if="!isLoading" >
               <Post v-for="post in posts" :key="post.id" :post="post" :currentUser="currentUser"/>
          </ul>

          <Notification :message="message"/>
     </section>
</template>

<script>
import Post from '@/components/Post.vue'
import Spinner from '@/components/Spinner.vue'
import Notification from '@/components/Notification.vue'

export default {
     name: 'PostList',
     components: {
          Post,
          Spinner,
          Notification
     },
     props: {
          username: String
     },
     data() {
          return {
               posts: [],
               isLoading: true,
               currentUser: '',
               selected: '',
               initialPosts: [],
               message: ''
          }
     },
     async created() {
          try{
               // If username prop exists, fetch only particular user posts
               const url = this.username 
               ? `http://167.99.138.67:1111/getuserposts/${this.username}`
               : 'http://167.99.138.67:1111/getallposts'
               const response = await fetch(url)
               if (response.status !== 200) throw new Error('Connection error')
               const data = await response.json()
               this.posts = data.data
               // Store initial posts for filtering
               this.initialPosts = data.data
               this.isLoading = false
          } catch(err){
               this.message = err
          }
     },
     mounted(){
          this.currentUser = localStorage.getItem('vueblog-username')
     },
     watch: {
          selected: function (filter) {
               const timestampNow = new Date().getTime()
               if(filter === 'Yesterday'){
                    const yesterday = timestampNow - 24 * 60 * 60 * 1000
                    this.posts = this.initialPosts.filter(post => post.timestamp > yesterday)
               } else if(filter === 'Last week'){
                    const lastWeek = timestampNow - 7 * 24 * 60 * 60 * 1000
                    this.posts = this.initialPosts.filter(post => post.timestamp > lastWeek)
               } else if(filter === 'Last month'){
                    const lastMonth = timestampNow - 31 * 24 * 60 * 60 * 1000
                    this.posts = this.initialPosts.filter(post => post.timestamp > lastMonth)
               } else {
                    this.posts = this.initialPosts
               }
          }
     }
}
</script>

<style scoped>
.posts-list{
     list-style: none;
     column-count: 1;
}
.posts-list.user{
     column-count:auto;
}
.spinner__container{
     margin-top: 40px;
}
select, option{
     padding: 8px;
     border: none;
     background-color: rgba(153, 153, 153, 0.308);
}
select:focus, option:focus{
     outline: 0;
     box-shadow: 0 0 0 3px rgba(15, 74, 138, 0.6);
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
     .posts-list{
          column-count: 2;
          column-gap: 15px;
     }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
     .posts-list{
          column-count: 3;
          column-gap: 20px;
     }
}
</style>