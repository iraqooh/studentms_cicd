<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link :to="{ name: 'home'}" class="text-decoration-none">
          <a class="navbar-brand text-light" href="#">Cyber School</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/students">Students</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/fees">Fees</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/payments">Payments</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="user" />
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Appearance</a></li>
                <li><a class="dropdown-item" href="#">Help</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Router View -->
    <div class="main-content">
        <router-view />
    </div>

    <!-- Footer -->
    <footer class="footer bg-light text-center text-lg-start mt-5">
      <div class="container p-4">
        <div class="row">
          <div class="col-lg-3 col-md-12 mb-4 mb-md-0">
            <h5 class="text-uppercase">Cyber School</h5>
            <p>Manage your school efficiently with Cyber School Management System.</p>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Links</h5>
            <ul class="list-unstyled mb-0">
              <li>
                <a href="#" class="text-dark">About Us</a>
              </li>
              <li>
                <a href="#" class="text-dark">Contact</a>
              </li>
              <li>
                <a href="#" class="text-dark">Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="text-dark">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Follow Us</h5>
            <ul class="list-unstyled mb-0">
              <li>
                <a href="#" class="text-dark">Facebook</a>
              </li>
              <li>
                <a href="#" class="text-dark">Twitter</a>
              </li>
              <li>
                <a href="#" class="text-dark">Instagram</a>
              </li>
              <li>
                <a href="#" class="text-dark">LinkedIn</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-4 mb-4 mb-md-0 text-center p-3">
            <a href="#app" class="btn btn-primary">
              <font-awesome-icon icon="arrow-up" />
            </a>
          </div>
        </div>
        <div class="text-center mt-5">
          <p><span><img src="./assets/powellpay.png" alt="powellpay_logo" class="logo me-2"/></span>&copy; 2024 Powellpay Limited</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
      name: 'App',
      
  };
</script>

<style>
    /* Global Styles */
    body, html {
      height: 100%;
      margin: 0;
    }

    .navbar {
      background: blue;
      background: -webkit-linear-gradient(bottom left, blue, whitesmoke);
      background: -ms-linear-gradient(bottom left, blue, whitesmoke);
      background: linear-gradient(to top right, blue, whitesmoke);
    }

    #app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .footer {
      flex-shrink: 0;
      background-color: whitesmoke;
      background: radial-gradient(rgb(162, 163, 177), rgb(159, 166, 205), whitesmoke);
      animation: bounce;
      animation-duration: 4s;
      --animate-repeat: 2;
    }

    .logo {
      width: 25px;
    }
</style>