export default api => {
	api.Events = {
    // Comments //

    getComments(id) {
      return api.instance.request({
        method: 'get',
        url: `comments/${id}`,
      })
    },

    addComment(commentData) {
      return api.instance.request({
        method: 'put',
        url: 'comments/createOrEdit',
        data: commentData,
      })
    },

    deleteComment(id) {
      return api.instance.request({
        method: 'delete',
        url: `comments/${id}`,
      })
    },

    // Tasks //

    getTasks(filterData) {
      return api.instance.request({
        method: 'post',
        url: 'tasks',
        data: filterData,
      })
    },

    getTask(id) {
      return api.instance.request({
        method: 'get',
        url: `tasks/${id}`,
      })
    },

    deleteTask(id) {
      return api.instance.request({
        method: 'delete',
        url: `tasks/${id}`,
      })
    },

    changeStatus(id, statusData) {
      return api.instance.request({
        method: 'patch',
        url: `tasks/${id}/status/${statusData}`,
      })
    },

    addWorkTime(id, timeData) {
      return api.instance.request({
        method: 'patch',
        url: `tasks/${id}/worktime`,
        data: timeData,
      })
    },

    addOrEditTask(taskData) {
      return api.instance.request({
        method: 'put',
        url: 'tasks/createOrEdit',
        data: taskData,
      })
    },

    // Users //

    getUsers(filterData) {
      return api.instance.request({
        method: 'post',
        url: 'users',
        data: filterData,
      })
    },

    getAllUsers() {
      return api.instance.request({
        method: 'get',
        url: 'users/all',
      })
    },

    getUser(id) {
      return api.instance.request({
        method: 'get',
        url: `users/${id}`,
      })
    },

    editUser(formData) {
      return api.instance.request({
        method: 'put',
        url: 'users/edit',
        data: formData,
      })
    },

    loginUser(formData) {
      return api.instance.request({
        method: 'post',
        url: 'users/login',
        data: formData,
      })
    },

    deleteUser(id) {
      return api.instance.request({
        method: 'delete',
        url: `users/${id}`,
      })
    },
	}
}