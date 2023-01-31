<script>
import {required,email} from "vuelidate/lib/validators"

import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    head() {
        return {
            title: `${this.title}`,
        };
    },
    data() {
        return {
            title: "Add Admin",
            items: [{
                    text: "Dashboard",
                    active: true,
                },
                {
                    text: "Add Admin",
                    active: true,
                },
            ],
            admin:{
                email:'',
                name:'',
                phone:'',
                address:'',
                birth:'',
                password:'',
                password_confirmation:'',
            },
            showValidation:false,
        };
    },
    validations:{
        admin:{
        name:{
            required
        },
        email:{
            required,
            email
        },
        password:{
            required
        },
        password_confirmation:{
            required
        }
        }
    },
    middleware: "admin",
    layout:'vertical',

    methods: {
        validToken(){
      return this.$auth.strategy.token.get();
    },
     async onSubmit() {
        const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
         this.showValidation = true;
         this.$v.$touch();
         if(this.$v.$invalid){
            return;
      } else { 
      let formData = new FormData();
      formData.append("nom",this.admin.name);
      formData.append("email",this.admin.email);
      
      formData.append("phone",this.admin.phone); 
      formData.append("address",this.admin.address); 
      formData.append("date_of_birth",this.admin.birth); 
      
      formData.append("password",this.admin.password); 
      formData.append("password_confirmation",this.admin.password_confirmation); 
      try{
        await this.$axios.$post("addAdmin", formData, config).then(()=>{
            this.$router.push({ path: "/administrators" });
        })
    }
    catch (error) {
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
     }
    }
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" /> 
<br>
    <div class="row">
        <div class="col-lg-12">
            <div id="addAdmin-accordion" class="custom-accordion">
                <div class="card">
                    <a href="javascript: void(0);" class="text-dark" data-toggle="collapse" aria-expanded="true" aria-controls="addAdmin-billinginfo-collapse" v-b-toggle.accordion-1 style="text-decoration: none;">
                        <div class="p-4">
                            <div class="media align-items-center">
                                <div class="mx-3">
                                    <div class="avatar-xs">
                                        <div class="avatar-title rounded-circle bg-soft-primary">01</div>
                                    </div>
                                </div>
                                <div class="media-body overflow-hidden">
                                    <h5 class="font-size-16 mb-1">Admin Details</h5>
                                    <p class="text-muted text-truncate mb-0">Fill the information below</p>
                                </div>
                                <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                            </div>
                        </div>
                    </a>

                    <b-collapse data-parent="#addAdmin-accordion" id="accordion-1" visible accordion="my-accordion">
                        <div class="p-4 border-top">
                            <form v-on:submit.prevent="onSubmit()">
                                <div class="mb-3">
                                    <label for="name">Name</label>
                                    <input id="name" name="name" v-model="admin.name" type="text" class="form-control" placeholder="Enter the admin name" 
                        :class="{ 'is-invalid': showValidation && $v.admin.name.$error }"/>
                        <div class="invalid-feedback" v-show="showValidation" v-if="!$v.admin.name.required">
                                            <span v-if="!$v.admin.name.required"
                          >Name is required.</span
                        >
                                        </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="email">Email</label>
                                            <input id="email" name="email" v-model="admin.email" type="text" class="form-control" placeholder="Enter the admin email" 
                        :class="{ 'is-invalid': showValidation && $v.admin.email.$error }"/>
                                        <div class="invalid-feedback" v-show="showValidation" v-if="!$v.admin.email.required">
                                            <span v-if="!$v.admin.email.required"
                          >Email is required.</span
                        >
                        <span v-if="!$v.admin.email.email"
                          >Please enter valid email.</span
                        >
                                        </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="phone">Phone</label>
                                            <input id="phone" name="phone" v-model="admin.phone" type="text" class="form-control" placeholder="Enter the admin phone" />
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="address">Address</label>
                                            <input id="address" name="address" v-model="admin.address" type="text" class="form-control" placeholder="Enter the admin address" />
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="birth">Date of birth</label>
                                            <input id="birth" name="birth" v-model="admin.birth" type="date" class="form-control" placeholder="Enter the date of birth" />
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="Password">Password</label>
                                            <input id="Password" name="Password" v-model="admin.password" type="password" class="form-control" placeholder="Enter the admin password" 
                        :class="{ 'is-invalid': showValidation && $v.admin.password.$error }"/>
                        <div class="invalid-feedback" v-show="showValidation" v-if="!$v.admin.password.required">
                                            <span v-if="!$v.admin.password.required"
                          >Password is required.</span
                        >
                                        </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="PasswordConfirmation">Password Confirmation</label>
                                            <input id="PasswordConfirmation" v-model="admin.password_confirmation" name="PasswordConfirmation" type="password" class="form-control" placeholder="Enter the admin password confirmation" :class="{ 'is-invalid': showValidation && $v.admin.password_confirmation.$error }" />
                                            <div class="invalid-feedback" v-show="showValidation" v-if="!$v.admin.password_confirmation.required">
                                            <span v-if="!$v.admin.password_confirmation.required"
                          >Password Confirmation is required.</span
                        >
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                    <center><button type="submit" class="btn btn-primary">Submit</button></center>
                            </form>
                        </div>
                    </b-collapse>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style>
.avatar-title{
    align-items: center;
    background-color: #f60;
    display: flex;
    color: black;
    font-weight: 500;
    height: 100%;
    justify-content: center;
    width: 100%;
}
.avatar-xs{
    height: 2rem;
    width: 2rem;
}
</style>