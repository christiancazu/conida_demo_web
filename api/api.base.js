export default $axios => resource => ({
  get: params => $axios.$get(`${resource}/`, { params }),

  create: data => $axios.$post(`${resource}/`, data),

  // update: data => $axios.$put(`${resource}/${data.get('id')}/`, data),

  delete: id => $axios.$delete(`${resource}/${id}/`),

  getById: id => $axios.$get(`${resource}/${id}/`),

  getSatelitalImages: params => $axios.$get(`${resource}/project/`, { params })
})
