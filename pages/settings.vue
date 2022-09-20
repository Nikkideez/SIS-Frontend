<template>
  <v-container fluid>
    <!-- <v-col> md="x" must total to 12 in example below 7+5=12 -->
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="7">
        <v-card class="pa-2" outlined tile>
          Section 1 // Change the v-col md=8 to md=12 to make it full width
        </v-card>
      </v-col>
      <v-col cols="6" md="5">
        <v-card class="pa-2" outlined tile>
          Section 2 // use me if confused https://vuetifyjs.com/en/components/grids/#v-col
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <blockquote class="blockquote">
          This section is for Darshan
          <footer>
            <small>
              <em>&mdash;Jason</em>
            </small>
          </footer>
        </blockquote>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SettingsPage'
}
</script>
