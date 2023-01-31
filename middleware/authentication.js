export default function({ store, route, redirect }) {
// if the user is not authenticate
if (!store.$auth.$storage.getCookie('loggedIn')) {
    return redirect('/auth/login')
}
}