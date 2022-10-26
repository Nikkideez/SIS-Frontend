<template>
  <v-dialog v-model="show" width="600">
    <v-card>
      <v-card-title>Select Color</v-card-title>
      <v-list shaped>
        <v-list-item v-for="color in colorKeysArray" :key="color">
          <v-list-item-content>
            <v-list-item-title v-text="color"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-select
              :items="colorsArray"
              :value="colorKeys[color]"
              :v-model="colorKeys[color]"
              outlined
              @click="checkObject(value)"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn text @click="show = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="blue" @click="show = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChangeColorSettings",
  props: ["value"],
  data: () => ({
    colorKeys: {
      Sleep: "blue",
      Fitness: "deep-purple",
      Work: "cyan",
      Leisure: "orange",
      Education: "green",
    },
    colorKeysArray: [],
    colorsArray: [],
  }),
  computed: {
    show: {
      get() {
        // console.log(this.value);
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    // Iterate through an object
    Object.keys(this.colorKeys).forEach((key, index) => {
      this.colorKeysArray.push(key);
      this.colorsArray.push(this.colorKeys[key]);
    });
    console.log('Color Keys Array', this.colorKeysArray);
  },

  methods: {
    checkObject(value) {
        console.log(value)
    }
  }
};
</script>

<style scoped></style>
