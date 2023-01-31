
  <script>
  import Swal from 'sweetalert2/dist/sweetalert2.js'

  export default {
    layout: "vertical",
    middleware: "admin",
    head() {
      return {
        title: `${this.title}`,
      };
    },
    data() {
      return {
        invitations:[],
        perPage:10,
        title: 'Invitations',
        items: [
          {
            text: "Dashboard",
          },
          {
            text: 'Invitations',
            active: true,
          },
        ],
        totalRows: 1,
        pageOptions: [10, 25, 50, 100],
        filter: null,
        filterOn: [],
        currentPage:1,
  
        fields: [
          {
            key: "employee_name",
            label: "Name ",
            sortable: true,
          },
          {
            key: "employee_email",
            label: 'Address',
            sortable: true,
          },
          {
            key: "employee_phone",
            label: 'Phone',
            sortable: true,
          },
          {
            key: "employee_address",
            label: "Email",
            sortable: true,
          },
          {
            key: "status",
            label: "Invitation Status",
            sortable: true,
          },
          {
            key: "user_status",
            label: "User Status",
            sortable: true,
          },
          {
            key: "company_name",
            label: "Company",
            sortable: true,
          },
          "action"
        ],
      };
    },
    methods: {
        async changeStatus(id,status){
            const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
            try{
      let formData = new FormData();
      formData.append("id",id);
      formData.append("status",status);
        await this.$axios.$post("changeStatus", formData, config).then(()=>{
            location.reload();
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
        },
      validToken(){
      return this.$auth.strategy.token.get();
    },
    onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
    },
    computed: {
        rows() {
            return this.invitations.length;
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
    },
    async fetch(){
      let url = "getInvitation";
    const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
    await this.$axios.post(url,bodyParameters,config).then((res)=>{
      
    this.invitations = res.data;
    });
    }
  };
  
  </script>
   <template>
    <div>
        <PageHeader :title="title" :items="items" />
      <div class="row" v-if="invitations.length != 0">
        <div class="table-responsive mb-0">
          <div class="row mt-3 mx-3">
            <!-- Search -->
            <div class="col-sm-12 col-md-6 mt-3">
              <div id="tickets-table_length" class="dataTables_length">
              <label class="d-inline-flex align-items-center">
                Show 
                <b-form-select
                  v-model="perPage"
                  size="sm"
                  :options="pageOptions"
                ></b-form-select
                > entries 
              </label>
            </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="d-flex-end text-md-end mt-1" style="display: flex;">
                <label class="d-inline-flex align-items-center">
                  <div class="search-box">
                    <div class="position-relative">
                      <input
                        v-model="filter"
                        type="search"
                        class="form-control form-control-md ml-2 border-primary rounded"
                        placeholder="Recherche..."
                      />
                      <i class="uil uil-search search-icon"></i>
                    </div>
                  </div>
                </label>
                <div class="float-end mx-3 mt-1">
                  <Nuxt-link to="/companies">
                    <button
                      type="button"
                      class="btn btn-danger waves-effect waves-light mb-3"
                    >
                      <i class="fa fa-plus"></i> Add New Employee 
                    </button>
                  </Nuxt-link>
                </div>
              </div>
            </div>
            <!-- End search -->
          </div>
          <!-- Table -->
  
          <b-table
            table-class="table table-centered datatable table-card-list"
            thead-tr-class="bg-thead text-center"
            :items="invitations"
            :fields="fields"
            responsive="sm"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :filter-included-fields="filterOn"
          >
          <template v-slot:cell(employee_phone)="data">
            <div class="text-center">
              {{ data.item.employee_phone?data.item.employee_phone:'--' }}
            </div>
          </template>
          <template v-slot:cell(employee_address)="data">
            <div class="text-center">
              {{ data.item.employee_address?data.item.employee_address:'--' }}
            </div>
          </template>
          <template v-slot:cell(action)="data">
            <div class="text-center btn btn-primary" v-if="data.item.status==1" @click="changeStatus(data.item.id,0)" >
              Cancel
            </div>
            <div class="text-center btn btn-primary" v-else  @click="changeStatus(data.item.id,1)">
              Activate
            </div>
          </template>
          <template v-slot:cell(status)="data">
            <div class="text-center">
                <div class="alert-success" v-if="data.item.status==1" style="border-radius: 20px;">
                    Activate
                </div>
                <div class="alert-danger" v-else style="border-radius: 20px;">
                    Cancel
                </div>
            </div>
          </template>
          <template v-slot:cell(user_status)="data">
            <div class="text-center">
                <div class="alert-success" v-if="data.item.user_status==1" style="border-radius: 20px;">
                    Verified
                </div>
                <div class="alert-danger" v-else-if="data.item.user_status==-1" style="border-radius: 20px;">
                    Not Verified
                </div>
                <div class="alert-warning" v-else style="border-radius: 20px;">
                    Accepted
                </div>
            </div>
          </template>
          </b-table>
        </div>
        <div class="row">
                        <div class="col">
                            <div class="dataTables_paginate paging_simple_numbers float-end">
                                <ul class="pagination pagination-rounded mb-0">
                                    <!-- pagination -->
                                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                </ul>
                            </div>
                        </div>
                    </div>
      </div>
      <div class="row justify-content-center mb-4" v-else>
        <div class="col-auto text-center">
          <h5>No Invitations </h5>
          <Nuxt-link to="/companies">
            <b-button variant="primary" class="mx-2">
              <span class="">Add New Employee </span>
            </b-button>
          </Nuxt-link>
        </div>
      </div>
    </div>
    
  </template>
  <style>
  .bg-thead {
    background-color: #f60 !important;
    color: white !important;
  }
  .page-item {
    margin: 0.2rem;
  }
  .pagination-lg .page-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
  }
  .page-item.active .page-link {
    background-color: #f60;
    border-color: #f60;
  }
  .btn-outline-primary {
    color: #f60 !important;
    border-color: transparent;}
    .btn-outline-primary:hover,
    .btn-outline-primary:focus {
      transform: scale(1.02, 1.02);
      background-color: #f60;
      border-color: #f60;
      color: white !important;
      box-shadow: none;
    }
  .btn-outline-primary i {
    font-size: 18px;
  }
  .border-primary {
    border-color: #f60 !important;
  }
  .btn-primary {
    background-color: #f60;
    border-color: #f60;
    font-size: 16px;
    border-radius: 6px;
  }
    .btn-primary:hover,
    .btn-primary:focus {
      transform: scale(1.02, 1.02);
       background-color: #f60;
      color: white;
      border-color: #f60;
    }
  
  
  .wrap {
      width: 250px;
      height: 50px;
      background: #fff;
      border-radius: 10px;
  }
  .stars {
      width: fit-content;
      margin: 0 auto;
      cursor: pointer;
  }
  .star {
      color: #f80 !important;
  }
  .rate {
      height: 50px;
      margin-left: -5px;
      padding: 2px;
      font-size: 15px;
      position: relative;
      cursor: pointer;
  }
  .rate input[type="radio"] {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,0%);
      pointer-events: none;
  }
  
  
  .rate:nth-child(1) .face::after {
      content: "\f119"; /* ☹ */
  }
  .rate:nth-child(2) .face::after {
      content: "\f11a"; /* 😐 */
  }
  .rate:nth-child(3) .face::after {
      content: "\f118"; /* 🙂 */
  }
  .rate:nth-child(4) .face::after {
      content: "\f580"; /* 😊 */
  }
  .rate:nth-child(5) .face::after {
      content: "\f59a"; /* 😄 */
  }
  .face {
      opacity: 0;
      position: absolute;
      width: 25px;
      height: 25px;
      background: #f80;
      border-radius: 5px;
      top: -35px;
      left: -2px;
      transition: 0.2s;
      pointer-events: none;
  }
  .face::before {
      font-family: 'Font Awesome 5 Free';
    font-weight: 900;
      content: "\f0dd";
      display: inline-block;
      color: #f80;
      z-index: 1;
      position: absolute;
      left: 8px;
      bottom: -15px;
  }
  .face::after {
      font-family: 'Font Awesome 5 Free';
    font-weight: 900;
      display: inline-block;
      color: #fff;
      z-index: 1;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      top: 50%;
  }
  
  .rate:hover .face {
      opacity: 1;
  }
  .search-box .search-icon{
    font-size: 16px;
    position: absolute;
    left: 13px;
    top: 0;
    line-height: 38px;
  }
  .search-box .form-control{
    border-radius: 30px;
    padding-left: 40px;
  }
  .custom-select{
        padding-top: .25rem;
    padding-bottom: .25rem;
    padding-left: .5rem;
    font-size: .7875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
  }
  .table-responsive-sm{
    margin: 25px;
  }
  .table th, .table td{
    text-align: center;
  }
  </style>
  