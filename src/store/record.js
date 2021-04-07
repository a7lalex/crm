import firebase from "firebase/app";
export default {
  actions: {
    async RecordCreate({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records`).push({record})
      }catch (e) {
        console.log(e)
        commit('setError', e)
        throw e
      }
    }
  }
}
