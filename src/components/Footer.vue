<template>
  <footer>
    <p>© {{new Date().getFullYear()}} VueBlog. All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
  footer{
    background-color: #333;
    font-size: 14px;
    color: #fff;
    width: 100%;
    padding: 20px 5px;
    text-align: center;
    margin-top: 20px;
  }
</style>
