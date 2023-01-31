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
            title: "Edit Company",
            items: [{
                    text: "Dashboard",
                    active: true,
                },
                {
                    text: "Edit Company",
                    active: true,
                },
            ],
            company:{
                name:'',
                email:'',
                phone:'',
                address:'',
            },
            showValidation:false,
        };
    },
    validations:{
       company:{
        name:{
            required
        },
        email:{
            email,
            required
        },
        }
    },
    middleware: "admin",
    layout:'vertical',

     async fetch () { 
          const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
        const [company] = await Promise.all([
    this.$axios.post('company/show/'+this.$route.params.id,bodyParameters,config),
  ])
  this.company = company.data;
 
 },
    methods: {
        validToken(){
      return this.$auth.strategy.token.get();
    },
     async onSubmit() {
          const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
         this.showValidation = true;
         this.$v.$touch();
         if(this.$v.$invalid){
            return;
      } else { 
      let formData = new FormData();
      
      formData.append("name",this.company.name);


      formData.append("email",this.company.email);

      formData.append("phone",this.company.phone); 
      if(this.company.address!=null)
      formData.append("address",this.company.address);

      try{
        await this.$axios.$post("company/update/"+this.$route.params.id, formData, config)
          this.$router.push({ path: "/companies" });
    }
    catch (error) {
        console.log(error.response)
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
    }
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
    <br>
    <div class="row">
        <div class="col-lg-12">
            <div id="addproduct-accordion" class="custom-accordion">
                <div class="card">
                    <a href="javascript: void(0);" class="text-dark" data-toggle="collapse" aria-expanded="true" aria-controls="addproduct-billinginfo-collapse" v-b-toggle.accordion-1>
                        <div class="p-4">
                            <div class="media align-items-center">
                                <div class="mx-3">
                                    <div class="avatar-xs">
                                        <div class="avatar-title rounded-circle bg-soft-primary text-primary">01</div>
                                    </div>
                                </div>
                                <div class="media-body overflow-hidden">
                                    <h5 class="font-size-16 mb-1">Company Details</h5>
                                    <p class="text-muted text-truncate mb-0">Fill the information below</p>
                                </div>
                                <i class="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                            </div>
                        </div>
                    </a>

                    <b-collapse data-parent="#addproduct-accordion" id="accordion-1" visible accordion="my-accordion">
                        <div class="p-4 border-top">
                            <form v-on:submit.prevent="onSubmit()">
                            
                                <div class="mb-3">
                                    <label for="name">Name</label>
                                    <input id="name" name="name" v-model="company.name" type="text" class="form-control" placeholder="enter the company name" />
                                        <div class="error" v-show="showValidation" v-if="!$v.company.name.required">Field is required</div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="email">Email</label>
                                            <input id="email" name="email" v-model="company.email" type="text" class="form-control" placeholder="enter the company email" />
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="phone">Phone</label>
                                            <input id="phone" name="phone" v-model="company.phone" type="tel" class="form-control" placeholder="enter the company phone" />
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="address">Address</label>
                                            <input id="address" name="address" v-model="company.address" type="text" class="form-control" placeholder="enter the company address" />
                                        </div>
                                    </div>
                                </div>
                                    <center><button type="submit" class="btn btn-success">Update</button></center>
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