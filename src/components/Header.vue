<template>

  <header>
     <div class="container">
          <nav>
               <div class="logo"><router-link to="/">VueBlog</router-link></div>
               <div class="toggler" 
                    :class="{open : mobileMenuOpen}"
                    @click="toggleMobileMenu"
               ><span></span><span></span><span></span><span></span></div>

               <ul class="menu" :class="{open : mobileMenuOpen}" @click="toggleMobileMenu"> 
                    <li><router-link to="/">Home</router-link></li>
                    <li v-if="authenticated" ><router-link to="/new">Add post</router-link></li>
                    <li v-if="authenticated" @click="logout"><router-link to="/login">Logout</router-link></li>
                    <li v-else><router-link to="/login">Login</router-link></li>
               </ul>
          </nav>
     </div>       
  </header>

</template>

<script>
export default {
     name: 'Header',
     props: {
          authenticated: Boolean,
     },
     data(){
          return{
               mobileMenuOpen: false
          }
     },
     methods: {
          toggleMobileMenu: function() {
               const screenWidth = window.innerWidth
               if(screenWidth > 768) return
               this.mobileMenuOpen = !this.mobileMenuOpen
          },
          logout: function(){
               this.$emit('logout')
          }
     },
}
</script>


<style scoped>
header{
     position: fixed;
     top: 0;
     height: 60px;
     background: #fff;
     width: 100%;
     box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
     z-index: 10;
}
nav{
     padding: 15px 30px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     flex-wrap: wrap;
}
nav .menu{
     display: none;
     padding: 10px 0;
}
nav .menu.open{
     position: fixed;
     left: 0;
     top: 60px;
     display: block;
     width: 100%;
     background-color: #fff;
     text-align: center;
     box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
nav .menu li a{
     display: inline-block;
     padding: 10px 20px;
     color: #333;
     font-weight: 600;
}
.logo{
     font-family: Verdana, Geneva, Tahoma, sans-serif;
     font-weight: 600;
}
.logo a{
     color: #333; 
}
/* Hamburger/Toggler */
.toggler{
     width: 20px;
     height: 24px;
     position: relative;
     -webkit-transform: rotate(0deg);
     -moz-transform: rotate(0deg);
     -o-transform: rotate(0deg);
     transform: rotate(0deg);
     -webkit-transition: .5s ease-in-out;
     -moz-transition: .5s ease-in-out;
     -o-transition: .5s ease-in-out;
     transition: .5s ease-in-out;
     cursor: pointer;
}
.toggler span{
     display: block;
     position: absolute;
     height: 2px;
     width: 100%;
     background: #333;
     opacity: 1;
     left: 0;
     -webkit-transform: rotate(0deg);
     -moz-transform: rotate(0deg);
     -o-transform: rotate(0deg);
     transform: rotate(0deg);
     -webkit-transition: .25s ease-in-out;
     -moz-transition: .25s ease-in-out;
     -o-transition: .25s ease-in-out;
     transition: .25s ease-in-out;
}
.toggler span:nth-child(1) {
     top: 5px;
}
.toggler span:nth-child(2),.toggler span:nth-child(3) {
     top: 10px;
}

.toggler span:nth-child(4) {
     top: 15px;
}
.toggler.open span:nth-child(1) {
     top: 10px;
     width: 0%;
     left: 50%;
}
.toggler.open span:nth-child(2) {
     -webkit-transform: rotate(45deg);
     -moz-transform: rotate(45deg);
     -o-transform: rotate(45deg);
     transform: rotate(45deg);
}
.toggler.open span:nth-child(3) {
     -webkit-transform: rotate(-45deg);
     -moz-transform: rotate(-45deg);
     -o-transform: rotate(-45deg);
     transform: rotate(-45deg);
}
.toggler.open span:nth-child(4) {
     top: 10px;
     width: 0%;
     left: 50%;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
     header{
          top: 0;
          height: auto;
     }
     .toggler{
          display: none; 
     } 
     nav{
          padding: 0;
     }
     nav .menu{
          display: flex;
          padding: 10px 0;
     }  
     nav .menu li a:hover,
     .logo a:hover{
          color: var(--primary)
     }  

}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {    
}
</style>
