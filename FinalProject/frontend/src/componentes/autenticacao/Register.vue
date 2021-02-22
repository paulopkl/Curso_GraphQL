<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Register</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Erros :erros="errors" />
                        </div>
                        <v-text-field label="Name" v-model="user.name" />
                        <v-text-field label="E-mail" v-model="user.email" />
                        <v-text-field label="Password" v-model="user.password" type="password" />
                        <v-btn color="primary" class="ml-0 mt-3" @click="register">
                            Register
                        </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Result</h1>
                    <v-divider />
                    <template v-if="data">
                        <v-text-field label="ID" readonly v-model="data.id" />
                        <v-text-field label="Name" readonly v-model="data.name" />
                        <v-text-field label="E-mail" readonly v-model="data.email" />
                        <v-text-field label="Profiles" readonly :value="profiles" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../comum/Erros';
import graphql from 'graphql-tag';

export default {
    components: { Erros },
    data() {
        return {
            user: {},
            data: null,
            errors: null
        }
    },
    computed: {
        profiles() {
            return this.data && this.data.profiles && this.data.profiles.map(p => p.label).join(',');
        }
    },
    methods: {
        register() {
            this.$api.mutate({
                mutation: graphql`
                    mutation (
                        $name: String!
                        $email: String!
                        $password: String!
                    ) {
                        registerUser(
                            data: {
                                name: $name
                                email: $email
                                password: $password
                            }
                        ) {
                            id
                            name
                            email
                            profiles {
                                label
                            }
                        }
                    }
                `,
                variables: { // Variables that will be injected into the mutation params
                    name:  this.user.name, // These variables don't need the dollar sign
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(result => {
                console.log(result.data);
                this.data = result.data.registerUser;
            })
            .catch(err => {
                this.errors = err;
            })
        }
    }
}
</script>

<style>

</style>