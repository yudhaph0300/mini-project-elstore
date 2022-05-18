<template>
<div class="container">

  <v-btn
      class="mx-2 my-2"
      fab
      fixed
      small
      color="#f5f5f5"
      to="/"
    >
      <v-icon dark>
        mdi-apple-keyboard-control mdi-rotate-270
      </v-icon>
    </v-btn>

  <v-row>
    <v-col>
      <img :src="product[indexNumber].image" alt="">
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <h3>{{product[indexNumber].name}} </h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col>Rp. {{ product[indexNumber].price }},-</v-col>
  </v-row>
  <v-row>
    <v-col>{{ product[indexNumber].description }}</v-col>
  </v-row>
  

  <v-row>
    <v-col>
      <v-btn block large rounded color="primary" :to="'/TransactionPage/' + indexNumber">Buy</v-btn>
    </v-col>
  </v-row>

  <v-footer padless color="#bbb" class="mt-5">
    <v-col    
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>elStore</strong>
    </v-col>
  </v-footer>
</div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'ProductDetail',
  computed: {
      indexNumber() {
          return this.$route.params.id
      }
  },
  apollo: {
    product: {
      query() {
        return gql`
          query MyQuery {
            product {
              id
              name
              price
              description
              onSale
              image
            }
          }
        `
      }
    }
  }, 
}
</script>

<style scoped>
  @media only screen and (min-width: 450px) {
    .container {
      max-width: 450px;
      background-color: #f5f5f5;
    }
    img {
      width: 100%;
    }

    
  }
    
</style>
