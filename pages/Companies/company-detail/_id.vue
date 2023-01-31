<script>
 import InviteUserModel from "../../../components/invite-user.vue";
 import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    
    components: {InviteUserModel },
    layout:'vertical',
    head() {
        return {
            title: `${this.title}`
        };
    },
    data() {
        return {
            title: "Company Detail",
            items: [{
                    text: "Dashboard",
                    active: true,
                },
                {
                    text: "Company Detail",
                    active: true,
                }
            ],
            company:{
                id:'',
                name:'',
                email:'',
                phone:'',
                address:'',
            },
                total:0,
                CreditTotal:0,
                employees:[],
        };
    },
    middleware: "authentication",
    methods:{
        validToken(){
      return this.$auth.strategy.token.get();
    },
    },
 async fetch () { 
          const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
    try{ 
    const [company] = await Promise.all([
    this.$axios.post('company/showDetail/'+this.$route.params.id,bodyParameters,config),
  ])
  this.company= company.data.company;
  this.employees= company.data.employees;
    }
    catch(error){
      Swal.fire({
        type: "error",
  title: 'Oops...',
  text: error.response.data.message,
  confirmButtonText: 'Ok',
  timer: 5500
}).then(() => {
  if(error.response.status==403)
    this.$router.push({ path: "/error" });
})
    }
 },
};
</script>

<template>
<div>
    
    <InviteUserModel :id="company.id" />
    <PageHeader :title="title" :items="items" />
    <br>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-sm-12 text-center">
                                <h5 class="font-size-16 mb-3">Company Name: &#160;&#160; <i class="fas fa-building mr-1"></i> {{company.name}}</h5>
                           
                        </div>
                    <hr class="my-4" />
                        <div class="col-sm-4 text-center">
                                    <h5 class="font-size-16 mb-1">Email:</h5>
                            <div class="text-muted">
                                    <p>{{this.company.email}}</p>
                        </div>
                        </div>
                        <div class="col-sm-4 text-center">
                                    <h5 class="font-size-16 mb-1">Phone:</h5>
                            <div class="text-muted">
                                    <p>{{this.company.phone}}</p>
                                </div>
                            </div>
                        <div class="col-sm-4 text-center">
                                    <h5 class="font-size-16 mb-1">Address:</h5>
                            <div class="text-muted">
                                    <p>{{this.company.address?this.company.address:'--'}}</p>
                            </div>
                        </div>
                    </div>

                    <hr class="my-4" />
                    <div class="py-2">
                        <h5 class="font-size-15">Employees</h5>
                        <div class="table-responsive">
                            <table class="table table-nowrap table-centered mb-0">
                                <thead>
                                    <tr>
                                        <th style="width: 70px;">No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th >Phone</th>
                                        <th >Date of Birth</th>
                                        <th >Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in this.employees" :key="index">
                                        <th scope="row">{{index+1}}</th>
                                        
                                        <td>
                                                {{item.nom}}
                                        </td>
                                        <td>{{item.email}} </td>
                                        <td>
                                                {{item.phone?item.phone:'--'}} 
                                                </td> 
                                        <td>
                                                {{item.date_of_birth?item.date_of_birth:'--'}} 
                                                </td> 
                                        <td>
                                                <div class="alert-success" v-if="item.verified==1" style="border-radius: 20px;">
                    Verified
                </div>
                <div class="alert-danger" v-else-if="item.verified==-1" style="border-radius: 20px;">
                    Not Verified
                </div>
                <div class="alert-warning" v-else style="border-radius: 20px;">
                    Accepted
                </div>
                                                </td> 
                                        
                                    </tr>
                                </tbody>
                            </table> <br>
                                <center>
                                    <div v-if="employees.length==0 && this.$auth.$storage.getCookie('user')['is_admin']==1" class="btn btn-primary"  v-b-modal.invite-user>
                                        Invite Employees
                                    </div>
                                </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end row -->
</div>
</template>
