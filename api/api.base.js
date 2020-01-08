export default $axios => resource => ({
  get: params => $axios.$get(`${resource}/`, { params }),

  create: data => $axios.$post(`${resource}/`, data),

  // update: data => $axios.$put(`${resource}/${data.get('id')}/`, data),

  // delete: slug => $axios.$delete(`${resource}/${slug}/`),

  // getById: slug => $axios.$get(`${resource}/${slug}/`)
})
