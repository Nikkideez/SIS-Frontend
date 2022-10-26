<template>
  <v-dialog v-if="category" v-model="show" width="600">
    <v-card>
      <v-card-title>Recommend Events</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="category.text"
              label="Name"
              :value="category.text"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="category.params.category"
              :items="categories"
              label="Category"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="length"
              :items="lengthDictionary"
              label="Length"
              @change="checkChange"
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              v-model="perDay"
              label="Maximum Events Per Day"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="selectedDays"
              :items="daysDictionary"
              label="Select Days"
              multiple
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="recommendations"
              label="Number of Recommendations"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="show = false" color="red">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="light-blue" @click="getEvents">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CategoryDialog",
  props: ["value", "selectedCategory"],
  data: () => ({
    names: {Fitness: 'Gym', Sleep: "Sleep", Work: "Work", Leisure: "Relax", Education: "Study"},
    categories: ["Fitness", "Sleep", "Work", "Leisure", "Education"],
    daysDictionary: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    selectedDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], //Default
    lengthDictionary: [],
    category: null,
    length: "00:30",
    perDay: 1,
    recommendations: 1,
  }),
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    selectedCategory(val) {
      this.category = JSON.parse(JSON.stringify(val))
    },
    value(val) {
      if (!val) {
        this.cleanUp()
      }
    }
  },
  created() {
    // Create list of 30 minutes intevals
    this.lengthDictionary = []
    for (let i = 0; i <= 30; i++) {
      this.lengthDictionary.push(this.formatLength(i*30))
    }
    this.category = JSON.parse(JSON.stringify(this.selectedCategory))
  },
  methods: {
    formatLength(minutes) {
      let MINUTES = minutes; //some integer
      var m = MINUTES % 60;
      var h = (MINUTES-m)/60;
      var HHMM = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
      return HHMM
    },
    getEvents() {
      console.log(this.category)
      const idxDays = this.selectedDays.map(x => this.daysDictionary.indexOf(x))
      const arrLength = this.length.split(':')
      const length = parseInt(arrLength[0]) * 2 + (arrLength[1] == '30' ? 1 : 0)
      this.$emit("updateList", {
        text: this.category.text,
        category: this.category.params.category,
        length: length,
        perDay: this.perDay,
        recommendations: this.recommendations,
        selectedDays: idxDays,
        color: this.category.color,
        index: this.category.index
      })
      this.show = false
    },
    cleanUp() {
      this.length = "00:30"
      this.perDay = 1
      this.recommendations = 1
      this.selectedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    checkChange() {
      console.log(this.length)
    }
  }
};
</script>

<style scoped>
</style>