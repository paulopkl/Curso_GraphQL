<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filter Profile</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Erros :erros="errors" />
                    </div>
                    <v-text-field label="ID" v-model.number="filter.id" />
                    <v-text-field label="Name" v-model="filter.name" />

                    <h1 class="mt-4 headline">Alter Profile</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Name" v-model="profile.name" />
                    <v-text-field label="Label" v-model="profile.label" />

                    <v-btn color="primary" class="ml-0 mt-3" @click="alterProfile">
                        Alter Profile
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
            profile: {},
            data: null,
            errors: null
        }
    },
    methods: {
        alterProfile() {
            this.$api.mutate({
                mutation: graphql`
                    mutation (
                        $filter_id: Int
                        $filter_name: String
                        $profile_name: String!
                        $profile_label: String!
                    ) {
                        alterProfile (
                            filter: {
                                id: $filter_id
                                name: $filter_name
                            }
                            data: {
                                name: $profile_name
                                label: $profile_label
                            }
                        ) {
                            id
                            name
                            label
                        }
                    }
                `,
                variables: {
                    filter_id: this.filter.id,
                    filter_name: this.filter.name,
                    profile_name: this.profile.name,
                    profile_label: this.profile.label
                }
            })
            .then(result => {
                this.data = result.data.alterProfile;
                this.filter = {}
                this.profile = {}
                this.errors = null
            })
            .catch(err => {
                this.errors = err;
            });
        }
    }
}
</script>

<style></style>