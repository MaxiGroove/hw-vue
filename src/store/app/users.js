import api from "@/api";

export const mutation = {
  SET_LOADING: 'SET_LOADING',
  SET_USERS_LIST: 'SET_USERS_LIST',
  SET_USERS: 'SET_USERS',
  SET_USERS_FILTER: 'SET_USERS_FILTER',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_MY_DATA: 'SET_MY_DATA',
}

export default {
  namespaced: true,
  state: {
    loading: true,
    usersList: {

    },
    users: [],
    usersFilter: {
      filter: {},
      page: 0,
      limit: 0,
    },
    userData: {},
    myData: {},

  },

  getters: {
    loading: state => state.loading,
    usersList: state => state.usersList,
    users: state => state.users,
    usersFilter: state => state.usersFilter,
    userData: state => state.userData,
    myData: state => state.myData,
  },

  mutations: {
    [mutation.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading;
    },
    [mutation.SET_USERS_LIST]: (state, usersListData) => {
      state.usersList = usersListData;
    },
    [mutation.SET_USERS]: (state, usersData) => {
      state.users = usersData;
    },
    [mutation.SET_USERS_FILTER]: (state, filterData) => {
      state.usersFilter = filterData;
    },
    [mutation.SET_USER_DATA]: (state, data) => {
      state.userData = data;
    },
    [mutation.SET_MY_DATA]: (state, data) => {
      state.myData = data;
    },
  },

  actions: {
    setLoading: ({ dispatch, commit }, value) => {
      commit(mutation.SET_LOADING, value);
    },

    fetchUsers: ({dispatch, commit }, value) => {
      dispatch('setLoading', true);
      let allUsers = {};
      api.Events.getAllUsers().then(({data}) => {
        data.map((item) => {
          allUsers[item.id] = item.username;
        });
        commit(mutation.SET_USERS_LIST, allUsers);
        dispatch('setLoading', false);
      })
    },

    setUsersFilters: ({ dispatch, commit }, filter) => {
      console.log(filter);
      commit(mutation.SET_USERS_FILTER, filter);
      dispatch('fetchUsersFilter', false);
    },

    fetchUsersFilter: ({ dispatch, commit }, filter) => {
      dispatch('setLoading', true);
      api.Events.getUsers(filter).then(({data}) => {
        commit(mutation.SET_USERS, data);
        dispatch('setLoading', false);
      });
    },

    getUserData: ({ dispatch, commit}, id) => {
      api.Events.getUser(id).then(({data}) => {
        commit(mutation.SET_USER_DATA, data)
      })
    },

    editUser: ({dispatch, commit}, form) => {
      api.Events.editUser(form).then(({data}) => {
        commit(mutation.SET_USER_DATA, data)
      })
    },

    login: ({ dispatch, commit }, form) => {
      api.Events.loginUser(form).then(({data}) => {
        localStorage.setItem('id', data.id);
        localStorage.setItem('password', form.password);
      })
    },
    
    getMyData: ({ dispatch, commit}, id) => {
      api.Events.getUser(id).then(({data}) => {
        commit(mutation.SET_MY_DATA, data)
      })
    }
  }
}