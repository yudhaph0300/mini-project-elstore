<template>
    <div class="container text-center" >
        <v-row>
            <v-col>
                <h3>Waiting for payment</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p>
                    Please make payment to the following account:<br><span>BRI 1221 8430 2924 936</span>
                    <br><br><br>
                </p>
            </v-col>
        </v-row>
        <img :src="'https://ik.imagekit.io/yudha/elstore/clock_hOdHcQKFE.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1652856106306'" alt="">
        <br><br><br><br><br>
        <v-row>
            <v-col>
                <p>Your order will be sent after you make payment</p>
            </v-col>
        </v-row>

        <v-btn block rounded large color="primary" to="/">Back To Home</v-btn>
    </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
    name: 'PaymentPage',
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