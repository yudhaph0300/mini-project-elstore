<template>
    <div class="container">
        <v-row>
            <v-btn to="/admin/ProductList">View Product</v-btn>
        </v-row>
    </div>
</template>


<script>
import gql from 'graphql-tag'

export default {
    name: 'DashboardPage',
  data() {
    return {
        
    }
  },

  apollo: {
    product: {
      query() {
        return gql`
          query showProduct {
            product {
              id
              name
              price
              description
              image
              onSale
            }
          }
        `
      }
    }
  },
  
}
</script>

<style scoped>

</style>