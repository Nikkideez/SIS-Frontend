export const state = () => ({
  counter: 0,
  user: null,
})

export const getters = {
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      state.user = null;
    } else {
      const { uid, email, displayName } = authUser;
      state.user = { uid, email, displayName };
    }
  }
}

export const actions = {
}