<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">New User</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Erros :erros="errors" />
                        </div>
                        <v-text-field label="Name" v-model="user.name" />
                        <v-text-field label="E-mail" v-model="user.email" />
                        <v-text-field label="Password" v-model="user.password" type="password" />
                        <v-select label="Profiles" v-model="user.profiles" :items="profiles" item-value="id"
                            item-text="label" attach multiple chips deletable-chips />
                        <v-btn class="ml-0 mt-3" @click="getProfiles">
                            Get Profiles
                        </v-btn>
                        <v-btn color="primary" class="ml-0 mt-3" @click="newUser">
                            Create User
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
                        <v-text-field label="Email" readonly v-model="data.email" />
                        <v-text-field label="Profiles" readonly :value="labelProfiles" />
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
            profiles: [],
            // profiles: [
            //     { id: 1, label: "Administrador" }
            // ],
            data: null,
            errors: null
        }
    },
    computed: {
        labelProfiles() {
            return this.data && this.data.profiles && this.data.profiles.map(p => p.label).join(', ');
        },
        selectsProfiles() {
            if(this.user.profiles) return this.user.profiles.map(id => ({ id }));
            else return null;
        }
    },
    methods: {
        newUser() {
            this.$api.mutate({
                mutation: graphql`
                    mutation (
                        $name: String!
                        $email: String!
                        $password: String!
                        $profiles: [ProfileFilter]
                    ) {
                        newUser (
                            data: {
                                name: $name
                                email: $email
                                password: $password
                                profiles: $profiles
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
                variables: {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    profiles: this.selectsProfiles
                }
            })
            .then(result => {
                this.data = result.data.newUser;
            })
            .catch(err => {
                this.errors = err;
            })
        },
        getProfiles() {
            this.$api.query({
                query: graphql`
                    {
                        profiles {
                            id label
                        }
                    }
                `
            })
            .then(result => {
                this.profiles = result.data.profiles;
                this.errors = null;
            })
            .catch(err => {
                this.errors = err;
            })
        }
    }
}
</script>

<style></style>