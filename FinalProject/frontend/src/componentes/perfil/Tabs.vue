<template>
    <v-container fluid>
        <v-tabs color="grey lighten-3"
            slider-color="blue">
            <v-tab ripple>
                List
            </v-tab>

            <v-tab ripple>
                Query
            </v-tab>

            <v-tab ripple>
                New
            </v-tab>

            <v-tab ripple>
                Alter
            </v-tab>
            
            <v-tab ripple>
                Remove
            </v-tab>

            <v-tab-item>
                <List />
            </v-tab-item>

            <v-tab-item>
                <Query />
            </v-tab-item>

            <v-tab-item>
                <New />
            </v-tab-item>
            
            <v-tab-item>
                <Alter />
            </v-tab-item>
            
            <v-tab-item>
                <Remove />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import List from './List'
import Query from './Query'
import New from './New'
import Alter from './Alter'
import Remove from './Remove'

export default {
    components: { List, Query, New, Alter, Remove }
}
</script>

<style></style>