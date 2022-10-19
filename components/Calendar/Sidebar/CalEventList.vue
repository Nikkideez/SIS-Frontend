<template>
  <v-list dense>
    <v-list-group v-for="(list, i) in lists" :key="i" v-model="list.active">
      <template v-slot:activator>
        <v-list-item-content>
          <v-layout>
            <v-list-item-title v-text="list.title"></v-list-item-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text small v-bind="attrs" v-on="on" @click.stop="">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Add {{ list.type }}</span>
            </v-tooltip>
          </v-layout>
        </v-list-item-content>
      </template>
      <v-list-group
        v-for="item in list.items"
        :key="item.title"
        :append-icon="null"
        prepend-icon=""
        sub-group
        v-model="item.show"
      >
        <template v-slot:activator>
          <!--  @click.stop="handleCategoryClick(item)" -->
          <v-row align="center" @click.stop="handleCategoryClick(item)">
            <v-col md="2">
              <v-checkbox
                v-model="item.active"
                :color="item.color"
                @click.stop=""
                hide-details
                class="ml-2 mb-2"
                dense
              >
              </v-checkbox>
            </v-col>
            <v-col md="4">
              {{ item.text }}
            </v-col>
            <v-col align="right" class="ml-4">
              <v-btn icon @click.stop="item.show = !item.show">
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </v-col>
            <v-col align="right">
              <v-btn icon @click.stop="">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <v-list-item>
          <v-list-item-content>
            <p>Category: {{ item.params.category }}</p>
            <p>Length: {{ item.params.length }}</p>
            <p>Max Per Day: {{ item.params.perDay }}</p>
            <p>Days: {{ item.params.selectedDays }}</p>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
    name: 'CalEventList',
    data: () => ({
    lists: [
      {
        active: true,
        items: [
          { text: "Sleep", category: "Sleep", color: "rgb(33, 150, 245)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Gym", category: "Fitness", color: "rgb(103, 58, 183)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Work", category: "Work", color: "rgb(0, 188, 212)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Relax", category: "Leisure", color: "rgb(255, 152, 0)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
          { text: "Study", category: "Education", color: "rgb(76, 175, 80)", active: true, params: {length: "01:30", perDay: "1", selectedDays: "Mon, Tues, Wed, Thurs, Fri, Sat, Sun"}, show: false },
        ],
        title: 'Events',
        type: 'Category'
      },
    ],
  }),
};
</script>

<style></style>
