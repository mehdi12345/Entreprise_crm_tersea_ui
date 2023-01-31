
  <script>
  import { required,email } from "vuelidate/lib/validators";
  import Swal from 'sweetalert2/dist/sweetalert2.js'
  export default {
    layout: "auth",
    props:['id'],
    data() {
      return {
        name: "",
        email: "",
        submitted: false,
      };
    },
    validations: {
      name: {
        required,
      },
      email: {
        required,
        email
      },
    },
    methods: {
        
        validToken(){
      return this.$auth.strategy.token.get();
    },
      async invite() {
        
        const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
        this.submitted = true;
        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        } else {
          try {
            let formData = new FormData();
      formData.append("nom",this.name);
      formData.append("email",this.email);
      formData.append("company_id",this.id);
            await this.$axios.$post("invite", formData, config).then((res)=>{
            Swal.fire({
        type: "success",
  title: 'Great',
  text: res.message,
})
        });
        this.$bvModal.hide('invite-user')
          } catch (error) {
            console.log(error);
            var result;
        if(error.response.data.errors){
            
         result =Object.entries(error.response.data.errors)[0][1];
        }else{
             result=error.response.data.message;
        }
        Swal.fire({
        type: "error",
  title: 'Oops...',
  text: result,
})
          }
        }
      },
    },
  };
  </script>
<template>
    <div>
      <b-modal id="invite-user" centered hide-footer hide-header no-stacking>
        <i
          class="fas fa-times d-flex justify-content-end invite-user-close"
          @click="$bvModal.hide('invite-user')"
        ></i>
        <div class="signin-other-title text-center">
          <h5 class="font-size-24 title">
            Invite User 
          </h5>
        </div>
<center>
    <img src="~/assets/images/invite.png" alt="" height="300" />
</center>
        <b-form @submit.prevent="invite()">
          <b-form-group
            id="name"
            label="Name"
            label-for="name"
            class="font-size-20 mb-3"
          >
            <b-input-group>
              <b-form-input
                id="name"
                v-model="name"
                type="text"
                size="lg"
                placeholder='user name'
                :class="{ 'is-invalid': submitted && $v.name.$error }"
              ></b-form-input>
              <b-input-group-prepend>
                <i class="fas fa-user"></i>
              </b-input-group-prepend>
            </b-input-group>
            <div v-if="submitted && $v.name.$error" class="invalid-feedback">
              <span v-if="!$v.name.required">
                Name is required
              </span>
            </div>
          </b-form-group>
          <b-form-group
            id="email"
            label="Email"
            label-for="email"
            class="font-size-20 mb-3"
          >
            <b-input-group>
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                size="lg"
                placeholder='user email'
                :class="{ 'is-invalid': submitted && $v.email.$error }"
              ></b-form-input>
              <b-input-group-prepend>
                <i class="fas fa-envelope"></i>
              </b-input-group-prepend>
            </b-input-group>
            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
              <span v-if="!$v.email.required">
                Email is required
              </span>
              <span v-if="!$v.email.email">
                Email is not on correct format
              </span>
            </div>
          </b-form-group>
          
          <div class="d-flex justify-content-center">
            <b-button
              block
              variant="primary"
              size="lg"
              type="submit"
              class="mt-2 px-5"
              >Invite User </b-button
            >
          </div>
        </b-form>
      </b-modal>
    </div>
  </template>
  
  <style scoped>
  .modal-body {
    padding: 1rem !important;
  }
  .b-img {
    cursor: pointer;
  }
  .modal-content {
    background-color: #f60 !important;
    border: 1px solid #f60 !important;
  }
  .btn-primary {
    background-color: #f60;
    border-color: white;
    font-size: 20px;
    font-weight: 600;
    border-radius: 6px;
  }
    .btn-primary :hover,
    .btn-primary :focus {
      transform: scale(1.05, 1.05);
      background-color: #f60;
      border-color: white;
    }
  
  .form-control {
    border-right: none;
  }
  .input-group-prepend {
    display: flex;
    align-items: center;
    padding: 0.47rem 0.75rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;
    color: #f60;
    text-align: center;
    white-space: nowrap;
    background-color: white;
    border: 1px solid #ced4da;
    border-left: none;
    border-radius: 0.25rem;
  }
  .text-signup {
    color: #f60;
  }
  .btn-link {
    font-weight: 400;
    color: #f60;
    text-decoration: none;
    background-color: transparent;
    border: none;
    padding: none;
    font-size: 0.9rem;
    transition: none;
  }
  .invite-user-close {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .alert-danger {
    color: red;
  }
  .invalid-feedback{
    display: block;
    color: red;
  }
  </style>