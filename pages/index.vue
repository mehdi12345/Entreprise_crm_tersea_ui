<script>
export default {
  head() {
        return {
            title: `${this.title}`
        };
    },
  data() {
    return {
      title:'Profile',
      user: null,
    };
  },
  async fetch() {
    let url = "user";
    const config = {
    headers: { Authorization: `Bearer ${this.validToken()}` }
};
const bodyParameters = {
   key: "value"
};
    await this.$axios.post(url,bodyParameters,config).then((res)=>{
      
    this.user = res.data;
    });
  },
  methods: {
    validToken(){
      return this.$auth.strategy.token.get();
    }
  },
  middleware: 'authentication',
  layout: "vertical",
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col-xl-12">
        <ProfileInfo :user="user"/>
      </div>

    </div>

    <div class="row">
      <div class="col-12 col-xl-12">
        <AccountInfo :user="user" />
      </div>
    </div>
  </div>
</template>
