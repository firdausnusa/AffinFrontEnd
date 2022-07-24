<template>
  <div class="home">
    <LoadingOverlay :showOverlay="showLoader"></LoadingOverlay>
    <div v-if="customerData.length > 0">
      <div class="transition-swing text-h5 pb-5">
        List of Customers
      </div>
      
      <v-card elevation="3" outlined width="95vw">
        <!-- <v-container class="indigo lighten-5 lighten-5 lighten-5"> -->
          <v-simple-table class="indigo lighten-5 lighten-5 lighten-5">  
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Photo
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Email
                  </th>
                  <th class="text-left">
                    Operation
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in  customerData"
                  :key="user.accountNo"
                >
                  <td class="pt-2 pb-5">
                    <!-- {{ user.image }} -->
                    <v-img
                      aspect-ratio="1"
                      max-height="50"
                      max-width="50"
                      class="custom-img"
                      :src="user.image ? user.image : defaultImage()"

                    ></v-img>
                  </td>

                  <td>{{ user.firstName + ' ' + user.lastName }}</td>

                  <td>{{ user.email }}</td>

                  <td>
                    <v-icon
                      color="purple darken-1"
                      @click="selectedUser = user, dialog = true"
                    >
                      mdi-card-account-details-outline
                    </v-icon>

                    <v-divider
                      dark
                      inset
                      vertical
                    ></v-divider>

                    <v-icon
                      color="deep-orange lighten-2 darken-1"
                      @click="selectedUser = {...user, index}, deleteDialog = true"
                    >
                      mdi-trash-can-outline
                    </v-icon>
                  </td>

                  
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        <!-- </v-container> -->

      </v-card>

      <v-dialog
        v-model="dialog"
        max-width="600px"
      >
        
        <v-card>
          <v-card-title>
            <span class="text-h5">User Details</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col 
                  cols="12"
                  sm="12"
                  md="12"
                  class="d-flex justify-center mb-6"
                >
                  <v-img
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                      class="custom-img"
                      :src="selectedUser.image ? selectedUser.image : defaultImage()"

                    ></v-img>
                </v-col>
              </v-row>
              <v-row class="text-center">
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  First Name: <p class="text--primary">{{ selectedUser.firstName}}</p>  
                  
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  Last Name: <p class="text--primary">{{ selectedUser.lastName}} </p>  
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  Address: <p class="text--primary">  {{ selectedUser.address ? selectedUser.address : '--' }}  </p> 
                </v-col>
                <v-col cols="12"
                  sm="6"
                  md="4"
                >
                  Email: <p class="text--primary"> {{ selectedUser.email}} </p>  
                </v-col>
                <v-col cols="12"
                  sm="6"
                  md="4"
                >
                  Phone No: <p class="text--primary">{{ selectedUser.contactNo ? selectedUser.contactNo : '--'}} </p>   
                </v-col>
                <v-col cols="12"
                  sm="6"
                  md="4"
                >
                  Birth Date:  <p class="text--primary"> {{ selectedUser.birthDate ? selectedUser.birthDate : '--'}} </p> 
                </v-col>
                <v-col 
                cols="12"
                  sm="12"
                  md="12"
                  class="d-flex justify-center mb-6"
                >
                  Status:  <p class="text--primary">  {{ selectedUser.accountStatus ? 'Active' : 'Deactivated' }}  </p> 
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
              
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="deleteDialog"
        max-width="600px"
      >
        
        <v-card>
          <v-card-title>
            <span class="text-h5">Delete User</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              
              <v-row class="text-center">
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <p class="text-h5">Sure want to delete {{selectedUser.firstName}} {{selectedUser.lastName}}?</p>  
                </v-col>
                
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="confirmDelete(selectedUser.index)"
            >
              Confirm
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteDialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
      <div class="transition-swing text-h5 pb-5 text-center" v-if="!showLoader && customerData.length == 0">
        There is no customer. Start to register one
      </div>
    </div>
    

</template>

<script>
// @ is an alias to /src
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import DefaultUserImage from '@/assets/UserDefault.png'

export default {
  name: 'Home',
  components: {
    LoadingOverlay
  },
  data: () => ({
    showLoader: true,
    customerData: [],
    dialog: false,
    selectedUser: {},
    deleteDialog: false,
  }),
  mounted() {
    this.initHome()
  },
  methods: {
    async initHome() {
      const self = this;
      try {
        self.showLoader = true;
        await self.$store.dispatch('getListOfCustomer')
      } catch (error) {
        alert('Error on fetching customers')
      } finally {
        self.customerData = self.$store.state.customers
        self.showLoader = false;
      }
    },
    defaultImage() {
      return DefaultUserImage
    },
    async confirmDelete(index) {
      const self = this;
      self.deleteDialog = false
      try {
        self.showLoader = true;
        await self.$store.dispatch('updateListOfCustomer', index)
      } catch (error) {
        alert('Error on deleting customers')
      } finally {
        self.customerData = self.$store.state.customers
        self.showLoader = false;
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .custom-img {
    border-radius: 50%; 
  }

  .v-divider--vertical {
    max-height: 15px;
    margin-left: 5px;
    margin-right: 5px;
    border-color: black;
  }
</style>
