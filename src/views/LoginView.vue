<template>
  <div>
    <LoginComponent/>
  </div>
</template>

<script>
import LoginComponent from "../components/LoginComponent.vue"

export default {
    // Change "methods" to "components"
    components: {
        LoginComponent
    }
}
</script>