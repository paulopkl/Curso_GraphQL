<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Remove Profile</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Erros :erros="errors" />
                    </div>
                    <v-text-field label="ID" v-model.number="filter.id" />
                    <v-text-field label="Nome" v-model="filter.name" />

                    <v-btn color="error" class="ml-0 mt-3" @click="removeProfile">
                        Remove Profile
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
                        <v-text-field label="Label" readonly v-model="data.label" />
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
        removeProfile() {
            this.$api.mutate({
                mutation: graphql`
                    mutation (
                        $id: Int
                        $name: String
                    ) {
                        removeProfile (
                            filter: {
                                id: $id
                                name: $name
                            }
                        ) {
                            id
                            name
                            label
                        }
                    }
                `,
                variables: {
                    id: this.filter.id,
                    name: this.filter.name
                }
            })
            .then(result => {
                this.data = result.data.removeProfile;
                this.filter = {}
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
