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
  >Find and order your electronics for your future</div>
  
  <v-row>
    <v-col
    v-for="(item, index) in product"
    :key="item.id">
      <v-card
        max-width="180"
        class="mx-auto"
        light
        elevation="1"
      >
        <v-img
          width="100%"
          :src="item.image"
        ></v-img>

        <v-card-text>
          <div>{{ item.name }}</div>
          <div>Rp. {{ item.price }},-</div>
        </v-card-text>

        <v-btn 
          block
          :to="'/ProductDetail/' + index"
          color="primary"
          elevation="3"
          large
        >
        View Detail
        </v-btn>
        
      </v-card>
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
      padding: 15px;
      padding-top: 150px;
      font-family: 'poppins';
      font-weight: 700;
      font-size: 28px;
      color: #fff !important;
      background-color: #4079e4;
    }
    
  }
    
</style>

