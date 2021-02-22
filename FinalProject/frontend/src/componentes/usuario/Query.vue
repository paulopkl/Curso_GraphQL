<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Query User</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Erros :erros="errors" />
                        </div>
                        <v-text-field label="ID" v-model.number="filter.id" />
                        <v-text-field label="E-mail" v-model="filter.email" />
                        <v-btn color="primary" class="ml-0 mt-3" @click="query">
                            Query
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
                        <v-text-field label="Profiles" readonly :value="profilesLabel" />
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
            filter: {},
            profiles: [],
            data: null,
            errors: null
        }
    },
    computed: {
        profilesLabel() {
            return this.data && this.data.profiles && this.data.profiles.map(p => p.label).join(', ');
        }
    },
    methods: {
        query() {
            this.$api.query({
                query: graphql`
                    query (
                        $id: Int 
                        $email: String
                    ) {
                        user (
                            filter: {
                                id: $id
                                email: $email
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
                    id: this.filter.id,
                    name: this.filter.name
                },
                fetchPolicy: 'network-only'
            })
            .then(result => {
                this.data = result.data.user;
                this.filter = {};
                this.errors = null;
            })
            .catch(err => {
                this.errors = err;
            });
        }
    }
}
</script>

<style></style>