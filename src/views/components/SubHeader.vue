<template>
  <v-row class="mt-2">
        <v-container fluid>
            <template>
                <v-subheader class="pl-0">
                    <p class="font-weight-bold text-uppercase black--text text-h6 mb-0">
                        {{subHeaderTitle}}
                    </p>
                    <div>
                        <small></small>
                    </div>
                </v-subheader>
                <v-divider class="mt-0 pt-0"></v-divider>
            </template>
        </v-container>
    </v-row>
</template>

<script>
export default {
    name: 'SubHeader',
    props: {
        subHeaderTitle: String
    }
}
</script>