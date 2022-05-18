<template>
    <div class="container text-center" >
        <v-row>
            <v-col>
                <h2>Transaction</h2>
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
                        <th class="text-left">
                            Price
                        </th>
                        <th class="text-left">
                            Status
                        </th>
                        <th class="text-left">
                            Change status
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
                        <td class="text-left">Rp. {{ product[item.id_product].price }},-</td>
                        <td class="text-left">{{ item.alreadyPaid ? 'Already paid' : 'Waiting for payment' }}</td>
                        
                        <td class="text-center">
                        <div v-if="item.alreadyPaid == false">
                            <v-btn @click="changeStatus(item.id)" block rounded color="primary">Change</v-btn>
                        </div>
                        <div v-else>
                            <v-btn block rounded color="primary" disabled>Change</v-btn>
                        </div>
                        </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-btn block class="mt-5" rounded large  elevation="2" to="/admin">Back To Product</v-btn>
    </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
    name: 'AdminTransaction',
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
    methods: {
        changeStatus(idTransaction) {
            this.$apollo.mutate({
                mutation: gql`
                    mutation MyMutation($alreadyPaid: Boolean, $_eq: Int) {
                        update_transaction(where: {id: {_eq: $_eq}}, _set: {alreadyPaid: $alreadyPaid}) {
                            returning {
                            alreadyPaid
                            address
                            customer
                            id
                            id_product
                            }
                        }
                    }

                `,
                variables: {
                    "_eq": idTransaction,
                    "alreadyPaid": true
                }
            })
        }
    }
}


    
</script>

<style scoped>

</style>