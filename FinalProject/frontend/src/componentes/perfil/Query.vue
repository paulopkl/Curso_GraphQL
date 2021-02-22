<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Get Profiles</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Erros :erros="errors" />
                        </div>
                        <v-text-field label="ID" v-model.number="profile.id" />
                        <v-text-field label="Name" v-model="profile.name" />
                        <v-btn color="primary" class="ml-0 mt-3" @click="consultar">
                            GET
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
            profile: {},
            profiles: [],
            data: null,
            errors: null
        }
    },
    methods: {
        consultar() {
            this.$api.query({
                query: graphql`
                    query (
                        $id: Int
                        $name: String
                    ) {
                        profile (
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
                    id: this.profile.id,
                    name: this.profile.name,
                }
            })
            .then(result => {
                this.data = result.data.profile;
                this.profile = {};
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
