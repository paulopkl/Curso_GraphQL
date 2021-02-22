<template>
    <v-card v-if="user" class="ma-3 pa-2">
        <v-layout fill-height align-center>
            <v-flex>
                <span class="ml-3 headline"><strong>ID: </strong></span>
                <span class="headline blue--text text--darken-2">{{ user.id }}</span>
                <!--  -->
                <span class="ml-3 headline"><strong>Name: </strong></span>
                <span class="headline blue--text text--darken-2">{{ user.name }}</span>
                <!--  -->
                <span class="ml-3 headline"><strong>Email: </strong></span>
                <span class="headline blue--text text--darken-2">{{ user.email }}</span>
                <!--  -->
                <span class="ml-3 headline"><strong>Profiles: </strong></span>
                <span class="headline red--text text--darken-2">{{ profiles }}</span>
            </v-flex>
            <v-flex>
            </v-flex>
            <v-flex shrink>
                <v-btn color="error" @click="setUser(null)">
                    Exit
                </v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['user']),
        profiles() {
            if(!this.user && !this.user.profiles) return null;
            return this.user.profiles.map(p => p.label).join(', ');
        }
    },
    methods: mapActions(['setUser'])
}
</script>

<style></style>