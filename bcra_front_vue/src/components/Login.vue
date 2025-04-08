<template>
    <div name="login" class="container">
        <img src="/images.png" class="mb-4">
        <form @submit.prevent="login">
            <input v-model="username" class="form-control" name="username" placeholder="Usuario" type="text"><br>
            <input v-model="password" class="form-control" name="password" placeholder="Clave" type="password"><br>
            <button class="btn btn-primary" type="submit">Login</button>
            <p v-if="error" class="error_message">Login incorrecto</p>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            error: false
        }
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch('login', { username: this.username, password: this.password});
                this.error = false;
                this.$router.push({ path: "/search" });
            } catch (e) {
                this.error = true;
            }
        }
    }
}
</script>

<style scoped>
    .error_message {
        font-weight: bold;
        color: red;
    }
</style>