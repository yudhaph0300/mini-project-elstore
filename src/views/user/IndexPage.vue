<template>
<div class="container">
    <v-btn
    elevation="2"
    fab
    fixed
    class="mt-5 ml-5"
    to="/TransactionHistory"
  ><v-icon>mdi-format-list-bulleted</v-icon></v-btn>
  <div
    class="banner mb-4 pb-4"
    color="#FFD634"
  >Find and order food and drink for your mood</div>
  
  <v-row>
    <v-col
    v-for="(item, index) in product"
    :key="item.id">
      <v-card
        max-width="190"
        class="mx-auto"
        light
        elevation="3"
      >
        <v-img
          height="168"
          :src="item.image"
        ></v-img>

        <v-card-text>
          <div>{{ item.name }}</div>
          <div>Rp. {{ item.price }},-</div>
        </v-card-text>

        <v-btn 
          block
          :to="'/ProductDetail/' + index"
        >
        View Detail
        </v-btn>
        
      </v-card>
    </v-col>
  </v-row> 
</div>
  
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'IndexPage',
  data() {
      return {

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
      background-color: #f1f1f1;
      padding: 0;
    }

    .banner {
      padding-top: 200px;
      font-family: 'poppins';
      font-weight: 700;
      font-size: 28px;
      color: #0D0D0D !important;
      background-color: #FFD634;
    }
    
  }
    
</style>

