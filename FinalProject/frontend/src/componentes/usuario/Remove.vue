<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Remove User</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Erros :erros="errors" />
                    </div>
                    <v-text-field label="ID" v-model.number="filter.id" />
                    <v-text-field label="E-mail" v-model="filter.email" />

                    <v-btn color="error" class="ml-0 mt-3" @click="removeUser">
                        Remove User
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
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import graphql from 'graphql-tag';
import Erros from '../comum/Erros';

export default {
    components: { Erros },
    data() {
        return {
            filter: {},
            data: null,
            errors: null
        }
    },
    methods: {
        removeUser() {
            this.$api.mutate({
                mutation: graphql`
                    mutation (
                        $id: Int
                        $email: String
                    ) {
                        removeUser (
                            filter: {
                                id: $id
                                email: $email
                            }
                        ) {
                            id
                            name
                            email
                        }
                    }
                `,
                variables: {
                    id: this.filter.id,
                    email: this.filter.email
                }
            })
            .then(result => {
                this.data = result.data.removeUser;
                this.filter = {};
                this.errors = null;
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
