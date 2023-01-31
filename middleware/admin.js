export default function({ store, route, redirect }) {
    // if the user is not authenticate
    if (!store.$auth.$storage.getCookie('user')) {
        return redirect('/auth/login')
    }else if(store.$auth.$storage.getCookie('user')['is_admin']!=1){
        return redirect('/')
    }
    }