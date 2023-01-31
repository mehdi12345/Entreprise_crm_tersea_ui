
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  props: ["user"],
  data() {
        return {
        };
    },
    model: {
      prop: 'user',
      event: 'input'
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
      let formData = new FormData();
      formData.append("id",this.user.id);
      formData.append("nom",this.user.nom);
      formData.append("email",this.user.email);
      if(this.user.address!=null)
        formData.append("address",this.user.address);
      if(this.user.phone!=null)
      formData.append("phone",this.user.phone);
      if(this.user.date_of_birth!=null)
      formData.append("date_of_birth",this.user.date_of_birth);
      try{
        await this.$axios.$post("/EditUser", formData, config).then((res)=>{
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
        }      Swal.fire({
        type: "error",
  title: 'Oops...',
  text: result,
})
        }
     }
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">User info :</h4>
      <div class="media align-items-center mb-2">
        <div class="me-3">
          <img src="~/assets/images/avatar.svg" alt=""  height="48">
        </div>
        <div class="media-body overflow-hidden px-2">
          <h5 class="font-size-16 mb-1">
            {{ user ? user.nom : "" }}
          </h5>
          <p class="text-muted text-truncate mb-0">
            {{ user ? user.address : "" }}
          </p>
        </div>
      </div>
      <div class="p-4 border-top">
        <form v-on:submit.prevent="onSubmit()">
          <div>
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label for="name">Full Name</label>
                  <input
                   @input="e => user.nom = e.target.value"
                    type="text" 
                    :value="user?user.nom:''"
                    class="form-control"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-4">
                  <label for="address">Address</label>
                  <input
                   @input="e => user.address = e.target.value"
                    type="text"
                    class="form-control"
                    :value="user?user.address:''"
                    id="addresss"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>
            <div class="row">
               <div class="col-lg-4">
                <div class="form-group mb-4">
                  <label for="email">Email</label>
                  <input
                   @input="e => user.email = e.target.value"
                    type="text"
                    class="form-control"
                    :value="user?user.email:''"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
               <div class="col-lg-4">
                <div class="form-group mb-4">
                  <label for="phone">Phone</label>
                  <input
                   @input="e => user.phone = e.target.value"
                    type="text"
                    class="form-control"
                    :value="user?user.phone:''"
                    id="phone"
                    placeholder="Enter Phone number"
                  />
                </div>
              </div>
 <div class="col-lg-4">
                <div class="form-group mb-4">
                  <label for="birth">Date of birth</label>
                  <input
                   @input="e => user.date_of_birth = e.target.value"
                    type="date"
                    class="form-control"
                    :value="user?user.date_of_birth:''"
                    id="birth"
                    placeholder="Enter date of birth"
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

