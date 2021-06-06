<template>
    <p>{{message}}</p>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        message: String
    }
}
</script>

<style scoped>
p{
    text-align: center;
    margin: 10px 0;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
}
</style>