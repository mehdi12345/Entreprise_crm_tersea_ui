<script>
 import { required, email } from "vuelidate/lib/validators";
export default {
    
    head() {
        return {
            title: `${this.title}`
        };
    },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  
    data() {
    return {
title: "Log in",
      email: "",
      password: "",
      submitted: false,
    };
  },
  methods:{
async tryToLogIn()  {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        try{
       await  this.$auth.loginWith('laravelSanctum',{
            data:{
                email:this.email,
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
        }catch (error) { this.$store.commit(
            "notification/error",
            "Email or password not Correct"
          );

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
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center">
                        <nuxt-link to="/" class="mb-3 d-block auth-logo">
                            <img src="~/assets/images/large.png" alt="" height="150" />
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="row align-items-center justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="text-center mt-2">
                                <h5 class="text-primary">Welcome Back !</h5>
                                <p class="text-muted">Sign in to view your Dashboard.</p>
                            </div>
                            <div class="p-2 mt-4">
                   <b-alert
          v-if="notification.show"
          show
          :variant="notification.type"
          @dismissed="notification.show = false"
          >{{ notification.message }}</b-alert>
                                <b-form  @submit.prevent="tryToLogIn">
                                    <b-form-group
                      id="email"
                      label="Email"
                      label-for="email"
                      class="mb-3"
                    >
                      <b-form-input
                        id="email"
                        v-model="email"
                        type="text"
                        placeholder="Enter your email"
                        :class="{ 'is-invalid': submitted && $v.email.$error }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.email.required"
                          >Email is required.</span
                        >
                        <span v-if="!$v.email.email"
                          >Please enter valid email.</span
                        >
                      </div>
                    </b-form-group>
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

                                    <div class="mt-3 text-end">
                                        <button class="btn btn-primary" type="submit">
                                            Log In
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
