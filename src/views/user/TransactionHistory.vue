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
                            Id Product
                        </th>
                        <th class="text-left">
                            Product Name
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
                        <td class="text-left">{{ item.id_product }}</td>
                        <td class="text-left">{{ product[item.id_product].name }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
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