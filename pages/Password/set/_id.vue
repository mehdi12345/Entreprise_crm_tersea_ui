<script>
 import { required, email } from "vuelidate/lib/validators";
 import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    
    head() {
        return {
            title: `${this.title}`
        };
    },
  validations: {
    password: {
      required
    },
    password_confirmation: {
      required
    }
  },
  mounted:function () {
    this.validate();
  },
    data() {
    return {
title: "Password Confirmation",
      password: "",
      password_confirmation: "",
      submitted: false,
    };
  },
  
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  methods:{
    async login(email){
      await  this.$auth.loginWith('laravelSanctum',{
            data:{
                email:email,
                password:this.password,
            }
        }).then(async (response)=>{
            if(response.data.token){
               //save Auth token
              this.$auth.setUserToken(response.data.token);
              //save Auth In Cookies
              this.$auth.$storage.setCookie("user", response.data.user);
              this.$auth.$storage.setCookie("loggedIn", true);
              //to clean the notification in case of previous errors
              this.$store.commit(
            "notification/clear",
          );
this.$router.push("/")
            }else{
                this.$store.commit(
            "notification/error",
            "Email or password not Correct"
          );
              }
        })
    },
    async validate(){
      const config={
        headers: {
    'Content-Type': 'application/json',
    },
  };
const bodyParameters = {
   key: "value"
};
      try{
      let formData = new FormData();
      formData.append("admin_id",this.$route.query.admin);
        await this.$axios.$post("validate/"+this.$route.params.id, formData,config);
      }
      catch(error){
        // if the user is already verified or not found the page error will show up
        
        Swal.fire({
        type: "error",
  title: 'Oops...',
  text: error.response.data.message,
  confirmButtonText: 'Ok',
  timer: 5500
}).then(() => {
    this.$router.push({ path: "/error" });
  
})
        
      }
    },
async confirmPassword()  {
  const config={
        headers: {
    'Content-Type': 'application/json',
    },
  };
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        try{
          let formData = new FormData();
      formData.append("password",this.password);
      formData.append("password_confirmation",this.password_confirmation);
            formData.append("admin_id",this.$route.query.admin);

          await this.$axios.$post("confirmation/"+this.$route.params.id, formData,config).then(async (res)=>{
            this.login(res.user.email);
          });
        }catch (error) { 
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
},
};
</script>

<template>
<div>
    <div class="account-pages my-5">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mt-2">
                                <h5 class="text-primary">Welcome To You !</h5>
                                <p class="text-muted">Set a password to view your Dashboard.</p>
                            </div>
                            
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center">
                        <nuxt-link to="/" class="mb-3 d-block auth-logo">
                            <img src="~/assets/images/set-password.png" alt="" height="200" />
                        </nuxt-link>
                    </div>
                </div>
            </div>
                            <div class="p-2 mt-4">
                              <b-alert
          v-if="notification.show"
          show
          :variant="notification.type"
          @dismissed="notification.show = false"
          >{{ notification.message }}</b-alert>
                                <b-form  @submit.prevent="confirmPassword()">
                                    <b-form-group
                      id="password"
                      label="Password"
                      label-for="password"
                      class="mb-3"
                    >
                      <b-form-input
                        id="password"
                        v-model="password"
                        type="password"
                        placeholder="Enter your password"
                        :class="{ 'is-invalid': submitted && $v.password.$error }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.password.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.password.required"
                          >Password is required.</span
                        >
                      </div>
                    </b-form-group>
                                    <b-form-group
                      id="password_confirmation"
                      label="password Confirmation"
                      label-for="password_confirmation"
                      class="mb-3"
                    >
                      <b-form-input
                        id="password_confirmation"
                        v-model="password_confirmation"
                        type="password"
                        placeholder="Enter your password confirmation"
                        :class="{ 'is-invalid': submitted && $v.password_confirmation.$error }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.password.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.password.required"
                          >Password Confirmation is required.</span
                        >
                      </div>
                    </b-form-group>

                                    <div class="mt-3 text-end">
                                        <button class="btn btn-primary" type="submit">
                                            Confirm
                                        </button>
                                    </div>
                                </b-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
