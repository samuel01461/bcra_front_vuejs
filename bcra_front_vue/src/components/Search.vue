<template>
    <form @submit.prevent="search">
        <label class="mb-2" for="cuit">Ingrese CUIT: </label>
    <input type="text" name="cuit" id="cuit" v-model="cuit" class="mb-2 form-control" />
    <button class="btn btn-success">Consultar</button><br>
    <p class="error_message" v-if="error">{{  error_msg  }}</p>
    {{ scoring }}
    </form>
</template>

<script>
 export default {
    data() {
        return {
            cuit: '',
            scoring: '',
            error_msg: '',
            error: false
        }
    },
    methods: {
        async search() {
            var res = await this.$store.dispatch('search', { cuit: this.cuit });
            if (res.data.errorMessage) {
                this.error = true;
                this.error_msg = res.data.errorMessage;
                this.scoring = '';
            } else {
                this.error = false;
                this.error_msg = '';
                this.scoring = res.data.scoring;
            }
        }
    }
 }
</script>

<style scoped>
.error_message {
    color: red;
    font-weight: bold;
}
</style>