
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  data() {
    return {
      oldPassword:null,
      password:null,
      passwordConfirmation:null,
    };
  },
  methods: {
    validToken(){
      return this.$auth.strategy.token.get();
    },
   async onSubmit() {
       const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
      let formData = new FormData();
      formData.append("old_password",this.oldPassword);
      formData.append("password",this.password);
      formData.append("password_confirmation",this.passwordConfirmation);
      try{
        await this.$axios.$post("/updatePassword", formData, config).then((res)=>{
          Swal.fire({
            type: "success",
  title: 'Great!',
  text: res.message,
})
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
})        }
        
     }
  },
};
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">Account :</h4>
      <div class="p-4 border-top">
        <form v-on:submit.prevent="onSubmit()">
          <div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label for="old_password">Old Password</label>
                  <input
                    v-model="oldPassword"
                    type="password"
                    class="form-control"
                    id="old_password"
                    placeholder="Enter old password"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    placeholder="Enter Password"
                    :class="false ? 'is-invalid' : ''"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label for="passwordConfirmation">Confirmed_Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="passwordConfirmation"
                    v-model="passwordConfirmation"
                    placeholder="Enter Password Confirmation"
                    :class="false ? 'is-invalid' : ''"
                    required
                  />
                </div>
              </div>
            </div>
            
            <center>
              <button type="submit" class="btn btn-primary">Edit</button>
            </center>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
