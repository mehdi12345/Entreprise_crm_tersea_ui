<script>
export default {
    
    head() {
        return {
            title: `${this.title}`
        };
    },
    data() {
    return {
        title:'Error Page',
    };
  },
};
</script>

<template>
<div>
    <div class="account-pages my-5">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center">
                            <img src="~/assets/images/error.png" alt="" height="400" />
                    </div>
                    <h1 class="text-center" style="color:#f60">Page Not Found !</h1>
                </div>
            </div>
                    </div>
            </div>
        </div>
    </div>
</div>
</template>
