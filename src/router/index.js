import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Bill from '@/components/Bill'
import PosUser from '@/components/pos/PosUser'
import AddUser from '@/components/pos/AddUser'
import PosMachinel from '@/components/pos/PosMachinel'
import AddMachine from '@/components/pos/AddMachine'
import PosBusiness from '@/components/pos/PosBusiness'
import Index from '@/components/pos/Index'
import UserMachine from '@/components/pos/UserMachine'
import CreditCard from '@/components/CreditCard/CreditCard'
import Consume from '@/components/CreditCard/Consume'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Bill',component: Bill
    },
    {
      path: '/CreditCard',component: CreditCard
    },
    {
      path: '/Consume',component: Consume
    },
    {
      path: '/PosUser',component: PosUser
    },
    {
      path: '/PosBusiness',component: PosBusiness
    },
    {
      path: '/PosMachinel',component: PosMachinel
    },
    {
      path: '/PosMachinel/:singleUser',component: PosMachinel,props:true
    },
    {
      path: '/AddMachine',component: AddMachine
    },
    {
      path: '/AddUser',component: AddUser
    },
    {
      path: '/Index',component: Index
    },
    {
      path: '/UserMachine',component: UserMachine
    },
    {
      path: '/', name: 'Index', component: Index
    }
  ]
})
