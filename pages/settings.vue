<template>
  <v-container>
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
    <div><h1>Profile Settings</h1></div>
    <br>
    <v-row allign="center" justify="center">
      <div id ="personalSettingsPage">
        <v-form ref="form" v-model="valid">
          <v-text-field
              v-model="fullnameSettings"
              label="Full name"
            ></v-text-field>
            <v-text-field
              v-model="emailSettings"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="passwordSettings"
              label="Password"
              required
            ></v-text-field>            
            <v-menu
              ref="menu"
              v-model="birthdaySettingsMenu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Birthday"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn
            color="success"
            class="mr-4"
            @click="saveSettingChanges"
          >
            Save Changes
          </v-btn>
          <v-btn
            color="error"
            class="mr-4"
            @click="resetSettingChanges"
          >
            Cancel
          </v-btn>
        </v-form>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SettingsPage',

}
</script>
