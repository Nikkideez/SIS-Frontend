export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  // app.router.afterEach((to, from) => {
  //   //do something to validate
  //   console.log("test")
  // })

  // WORKS BUT AFTER REROUTE, CHILD DIFFERENT TO SERVER -> FALL BACK TO CLIENT RENDER
  app.router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(!['index', 'auth'].includes(to.name))
    if (!process.server && !['index', 'auth'].includes(to.name)) {   //Check if SSR and in landing page
      app.$fire.auth.onAuthStateChanged((user) => {
        console.log(user)
        if (!user) {
          console.log("USER NOT LOGGED IN")
          next({ name: 'auth' })
        } else {
          console.log("USER LOGGED IN")
          next()
        }
      })
    } else {
      next()
    }
  })

  // Every time the route changes (fired on initialization too)
  // app.router.afterEach((to, from) => {
  //   //do something to validate
  //   console.log(to)
  //   console.log(process.server)
  //   console.log(!['index', 'auth'].includes(to.name))
  //   console.log(app.router)
  //   if (!process.server && !['index', 'auth'].includes(to.name)) {   //Check if SSR and in landing page
  //     app.$fire.auth.onAuthStateChanged((user) => {
  //       console.log(user)
  //       if (!user) {
  //         console.log("USER NOT LOGGED IN")
  //         app.router.push({ name: 'auth' })
  //       } else {
  //         console.log("USER LOGGED IN")
  //       }
  //     })
  //   }
  // })
}