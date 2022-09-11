<template>
  <v-card color="grey lighten-4" min-width="600px" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <span v-html="selectedEvent.details"></span>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="closeDialogue">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CalDialogue',
  props: ['selectedEvent', 'closeDialogue']


}
</script>
