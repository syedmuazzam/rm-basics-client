import Api from '@/services/Api'

export default {
  signin (credentials) {
    return Api().post('signin', credentials)
  },

  register (credentials) {
    return Api().post('register', credentials)
  }
}