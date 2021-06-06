<template>
     <form v-on:submit.prevent="handleSubmit">
          <input 
               type="text" 
               placeholder="Username" 
               aria-label="username"
               v-model="username"
               ref="username"
               autofocus
          />
          <input 
               type="password" 
               placeholder="Password" 
               aria-label="Password" 
               v-model="password"
               ref="password"
          />
          <button class="btn" aria-label="log in">Log In</button>   
          <Notification :message="message"/>
     </form>
</template>

<script>
import Notification from '@/components/Notification.vue'

export default {
     name: 'LoginForm',
     components: {
          Notification
     },
     data() {
          return {
               username: '',
               password: '',
               message: ''
          }
     },
     methods:{
          validateInputLength: function (input, length) {
               return input.length >= length
          },
          handleSubmit: async function() {
               // Validate username
               if(!this.validateInputLength(this.username, 5)){
                    this.$refs.username.focus()
                    this.message = "Username has to be at least 5 symbols length"
               } 
               // Validate password
               else if (!this.validateInputLength(this.password, 1)) {
                    this.$refs.password.focus()
                    this.message = "Please enter your password" 
               }
               // Validation success
               else {
                    try{
                         const loginData = {
                              name: this.username,
                              password: this.password
                         }
                         const response = await fetch('http://167.99.138.67:1111/login', {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify(loginData)
                         })
                         const data = await response.json()
                         if (!data.success) throw data.message
                         // Authenticated successfully
                         if(data.success){
                              localStorage.setItem('vueblog-token', data.secretKey)
                              localStorage.setItem('vueblog-username', this.username)
                              this.$router.push('/')
                         }
                    } catch(err){
                         this.message = err
                    }
               }
          }
     }
}
</script>

<style scoped>
form{
     width: 100%;
     display: flex;
     flex-direction: column;
}
form input{
     width: 100%;
     margin-bottom: 10px;
     padding: 8px;
     padding-left: 20px;
     border: none;
     border-radius: 20px;
     background-color: rgba(153, 153, 153, 0.308);
     font-size: 14px;
}
form input:focus{
     outline: 0;
     box-shadow: 0 0 0 3px rgba(15, 74, 138, 0.6);
}
form button{
     margin-top: 10px;   
} 

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
     form{
          max-width: 300px;
     }
}
</style>