<template>
    <div class="modal" ref="modal" v-if="isOpen">
        <div class="modal__content">
            <p>{{message}}</p>

            <div class="modal__controls">
                <button @click="confirm"  class="btn" aria-label="confirm" >Confirm</button>
                <button @click="cancel" class="btn cancel" aria-label="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Modal',
    data(){
        return{
            isOpen: false,
            message: '',
            resolvePromise: undefined,
            rejectPromise: undefined
        }
    },
    methods: {
        cancel: function() {
            this.isOpen = false
            this.resolvePromise(false)
        },
        confirm: function(){
            this.isOpen = false
            this.resolvePromise(true)
        },
        show: function(message){
            // Setup
            this.message = message
            // Open modal
            this.isOpen = true
            // Send answer
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        }
    }
}
</script>

<style scoped>
.modal {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%; 
    z-index: 99;
}
.modal__content {
    background-color: #fff;
    margin: 10% auto 10% auto;
    width: 80%;
    padding: 15px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.modal__controls{
    margin-top: 15px;
}
.modal__controls button{
    margin: 6px;
}
.cancel{
    background-color: #f44336;
}
</style>