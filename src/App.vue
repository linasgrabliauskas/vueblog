<template>

  <div id="app">
    <Header :authenticated="authenticated" @logout="logout"/>
    <router-view/>
    <Footer/>
  </div>

</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data(){
    return {
      authenticated: false
    }
  },
  mounted(){
    const token = localStorage.getItem('vueblog-token')
    if(token){
      this.authenticated = true
    }
  },
  updated(){
    const token = localStorage.getItem('vueblog-token')
    if(token){
      this.authenticated = true
    }
  },
  methods:{
    logout: function(){
      localStorage.removeItem("vueblog-token")
      localStorage.removeItem("vueblog-username")
      this.authenticated = false
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap');

/* Reset */
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Global */
:root{
  /* Fonts */
  --main-font: 'Poppins', sans-serif;
  /* Colors */
  --primary: #1d5ae7;
}

#app {
  min-height: 100vh;
  font-family: var(--main-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main{
  margin-top: 70px;
  min-height: 100vh;
}

ul{
  list-style-type: none;
}
a{
  text-decoration: none;
  color: #333;
}

/* Utilities */
.container{
  padding: 0 15px;
  min-height: 100%;
}

.btn{
  display: inline-block;
  padding: 10px 24px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  background-color: var(--primary);
  color: #fff;
}

.heading-1{
  font-size: 26px;
  font-weight: 500;
}
.heading-2{
  font-size: 20px;
  font-weight: 500;
}

.img-fluid{
  max-width: 100%;
}

.truncate {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
  .container{
    padding: 0 30px;
  }
  main{
    margin-top: 100px;
  }
  .btn:hover{
    opacity: 0.8;
    cursor: pointer;
  }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
  .container{
    padding: 0 45px;
  }
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { 
  .container{
    padding: 0;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
