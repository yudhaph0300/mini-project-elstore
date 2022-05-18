<template>
    <div class="container">
        <div v-if="fieldUser == true">
        <v-row class="text-center">
            <v-col>
                <h3>Form Customer</h3>
            </v-col>
        </v-row>
        
        <v-text-field label="Name" outlined v-model="editName"/>
        <v-text-field label="Address" outlined v-model="editAddress"/>
        <v-btn block large rounded color="primary" @click="submit()">Submit</v-btn>
        <v-btn class="my-2" block large rounded outlined :to="'/ProductDetail/' + indexNumber">Cancel</v-btn>
        </div>

        <div v-else>
            <v-row>
            <v-col>
                <h3 class="text-center">Transaction Page</h3>
            </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h4>Product Info</h4>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col>
                    Product Name
                </v-col>
                <v-col>
                    {{ product[indexNumber].name }}
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    Price
                </v-col>
                <v-col>
                    Rp. {{ product[indexNumber].price }},-
                </v-col>
            </v-row>

            <v-row class="mt-10">
                <v-col>
                    <h4>Order Info</h4>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    {{ editName }}
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    {{ editAddress }}
                </v-col>
            </v-row>

            <div v-if="confirm == false">
                <v-btn block large rounded color="primary" @click="pay()">Confirm</v-btn>
                <v-btn class="my-2" block large rounded outlined :to="'/ProductDetail/' + indexNumber">Cancel</v-btn>
            </div>
            <div v-else>
                <v-btn block large rounded color="primary" to="/payment">Pay Now</v-btn>
            </div>
            
        </div>

            
        
        

    </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
    name: 'TransactionPage',
    computed: {
      indexNumber() {
          return this.$route.params.id
      }
    },
    data() {
        return {
            fieldUser: true,
            editName: '',
            editAddress: '',
            confirm: false

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
        // transaction: {
        //     query() {
        //         return gql`
        //         query MyQuery1 {
        //             transaction {
        //             id
        //             customer
        //             address
        //             alreadyPaid
        //             }
        //         }
        //         `
        //     }
        // }
        
    },
    methods: {
        submit() {
            this.fieldUser = false
        },
        pay() {
            this.$apollo.mutate({
                mutation: gql`
                    mutation MyMutation($customer: String, $address: String, $id_product: Int) {
                        insert_transaction_one(object: {customer: $customer, address: $address, id_product: $id_product}) {
                            id
                            customer
                            address
                            alreadyPaid
                            id_product
                        }
                    }
                `,
                variables: {
                    customer: this.editName,
                    address: this.editAddress,
                    id_product: this.$route.params.id
                }
            })
            this.confirm = true
        }
    }

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