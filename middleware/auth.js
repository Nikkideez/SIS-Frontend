export default function ({ app, route, from, store, redirect }) {
  // if (!store.state.user) {
  //   console.log("Currently in Middleware")
  //   redirect("/auth")
  // }
  console.log("MIDDLE WARE TEST")
  // app.router.beforeResolve((to, from, next) => {
  //   console.log("TEST BEFORE RESOLVE")
  //   next()
  // });
  app.$fire.auth.onAuthStateChanged((user) => {
    console.log(user)
    if (!user) {
      console.log("USER NOT LOGGED IN")
    } else {
      console.log("USER LOGGED IN")
    }
  })
}