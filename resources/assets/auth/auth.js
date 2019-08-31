import Vue from 'vue'
import 'babel-polyfill'

import Login from './components/Login'
import Register from './components/Register'

Vue.component('Login', Login)
Vue.component('Register', Register)

new Vue({ // eslint-disable-line no-new
    el: '#members',
    data () {
        return {
            isLogin: location.pathname === '/login',
            isRegister: location.pathname === '/register'
        }
    }
})
