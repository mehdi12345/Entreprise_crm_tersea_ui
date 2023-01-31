<script>

export default {
    components: {},
    props: {
        title: {
            type: String,
            default: '',
        },
        items: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
}
</script>

<template>
<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-flex align-items-center justify-content-between">
            <h3 class="text-dark font-weight-bold mb-0">{{ title }}</h3>

            <div class="page-title-right">
                <b-breadcrumb :items="items" class="m-0"></b-breadcrumb>
            </div>
        </div>
    </div>
</div>
<!-- end page title -->
</template>
