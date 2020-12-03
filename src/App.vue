<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand "
        ><img
          src="./assets/logo.png"
          width="45"
          height="45"
          alt="Home"
          loading="lazy"
        />
      </router-link>
      <h3>
        Artificial Intelligence
      </h3>

      <a href="https://github.com/Digao1297/IAstudies-web" target="_blank">
        <i class="fa fa-github"> </i>
      </a>
    </nav>
    <div class="container-fluid">
      <router-view />
    </div>
    <div class="footer ">
      <p>Feito com <i class="fa fa-heart"></i></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: rgba(0, 0, 0, 0.87);
  padding: 8px;
}
.navbar-brand {
  margin-left: 5rem;
}
h3 {
  color: #fff;
}
a > i {
  color: #fff;
  font-size: 30px;
  margin: 0 2rem 0 0;
}
p > i {
  vertical-align: middle;
  color: #f44336;
  font-size: 25px;
}
</style>
