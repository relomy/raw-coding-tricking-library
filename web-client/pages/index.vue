<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" sm="8">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo/>
        <VuetifyLogo/>
      </v-card>

      <v-card>
        <v-card-title class="headline">
          title
        </v-card-title>

        <div v-if="tricks">
          <p v-for="t in tricks">
            {{ t.name }}
          </p>
        </div>

        <div>
          <v-text-field v-model="trickName" label="Tricking Name" />
          <v-btn @click="saveTrick">Save Trick</v-btn>
        </div>


        {{ message }}
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="resetTricks">Reset Tricks</v-btn>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  name: 'IndexPage',
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
