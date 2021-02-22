<template>
    <v-container fluid>
        <v-tabs
            color="grey lighten-3"
            slider-color="blue">
            <v-tab ripple>
                Register
            </v-tab>
            <v-tab ripple>
                Login
            </v-tab>
            <v-tab-item>
                <Register />
            </v-tab-item>
            <v-tab-item>
                <Login />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import Register from './Register';
import Login from './Login';

export default {
    components: { Register, Login }
}
</script>

<style></style>
