import VueRouter from "vue-router";
import Page404 from '@/pages/page404/page404';
import Task from '@/components/pagetask/PageTask';
import TaskList from '@/components/tasklist/TaskList'
import UserList from '@/components/userlist/UserList'
import CreateOrEdit from '@/components/createoredit/CreateOrEdit';
import User from '@/components/user/User';

Vue.use(VueRouter);

const router = () => {
  return new VueRouter({
    mode: 'hash',
    routes: [
      {
        path: '/',
        name: 'Login',
        props: true,
      },
      {
        path: '/task-list',
        component: TaskList,
        name: 'TaskList',
        props: true,
      },
      {
        path: '/404',
        component: Page404,
        name: 'Page404',
        props: true,
      },
      {
        path: '*',
        redirect: '/404',
        props: true,
      },
      {
        path: '/user-list',
        component: UserList,
        name: 'UserList',
        props: true,
      },
      {
        path: '/task-edit',
        component: CreateOrEdit,
        name: 'AddTask',
        props: true,
      },
      {
        path: '/task-edit/:id',
        component: CreateOrEdit,
        name : 'EditTask',
        props: true,
      },
      {
        path: '/task/:id',
        component: Task,
        name: 'Task',
        props: true,
      },
      {
        path: '/user/:id',
        component: User,
        name: 'User',
        props: true,
      },

    ]
  });
}

export default router;