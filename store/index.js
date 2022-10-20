export const state = () => ({
  calendar: null,
  user: null,
  heightContainer: 0,
})

export const getters = {
}

export const mutations = {
  SET_CALENDAR(state, payload) {
    state.calendar = payload;
  },
  SET_HEIGHT_CONTAINER(state, payload) {
    state.heightContainer = payload;
  },
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