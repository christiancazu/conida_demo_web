/**
 * parse object to FormData
 */
export default function (obj) {
  const formData = new FormData()

  Object.keys(obj).forEach(key => formData.append(key, obj[key]))

  return formData
}
