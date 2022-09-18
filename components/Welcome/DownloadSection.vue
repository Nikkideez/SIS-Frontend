<template>
  <section id="download">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col sm="4" class="hidden-xs-only">
              <v-img src="https://landingpagecalangoweb.web.app/img/ill2.3ec2157f.svg" class="d-block ml-auto mr-auto" max-width="350px" />
            </v-col>
            <v-col cols="12" sm="8" class="white--text text-left">
              <h1 class="font-weight-light display-2 mb-2">Our Repositories</h1>
              <h1 class="font-weight-light">
                Want to see how the application works? <br>
                Well if you're here to mark our project of course you want to see. <br>
                Here are some buttons for you to quickly see our repositories
              </h1>


              <v-container>
                <v-row>
                  <v-col>
                    <v-btn rounded block outlined href="https://github.com/Nikkideez/SIS-Frontend" target="_blank" large color="white">
                      <v-icon class="mr-2">
                        mdi-github
                      </v-icon>
                      Frontend Repository
                    </v-btn>
                  </v-col>

                  <!-- TODO: Change this to Backend Repo -->
                  <v-col>
                    <v-btn rounded block outlined href="https://github.com/Nikkideez/SIS-Frontend" target="_blank" large color="white">
                      <v-icon class="mr-2">
                        mdi-github
                      </v-icon>
                      Backend Repository
                    </v-btn>
                  </v-col>

                  <!-- TODO: Change this to AI Repo -->
                  <v-col>
                    <v-btn rounded block outlined href="https://github.com/Nikkideez/SIS-Frontend" target="_blank" large color="white">
                      <v-icon class="mr-2">
                        mdi-github
                      </v-icon>
                      AI Model Repository
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#download {
  background-image: url("assets\img\landing_page_background.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 500px;
}

#download .container,
#download .row {
  height: 100%;
}
</style>
