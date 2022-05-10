<template>
  <div>

    <v-file-input accept="video/*" @change="handleFile"></v-file-input>

    <div v-if="tricks">
      <p v-for="t in tricks">
        {{ t.name }}
      </p>
    </div>

    <div>
      <v-text-field v-model="trickName" label="Tricking Name"/>
      <v-btn @click="saveTrick">Save Trick</v-btn>
    </div>


    {{ message }}
    <v-btn @click="reset">Reset</v-btn>
    <v-btn @click="resetTricks">Reset Tricks</v-btn>

  </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  data: () => ({
    trickName: ""
  }),
  computed: {
    ...mapState({
      message: state => state.message
    }),
    ...mapState('tricks', {
      tricks: state => state.tricks
    }),
  },
  methods: {
    ...mapMutations([
      'reset'
    ]),
    ...mapMutations('tricks', {
      resetTricks: 'reset'
    }),
    ...mapActions('tricks', ['createTrick']),
    async saveTrick() {
      await this.createTrick({trick: {name: this.trickName}});
      this.trickName = "";
    },
    async handleFile(file) {
      if (!file) {
        return;
      }

      console.log(file);

      // create form
      const form = new FormData();
      form.append("video", file);

      // send to controller
      const result = await this.$axios.post("http://localhost:5063/api/videos", form);
      console.log(`Result: ${result}`)
    }
  }


  // async fetch() {
  //   await this.$store.dispatch('fetchMessage')
  // }
  // async asyncData({ $axios }){
  //   console.log("async data call");
  //   return $axios.get("http://localhost:5063/api/home")
  //     .then(({data}) => {
  //       return { message: data}
  //     });
  // }
}
</script>
