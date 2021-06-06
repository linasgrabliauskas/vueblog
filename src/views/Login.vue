<template>
  <main class="login">
    <div class="container">

      <div class="login__header">
        <img class="logo img-fluid" src="../assets/img/blog.jpg" alt="blog"/>
        <h1 class="heading-1">Sign In</h1>
        <p>Please sign in to continue</p>
      </div>

      <LoginForm/>
      
      <router-link to="/register">Create new account</router-link>
    </div>
  </main>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<style scoped>
.login{
  text-align: center;
  height: 50%;
  margin: 100px auto auto auto;
}
.login .container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login__header{
  margin-bottom: 20px;
}
.login__header h1{
  margin-top: 20px;
}
.login__header .logo{
  width: 100%;
}
.login a{
  margin-top: 15px;
  color: var(--primary);
}
</style>