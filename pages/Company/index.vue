<script>

export default {
    layout:'vertical',
        head() {
        return {
            title: `${this.title}`,
        };
    },
    data() {
        return {
            id:null,
            title: "Company",
            items: [{
                    text: "Dashboard",
                    active: true,
                },
                {
                    text: "Company",
                    active: true,
                },
            ],
            company: [],
        };
    },

    middleware: "authentication",
    mounted() {this.fetchData() },
    methods:{
      validToken(){
      return this.$auth.strategy.token.get();
    },
    
        async fetchData(){
            const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
    const [company] = await Promise.all([
    this.$axios.post('getCompany',bodyParameters,config),
  ])
  this.company= company.data;
        },
    }
};
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />

    <div class="row">
        <div class="col-xl-3 col-sm-6">
            <div class="card text-center">
                <div class="card-body">
                    <b-dropdown class="float-end" variant="white" right toggle-class="font-size-16 text-body p-0">
                        <template v-slot:button-content>
                            <i class="uil uil-ellipsis-h"></i>
                        </template>
                        <NuxtLink :to="`/companies/company-detail/${company.id}`" class="dropdown-item" v-b-tooltip.hover title="Detail">
                                    Detail
                        </NuxtLink>
                    </b-dropdown>
                    <div class="clearfix"></div>
                    <div class="mb-4">
                                <i class="fa fa-building display-4 mt-2" style="color:#f60"></i>
                    </div>
                    <h5 class="font-size-16 mb-1">
                           <a class="text-dark"><i class="mdi mdi-account"></i>&nbsp; {{ company.name }}</a>
                    </h5>
                     <p class="text-muted mb-2" v-if="company.phone!=null"><i class="mdi mdi-phone"></i>&nbsp; {{ company.phone }}</p>
                     <p class="text-muted mb-2" v-else-if="company.email!=null"><i class="mdi mdi-email"></i>&nbsp; {{ company.email }}</p>
                     <p class="text-muted mb-2" v-else><i class="mdi mdi-google-maps"></i>&nbsp; {{ company.address }}</p>
                </div>
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
