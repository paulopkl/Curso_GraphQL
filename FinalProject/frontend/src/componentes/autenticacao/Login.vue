<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">LogIn</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Erros :erros="errors" />
                        </div>
                        <v-text-field label="E-mail" v-model="user.email" />
                        <v-text-field label="Password" v-model="user.password" type="password" />
                        <v-btn color="primary" class="ml-0 mt-3" @click="login">
                            LogIn
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
                        <v-text-field label="Token" readonly v-model="data.token" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
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
            return this.data && this.data.profiles && this.data.profiles.map(p => p.name).join(',');
        }
    },
    methods: {
        ...mapActions(['setUser']),
        login() {
            this.$api.query({
                query: graphql`
                    query (
                        $email: String!
                        $password: String!
                    ) {
                        login(
                            data: {
                                email: $email,
                                password: $password
                            }
                        ) {
                            id
                            name
                            email
                            token
                            profiles {
                                name
                                label
                            }
                        }
                    }
                `,
                variables: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(result => {
                this.data = result.data.login;
                this.user = {};
                this.errors = null;
                this.setUser(this.data);
            })
            .catch(err => {
                this.errors = err;
            })
        }
    }
}
</script>

<style></style>