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
          <input 
               type="password" 
               placeholder="Confirm Password" 
               aria-label="Confirm password" 
               v-model="passwordConfirm"
               ref="passwordConfirm"
          />
          <button class="btn" aria-label="register">Register</button>
          <Notification :message="message"/>
     </form>
</template>

<script>
import Notification from '@/components/Notification.vue'

export default {
     name: 'RegistrationForm',
     components: {
          Notification
     },
     data() {
          return {
               username: '',
               password: '',
               passwordConfirm: '',
               message: ''
          }
     },
     methods:{
          validateInputLength: function (input, length) {
               return input.length >= length
          },
          validatePassword: function(password, confirmPassword){
               return password === confirmPassword
          },
          handleSubmit: async function() {
               // Validate username
               if(!this.validateInputLength(this.username, 5)){
                    this.$refs.username.focus()
                    this.message = "Username has to be at least 5 symbols length"
               } 
               // Validate passwords
               else if (!this.validateInputLength(this.password, 5)) {
                    this.$refs.password.focus()
                    this.message = "Password should be at least 5 symbols length" 
               }
               else if (!this.validatePassword(this.password, this.passwordConfirm)) {
                    this.$refs.passwordConfirm.focus()
                    this.message = "Passwords should match" 
               }
               // Validation success
               else {
                    try{
                         const formData = {
                              name: this.username,
                              passwordOne : this.password,
                              passwordTwo: this.passwordConfirm
                         }
                         const response = await fetch('http://167.99.138.67:1111/createaccount', {
                              method: 'POST',
                              headers: {'Content-Type': 'application/json'},
                              body: JSON.stringify(formData)
                         })
                         const data = await response.json()
                         if (!data.success) throw data.message
                         // Registration successfull
                         if(data.success){
                              this.$router.push('/login')
                         }
                    } catch(err){
                         this.message = err
                    }
               }
          }
     },
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