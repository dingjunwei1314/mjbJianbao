import Vue from 'vue'
import Router from 'vue-router' 
import PeripheryList from '@/components/PeripheryList/PeripheryList'
import QualityList from '@/components/QualityList/QualityList'
import DesignList from '@/components/DesignList/DesignList'   
import BriefingList from '@/components/BriefingList/BriefingList'  
import PlanningImplementationList from '@/components/PlanningImplementationList/PlanningImplementationList' 
import Quality from '@/components/Quality/Quality'
import Design from '@/components/Design/Design'
import Periphery from '@/components/Periphery/Periphery'
import PlanningImplementation from '@/components/PlanningImplementation/PlanningImplementation'
import Login from '@/components/Login/Login' 
 
Vue.use(Router);

var routers=new Router({
  routes: [
    {
      path: '/briefinglist',
      component: BriefingList
    },
    {
    	path:'/login',
    	component:Login
    },
    {
        path:'/qualitylist',
        component:QualityList
    },  
    {
        path:'/designlist',
        component:DesignList
    }, 
    {
        path:'/peripherylist',
        component:PeripheryList
    },
    {
      path:'/planningimplementationlist',
      component:PlanningImplementationList
    },
    {
    	path:'/quality',
    	component:Quality
    },
    {
    	path:'/design',
    	component:Design
    },
    {
    	path:'/periphery',
    	component:Periphery
    },  
    {
    	path:'/planningimplementation',
    	component:PlanningImplementation
    },
    { path: '/', redirect: '/login' },
  ]
})

routers.beforeEach((to,from,next) => {
    if(to.path == '/login'){
        next()
    }else{
        if(window.localStorage.jianbaotoken && window.localStorage.jianbaotoken == 'login'){
            next()
        }else{
            next('/login')
        }
    }
})

export default routers;