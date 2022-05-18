<template>
<div class="container">
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
    <v-col>Status: {{ product[indexNumber].onSale? 'Available' : 'Sold out' }}</v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-btn block large rounded color="primary" :to="'/TransactionPage/' + indexNumber">Buy</v-btn>
    </v-col>
  </v-row>
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
