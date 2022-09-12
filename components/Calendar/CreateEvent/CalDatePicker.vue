<template>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="menuLabel"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="saveBtn($refs.menu)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
</template>

<script>
export default {
  name: 'CalDatePicker',
  props: ['menuLabel'],
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
  }),
  methods: {
    // Save the date and pass it back to the parent
    saveBtn(ref) {
      ref.save(this.date);
      this.$emit('passDate', this.date);
    }
  }
};
</script>
