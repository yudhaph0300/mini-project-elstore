<template>
  <v-container>
    <v-btn fixed rounded large color="depressed" elevation="2" to="/admin/Transaction">Transaction</v-btn>
    <v-row>
      <h1 class="mx-auto">Daftar Produk</h1>
    </v-row>

    <v-row v-if="editMode == true">
        <v-cols>
            <h3>Edit Product</h3>
            <v-simple-table class="mt-6">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center">
                            ID
                        </th>
                        <th class="text-center">
                            Gambar
                        </th>
                        <th class="text-center">
                            Name
                        </th>
                        <th class="text-center">
                            Price
                        </th>
                        <th class="text-center">
                            Description
                        </th>
                        <th class="text-center">
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr>
                        <td>{{ indexId }}</td>
                        <td><img :src="productImage" width="100%" alt=""></td>
                        <td><v-text-field label="Name" v-model="editName"/></td>
                        <td><v-text-field label="Price" v-model="editPrice"/></td>
                        <td><v-text-field label="Description" v-model="editDescription"/></td>
                        <td>{{statusEdit}}</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                        <td colspan="4"></td>
                    </tr>
                    
                    
                    </tbody>
                    
                </template>
            </v-simple-table>
            <v-btn class="my-2" block @click="cancelUpdate()">Cancel</v-btn>
            <v-btn class="my-2" block color="primary" @click="updateProduk()">Update Produk</v-btn>
        </v-cols>
    </v-row>

    <div v-else>

    <v-row>
      <v-col>
        <v-simple-table class="mt-6">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  ID
                </th>
                <th class="text-center">
                  Image
                </th>
                <th class="text-center">
                  Name
                </th>
                <th class="text-center">
                  Price
                </th>
                <th class="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-if="$apollo.loading">Loading ...</tr>
              <tr
                v-for="item in product" :key="item.id"
              >
                <td>{{ item.id }}</td>
                <td><img :src="item.image" width="100%" alt=""></td>
                <td>{{ item.name }}</td>
                <td>Rp. {{ item.price }}</td>
                <td>
                    <v-btn class="mx-2" color="warning" @click="editProduct(item.id, item.image, item.name, item.price, item.description, item.onSale)">
                        Edit
                    </v-btn>

                    <v-btn class="mx-2" color="error" @click="deleteProduct(item.id)">
                        Delete
                    </v-btn>
                    
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    </div>
    
    
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
        editMode: false,
        indexId: '',
        editName: '',
        editPrice: '',
        editDescription: '',
        productImage: '',
        statusEdit: false
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
  methods: {
      deleteProduct(inputId) {
          confirm('Delete Product?')
          this.$apollo.mutate({
              mutation: gql`
                mutation MyMutation($id: Int) {
                    delete_product(where: {id: {_eq: $id}}) {
                        returning {
                            id
                            name
                            price
                            description
                            image
                            onSale
                        }
                    }
                }
              `,
                variables: {
                    id: inputId
                }
          })
      },
      editProduct(id, image, name, price, description, onSale) {
          this.editMode = true
          this.indexId = id
          this.editName = name
          this.editPrice = price
          this.editDescription = description
          this.productImage = image
          this.statusEdit = onSale
      },
      updateProduk(){
            this.$apollo.mutate({
                mutation: gql`
                    mutation MyMutation($_eq: Int!, $name: String, $price: String, $description: String) {
                        update_product(where: {id: {_eq: $_eq}}, _set: {name: $name, price: $price, description: $description}) {
                            returning {
                                id
                                name
                                price
                                description
                                onSale
                            }
                        }
                    }
                `,
                variables: {
                _eq: this.indexId,
                name: this.editName,
                price: this.editPrice,
                description: this.editDescription
                }
            })
            this.editMode = false
        },
        cancelUpdate(){
            this.editMode = false
        }
  }


}
</script>

<style>
  img{
    width: 150px;
    justify-content: center;
  }
</style>