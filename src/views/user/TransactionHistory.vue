<template>
    <div class="container text-center" >
        <v-row>
            <v-col>
                <h3>Transaction History</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Id Transaction
                        </th>
                        <th class="text-left">
                            Customer
                        </th>                        
                        <th class="text-left">
                            Product Name
                        </th>
                        <th class="text-left">
                            Status
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in transaction"
                        :key="item.id"
                        >
                        <td class="text-left">{{ item.id }}</td>
                        <td class="text-left">{{ item.customer }}</td>
                        <td class="text-left">{{ product[item.id_product].name }}</td>
                        <td class="text-left">{{ item.alreadyPaid ? 'Already paid' : 'Waiting for payment' }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-btn class="mt-10" block rounded large color="primary" to="/">Back To Home</v-btn>
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
    name: 'TransactionHistory',
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
        },
        transaction: {
            query() {
                return gql`
                query MyQuery1 {
                    transaction {
                    id
                    customer
                    address
                    alreadyPaid
                    id_product
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
  }
    
</style>