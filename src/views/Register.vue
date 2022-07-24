<template>
    <LoadingOverlay :showOverlay="loaded" v-if="loaded"></LoadingOverlay>

  <div class="register" v-else>
    <div class="transition-swing text-h5 pb-5">
        Register A Customer
    </div>    

        <v-card ref="form">
          <!-- <v-card-title>
            <span class="text-h6">User Details</span>
          </v-card-title> -->
          <v-card-text>
            <v-container>
              <v-row>
                <v-col 
                  class="d-flex justify-center mb-6"
                  cols="6"
                >
                  <v-img
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                      class="custom-img"
                      :src="newUserDetails.image ? newUserDetails.image : defaultImage()"

                    ></v-img>
                    <v-file-input
                    ref="image"
                      
                      accept="image/png, image/jpeg"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="Avatar"
                      @change="selectImage"
                      @click:clear="newUserDetails.image = ''"
                    ></v-file-input>                
                  </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    ref="firstName"
                    v-model="newUserDetails.firstName"
                    label="Legal first name*"
                    :rules="[() => !!newUserDetails.firstName || 'This field is required']"
                    :error-messages="errorMessages"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    ref="lastName"
                    v-model="newUserDetails.lastName"
                    :rules="[() => !!newUserDetails.lastName || 'This field is required']"
                    :error-messages="errorMessages"
                    label="Legal last name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    ref="adress"
                    v-model="newUserDetails.address"
                    label="Address"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col 
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    ref="email"
                    v-model="newUserDetails.email"
                    :rules="[
                      () => !!newUserDetails.email || 'This field is required',
                      () => emailRegex.test(newUserDetails.email) || 'Invalid e-mail.',
                    ]"
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col 
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    ref="accountNo"
                    v-model="newUserDetails.accountNo"
                    :rules="[
                      () => !!newUserDetails.accountNo || 'This field is required',
                      () => !!newUserDetails.accountNo && newUserDetails.accountNo.length == 10 || 'Account No. must be valid 10 digit',
                    ]"

                    label="Account No.*"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    ref="contactNo"
                    v-model="newUserDetails.contactNo"
                    label="Contact No"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newUserDetails.birthDate"
                      label="Birth Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newUserDetails.birthDate"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              icon
              class="my-0"
              @click="resetForm"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="submit"
            >
              Register
            </v-btn>
            
          </v-card-actions>
        </v-card>
    
  </div>
</template>

<script>
  import DefaultUserImage from '@/assets/UserDefault.png'
  import LoadingOverlay from '@/components/LoadingOverlay.vue'


  export default {
    name: 'About',
    components: {
      LoadingOverlay
    },
    data() {
      return {
        loaded: true,
        newUserDetails: {
          firstName: "",
          lastName: '',
          address: '',
          accountNo: '',
          image: '',
          contactNo: '',
          email: '',
          accountStatus: true,
          birthDate: '',
        },
        menu: false,
        errorMessages: '',
        emailRegex: new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
        formHasErrors: false,
      }
    },
    mounted() {
      const self = this;
      self.loaded = false;
    },
    computed: {
      form() {
        return {
          firstName: this.newUserDetails.firstName,
          lastName: this.newUserDetails.lastName,
          accountNo: this.newUserDetails.accountNo,
          email: this.newUserDetails.email,
          contactNo: this.newUserDetails.contactNo,
        }
      }
    },
    watch: {
      newUserDetails () {
        this.errorMessages = ''
      },
    },
    methods: {
      defaultImage() {
        return DefaultUserImage
      },
      async submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })

        if (!this.formHasErrors) {
          // submit this new customer
          try {
            this.loaded = true;
            await this.$store.dispatch('registerACustomer', this.newUserDetails)
          } catch (error) {
            alert('Error on adding customers')
          } finally {
            this.$router.push({ path: '/' });
            this.loaded = false;
          }

        }
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      selectImage(img) {
        if (img) {
          const reader = new FileReader();
          reader.readAsDataURL(img);
          reader.onloadend = () => {
            var base64data = reader.result;
              this.newUserDetails.image = base64data
          };
        }
      }
    }
  }
</script>
