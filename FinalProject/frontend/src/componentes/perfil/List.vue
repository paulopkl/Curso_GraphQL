<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4" @click="getProfiles">
                    Get Profiles
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="errors" class="mb-4">
                    <Erros :erros="errors" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="profiles" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.label }}</td>
                    </template>
                </v-data-table>
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
            errors: null,
            profiles: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Label', value: 'label' },
            ],
        }
    },
    methods: {
        getProfiles() {
            this.$api.query({
                query: graphql`
                    {
                        profiles {
                            id
                            name
                            label
                        }
                    }
                `,
                fetchPolicy: 'network-only'
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

<style>

</style>
