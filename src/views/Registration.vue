<template>
  <main class="register">
    <div class="container">

     <div class="register__header">
          <img class="logo img-fluid" src="../assets/img/blog.jpg" alt="blog"/>
          <h1 class="heading-1">Registration</h1>
          <p>Please fill the form</p>
     </div>

      <RegistrationForm/>

      <router-link to="/login">Already have an account</router-link>
    </div>
  </main>
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue'
export default {
  name: 'Registration',
  components: {
    RegistrationForm
  }
}
</script>

<style scoped>
.register{
  text-align: center;
  height: 50%;
  margin: 100px auto auto auto;
}
.register .container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.register__header{
  margin-bottom: 20px;
}
.register__header h1{
  margin-top: 20px;
}
.register__header .logo{
  width: 100%;
}
.register a{
  margin-top: 15px;
  color: var(--primary);
}
</style>