<template>
     <form v-on:submit.prevent="handleSubmit" novalidate ref="form">
          <Modal ref="confirmModal"/>
          <Notification :message="message"/>
          <input 
            type="text" 
            placeholder="Title" 
            aria-label="new post title"
            v-model="inputs.title"
            ref="title"
            autofocus
          />
          <input 
            type="url" 
            placeholder="Add image URL" 
            aria-label="Add image URL" 
            v-model="inputs.imageUrl"
            ref="image"
          />
          <textarea 
            placeholder="Description" 
            aria-label="new post description" 
            v-model="inputs.description"
            ref="description"
          />
          <button v-if="!editing" class="btn" aria-label="create new post">Create post</button>
          <button v-if="editing" class="btn" aria-label="update post">Update post</button>
     </form>
</template>

<script>
import Modal from '@/components/Modal.vue'
import Notification from '@/components/Notification.vue'

export default {
     name: 'PostForm',
     components: {
          Modal,
          Notification
     },
     props: {
          editing: Boolean,
          id: String
     },
     data() {
          return {
               inputs: {
                    title: '',
                    imageUrl: '',
                    description: ''
               },
               token: '',
               username: '',
               message: ''
          }
     },
     async created() {
          this.token = localStorage.getItem('vueblog-token')
          this.username = localStorage.getItem('vueblog-username')
          if(!this.editing) return
          // If Updating(editing) post, get current post data
          try{
               const response = await fetch(`http://167.99.138.67:1111/getsinglepost/${this.username}/${this.id}`)
               if (response.status !== 200) throw new Error('Connection error')
               const data = await response.json()
               if (!data.success) throw data.message
               this.inputs.title = data.data.title
               this.inputs.description = data.data.description
               this.inputs.imageUrl = data.data.image
          } catch(err){
               this.message = err
          }
     },
     methods:{
          validateInputLength: function (input, length) {
               return input.length >= length
          },
          validateImageUrl: function (input) {
               const imageUrlRe = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif))','i')
               return imageUrlRe.test(input)
          },
          createPost: async function() {
               try{
                    const formData = {
                         title: this.inputs.title,
                         description : this.inputs.description,
                         image: this.inputs.imageUrl,
                         secretKey : this.token,
                    }
                    const response = await fetch('http://167.99.138.67:1111/createpost', {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify(formData)
                    })
                    if (response.status !== 200) throw new Error('Connection error')
                    const data = await response.json()
                    if (!data.success) throw data.message
                    // Post created successfully
                    if(data.success){
                         this.message = "Post created successfully" 
                         // Reset form
                         this.inputs.title = ''
                         this.inputs.imageUrl = ''
                         this.inputs.description = ''
                    }
               } catch(err){
                    this.message = err
               }
          },
          updatePost: async function() {
               // Confirm dialog
               const isConfirmed = await this.$refs.confirmModal.show('Are you sure you want to update this post?')
               if(!isConfirmed) return
               // Confirmed update
               try{
                    const formData = {
                         title: this.inputs.title,
                         description : this.inputs.description,
                         image: this.inputs.imageUrl,
                         secretKey : this.token,
                         id: this.id
                    }
                    const response = await fetch('http://167.99.138.67:1111/updatepost', {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify(formData)
                    })
                    if (response.status !== 200) throw new Error('Connection error')
                    const data = await response.json()
                    if (!data.success) throw data.message
                    // Post created successfully
                    if(data.success){
                         this.message = "Post updated successfully" 
                    }
               } catch(err){
                    this.message = err
               }
          },
          handleSubmit: function() {
               // Validate title
               if(!this.validateInputLength(this.inputs.title, 20)){
                    this.$refs.title.focus()
                    this.message = "Title must be at least 20 symbols length"
               } 
               // Validate image url
               else if (!this.validateImageUrl(this.inputs.imageUrl)){
                    this.$refs.image.focus()
                    this.message = "Please enter valid URL adress, URL should include 'http/https' and end with: .png, .jpg, .jpeg, .gif" 
               }
               // Validate description
               else if (!this.validateInputLength(this.inputs.description, 50)) {
                    this.$refs.description.focus()
                    this.message = "Description must be at least 50 symbols length" 
               }
               // Validation success
               else {
                    this.editing ? this.updatePost() : this.createPost()
               }
          }
     },
     watch: {
          inputs: {
               handler: function(inputs) {
                    this.$emit('formChange', inputs)
               },
               deep: true
          }
     }
}
</script>

<style scoped>
form{
  display: flex;
  flex-direction: column;
  position: relative;
}
form input, form textarea{
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  padding-left: 20px;
  border: none;
  border-radius: 20px;
  background-color: rgba(153, 153, 153, 0.308);
  font-size: 14px;
}
form input:focus, form textarea:focus{
  outline: 0;
  box-shadow: 0 0 0 3px rgba(15, 74, 138, 0.6);
}
form textarea{
     height: 150px;
}
form button{
  margin-top: 10px;
} 
</style>