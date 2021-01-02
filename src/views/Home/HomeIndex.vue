<template>
  <div>
    <!--Header-->
    <div class="header bg-white pt-5 pb-7 bg-image">
      <div class="container">
        <div class="header-body" style="margin: 250px 10px 250px 10px">
          <div class="row align-items-center">

            <div class="col-lg-6">
              <div class="pr-5">
                <h1 class="display-2 text-dark font-weight-bold mb-0">Sell on Artishup</h1>
                <h2 class="display-4 text-dark font-weight-light">Earn money with your artworks</h2>
                <h3 class="text-dark mt-4">Your artwork can be sold on several different products.</h3>
                <h3 class="text-dark mt-4">You get paid for every sale made!</h3>

                <div class="mt-5">
                  <router-link to="/register" v-if="!this.loggedIn" class="btn btn-dark my-2">Start Selling</router-link>
                  <router-link to="/dashboard" v-if="this.loggedIn" class="btn btn-dark my-2">Start Selling</router-link>

                  <router-link to="/login" v-if="!this.loggedIn" class="btn btn-outline-dark my-2">Login</router-link>
                  <a href="https://artishup.com/pages/about-us"
                     target="_blank"
                     v-if="this.loggedIn"
                     class="btn btn-outline-dark my-2">More About Us</a>
                </div>
              </div>
            </div>

            <div class="separator separator-bottom separator-skew zindex-100">
              <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                   xmlns="http://www.w3.org/2000/svg">
                <polygon class="fill-primary" points="2560 0 2560 100 0 100"></polygon>
              </svg>
            </div>

          </div>
        </div>
      </div>
    </div>


    <!-- Page content -->
    <section class="py-6 pb-9 pl-3 pr-3 bg-primary">
      <div class="row justify-content-center text-center">
        <div class="col-md-6">
          <h2 class="display-3 text-dark">We Are ArtishUp</h2>
          <p class="lead text-dark">
            We provide a free platform for anyone who wants to sell their artworks on physical products such as phone
            cases, tote bags, t-shirts and more.
            It is very simple: for every product sold with your artwork you automatically get paid.
            All you have to do is create and upload your art; we take care of the rest.
          </p>
          <a class="btn btn-dark my-2" target="_blank" href="https://docs.google.com/presentation/d/1cuApVC5Wc4wIKAkBcOuX1a8FVlsf7GM2e-eSZ4H-Raw/edit?usp=sharing">
            Click here to see more...
          </a>
        </div>
      </div>
    </section>

    <section class="py-7 section-nucleo-icons bg-white overflow-hidden">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-3">How it Works</h2>
            <p class="lead">
              We’ve got everything you need to sell your art hassle free at no cost to you
            </p>
            <div class="btn-wrapper">
              <!--              <a href="https://demos.creative-tim.com/vue-argon-dashboard-pro/documentation/foundation/icons.html" class="btn btn-primary">View demo icons</a>-->
              <!--              <a href="https://nucleoapp.com/?ref=1712" target="_blank" class="btn btn-default mt-3 mt-md-0">View all icons</a>-->
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-12">

            <div class="row">
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5 text-center">
                    <div class="icon icon-shape bg-gradient-primary text-white rounded-circle mb-4">
                      <i class="fas fa-paint-roller"></i>
                    </div>
                    <h4 class="h3 text-primary text-uppercase">Brand Equity</h4>
                    <p class="description mt-3">Make your own space on artishup.com where your artworks will be sold.
                      Your store front is customizable.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5 text-center">
                    <div class="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                      <i class="fas fa-crop-alt"></i>
                    </div>
                    <h4 class="h3 text-success text-uppercase">Easy artwork upload</h4>
                    <p class="description mt-3">A simple and easy to use system was developed for you. When you upload
                      your artworks you can see what the final product will look like.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5 text-center">
                    <div class="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                      <i class="fas fa-bullhorn"></i>
                    </div>
                    <h4 class="h3 text-warning text-uppercase">Marketing</h4>
                    <p class="description mt-3">Your products have a chance to be featured on our social media accounts
                      - free of charge to you.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5 text-center">
                    <div class="icon icon-shape bg-gradient-yellow text-white rounded-circle mb-4">
                      <i class="fas fa-globe-americas"></i>
                    </div>
                    <h4 class="h3 text-yellow text-uppercase">Worldwide Sales</h4>
                    <p class="description mt-3">Our platform reaches people all over the globe. This is your ‘one stop
                      shop set-up’ to be on various online marketplaces.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5 text-center">
                    <div class="icon icon-shape bg-gradient-red text-white rounded-circle mb-4">
                      <i class="fas fa-box-open"></i>
                    </div>
                    <h4 class="h3 text-red text-uppercase">Production & Shipping</h4>
                    <p class="description mt-3">We take care of inventory, production, shipping and customer service of
                      each product - one less thing for you to worry about.</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5 text-center">
                    <div class="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                      <i class="fas fa-laptop-code"></i>
                    </div>
                    <h4 class="h3 text-info text-uppercase">User-Friendly Website</h4>
                    <p class="description mt-3">We provide an easy to use website where you can manage your artworks,
                      products, sales, etc., just like owning your own store.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-7">
      <div class="container">
        <div class="row row-grid justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-3">Selling More</h2>
            <p class="lead">We spread your creativity through different channels</p>
            <div class="text-center">
              <div class="row justify-content-center">
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Artishup Store">
                    <a href="#">
                      <img src="img/home/artishup.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Amazon">
                    <a href="#">
                      <img src="img/home/amazon.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Ebay">
                    <a href="#">
                      <img src="img/home/ebay.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Etsy">
                    <a href="#">
                      <img src="img/home/etsy.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Pinterest">
                    <a href="#">
                      <img src="img/home/pinterest.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Instagram">
                    <a href="#">
                      <img src="img/home/insta.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Facebook">
                    <a href="#">
                      <img src="img/home/facebook.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Buzzfeed">
                    <a href="#">
                      <img src="img/home/buzzfeed.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Houzz">
                    <a href="#">
                      <img src="img/home/houzz.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip placement="top" content="Waneloo">
                    <a href="#">
                      <img src="img/home/waneloo.png" class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  .bg-image {
    background: url('/img/home/home-bg-backup.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left;
  }
</style>

<script>
  import {Tooltip} from 'element-ui'
  import {mapGetters} from "vuex";

  export default {
    name: 'home-page',
    components: {
      [Tooltip.name]: Tooltip
    },
    computed: {
      ...mapGetters('auth', [
        'loggedIn'
      ])
    },
    data() {
      return {

      }
    }
  };
</script>
