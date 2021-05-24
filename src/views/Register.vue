<template>
  <div class="register">
    <modal-comp/>      
  </div>
</template>

<script>
import modalComp from '../components/modalComp.vue'

export default{ 
    name: 'Register',
    components: { 
      modalComp 
    }
}
</script>