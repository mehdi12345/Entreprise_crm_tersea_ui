<script>
 import AddCompanyModel from "../../components/add-company-model.vue";
 import InviteUserModel from "../../components/invite-user.vue";
 import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
    layout:'vertical',
    
    components: { AddCompanyModel,InviteUserModel },
    head() {
        return {
            title: `${this.title}`,
        };
    },
    data() {
        return {
            id:null,
            title: "Companies",
            items: [{
                    text: "Dashboard",
                    active: true,
                },
                {
                    text: "Companies",
                    active: true,
                },
            ],
            companies: [],
            currentPage:1,
            nextUrl:'',
            last_page:'',
            per_page:'',
        };
    },

    middleware: "admin",
    mounted() {this.fetchData() },
    watch: {
    currentPage: {
      handler: function (value) {
        this.fetchData().catch((error) => {
          console.error(error);
        });
        window.scrollTo(0, 0);
      },
    },
  },
    methods:{
        openModel(id){
this.id=id;
this.$bvModal.show('invite-user')
        },
      validToken(){
      return this.$auth.strategy.token.get();
    },
                linkGen(pageNum) {
             return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
handlePageChange(value) {
      this.currentPage = value;
    },
    
        async fetchData(){
            const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
    try{
        const [companies] = await Promise.all([
    this.$axios.post('getAllCompanies?page='+this.currentPage,bodyParameters,config),
  ])
  this.companies= companies.data.data;
  this.currentPage= companies.data.current_page;
  this.nextUrl= companies.data.next_page_url;
  this.last_page= companies.data.last_page;//data.next_page_url
  this.per_page= companies.data.per_page;//data.next_page_url
    }catch(error){
        Swal.fire({
        type: "error",
  title: 'Oops...',
  text: error.response.data.message,
  timer: 5500
}).then(() => {
    if(error.response.status==403)
    this.$router.push({ path: "/error" });
})
    }
        },
        async onDelete(id,name){
          const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
            var result = confirm("Delete the company : "+ name+" ?");
if (result) {
            try{await this.$axios.$post('company/delete/'+id,bodyParameters,config).then((res)=>{

            })
          this.$router.go({ path: "/companies" });
        } catch(error){
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
    <AddCompanyModel />
    
    <InviteUserModel :id="id" />
    <PageHeader :title="title" :items="items" />
<div class="row mb-2">
        <div class="col-md-6">
            <div class="mb-3 btn btn-primary waves-effect waves-light" v-b-modal.add-company><i class="fa fa-plus" style="font-size: 14px;"></i> Add Company
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-3 col-sm-6" v-for="(item, index) in companies" :key="index">
            <div class="card text-center">
                <div class="card-body">
                    <b-dropdown class="float-end" variant="white" right toggle-class="font-size-16 text-body p-0">
                        <template v-slot:button-content>
                            <i class="uil uil-ellipsis-h"></i>
                        </template>
                        <NuxtLink :to="`/companies/company-detail/${item.id}`" class="dropdown-item" v-b-tooltip.hover title="Detail">
                                    Detail
                        </NuxtLink>
                        <NuxtLink :to="`/companies/edit-company/${item.id}`" class="dropdown-item" v-b-tooltip.hover title="Edit">
                                    Edit
                        </NuxtLink>
                        <form  v-on:submit.prevent="onDelete(`${item.id}`,`${item.name}`)">
                        <button type="submit" class="dropdown-item" href="#">Remove</button>
                        </form>
                    </b-dropdown>
                    <div class="clearfix"></div>
                    <div class="mb-4">
                                <i class="fa fa-building display-4 mt-2" style="color:#f60"></i>
                    </div>
                    <h5 class="font-size-16 mb-1">
                           <a class="text-dark"><i class="mdi mdi-account"></i>&nbsp; {{ item.name }}</a>
                    </h5>
                     <p class="text-muted mb-2" v-if="item.phone!=null"><i class="mdi mdi-phone"></i>&nbsp; {{ item.phone }}</p>
                     <p class="text-muted mb-2" v-else-if="item.email!=null"><i class="mdi mdi-email"></i>&nbsp; {{ item.email }}</p>
                     <p class="text-muted mb-2" v-else><i class="mdi mdi-google-maps"></i>&nbsp; {{ item.address }}</p>
                     <center>
                        <button class="btn btn-primary" @click="openModel(item.id)">
                                <i class="fas fa-plus" style="font-size: 14px;"></i> Invite employees
                    </button>
                    
                     </center>
                </div>
            </div>
        </div>
    </div>
    
     <div class="row">
                        <div class="col">
                            <div class="dataTables_paginate paging_simple_numbers float-end">
                                <ul class="pagination pagination-rounded mb-0">
                                    <template>
  <div class="overflow-auto">
    <b-pagination-nav  v-model="currentPage" :link-gen="linkGen" @change="handlePageChange" :number-of-pages="last_page" use-router></b-pagination-nav>
  </div>
</template>

                                   
                                </ul>
                            </div>
                        </div>
                    </div>
</div>
</template>
<style>
.dropdown-toggle::after{
    display: none !important;
}
.dropdown.b-dropdown.float-end.btn-group{
position: absolute;
top: 0px;
right: 10px;
}
</style>
