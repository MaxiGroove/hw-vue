import api from "@/api";

export const mutation = {
  SET_LOADING: 'SET_LOADING',
  SET_TASKS: 'SET_TASKS',
  SET_FILTER: 'SET_FILTER',
  SET_CURRENT_TASK: 'SET_CURRENT_TASK',
}

export default {
  namespaced: true,
  state: {
    loading: true,
    tasks: [],
    filter: {
      filter: {},
      page: 0,
      limit: 0,
    },
    currentTask: {},
  },

  getters: {
    loading: state => state.loading,
    tasks: state => state.tasks,
    filter: state => state.filter,
    currentTask: state => state.currentTask,
  },

  mutations: {
    [mutation.SET_LOADING]: (state, isLoading) => {
      state.loading = isLoading;
    },
    [mutation.SET_TASKS]: (state, tasksData) => {
			state.tasks = tasksData
		},
    [mutation.SET_FILTER]: (state, filterData) => {
      state.filter = filterData;
    },
    [mutation.SET_CURRENT_TASK]: (state, currentTaskData) => {
      state.currentTask = currentTaskData;
    },
  },

  actions: {
    setLoading: ({ dispatch, commit }, value) => {
      commit(mutation.SET_LOADING, value);
    },

    fetchTasks: ({ dispatch, commit }, value) => {
      dispatch('setLoading', true)
      api.Events.getTasks(value).then(({data}) => {
        dispatch('setLoading', false);
        commit(mutation.SET_TASKS, data);
      })
    },

    getTask: ({dispatch, commit}, id) => {
      dispatch('setLoading', true);
      api.Events.getTask(id).then(({data}) => {
        dispatch('setLoading', false);
        commit(mutation.SET_CURRENT_TASK, data);
      })
    },

    setFilter: ({ dispatch, commit }, filter) => {
			commit(mutation.SET_FILTER, filter)
			dispatch('fetchTasks', filter);
		},
  }
}