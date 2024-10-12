<template>
    <div id="app" class="flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 class="text-2xl font-bold text-center text-black mb-6">Log in to Minimify</h1>
            <div class="my-6 border-t border-gray-300"></div>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm text-gray-600 mb-1" for="email">Email or username</label>
                    <input id="email" type="text" v-model="form.email"
                        class="w-full px-3 py-2 bg-gray-100 text-black rounded border border-gray-300 focus:outline-none focus:border-black"
                        placeholder="Email or username" :class="{ 'border-red-500': errors.email }" />
                    <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                </div>
                <div>
                    <label class="block text-sm text-gray-600 mb-1" for="password">Password</label>
                    <div class="relative">
                        <input id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password"
                            class="w-full px-3 py-2 bg-gray-100 text-black rounded border border-gray-300 focus:outline-none focus:border-black"
                            placeholder="Password" :class="{ 'border-red-500': errors.password }" />
                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                            class="absolute right-3 top-3 text-gray-600 cursor-pointer"
                            @click="togglePasswordVisibility"></i>
                    </div>
                    <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
                </div>
                <button @click="submitForm" class="w-full bg-black text-white py-2 rounded-full font-bold">Log
                    In</button>
            </div>
            <div class="text-center mt-4">
                <a href="#" class="text-sm text-gray-600 hover:underline">Forgot your password?</a>
            </div>
            <div class="text-center mt-4">
                <span class="text-sm text-gray-600">Don't have an account?
                    <a href="#" class="text-black hover:underline">Sign up for Minimify</a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            showPassword: false,
            errors: {},
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        submitForm() {
            this.errors = {};
            if (!this.form.email) {
                this.errors.email = 'Email or username is required';
            }
            if (!this.form.password) {
                this.errors.password = 'Password is required';
            }
            if (!this.errors.email && !this.errors.password) {
                alert('Form submitted!');
                // Here you can handle the form submission, such as making API calls.
            }
        },
    },
};
</script>

<style scoped>
body {
    background: #ffffff;
    font-family: 'Poppins', sans-serif;
}
</style>