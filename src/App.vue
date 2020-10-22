<template>
  <div id="app">
    <div id="nav">
      <router-link to="/characters">Characters</router-link> |
      <router-link to="/comics">Comics</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.paging {
  list-style-type: none;
  bottom: 0;
  text-align: center;
}

.paging li {
  margin: 5px;
  color: #42b983;
  display: inline-block;
  padding: 4px;
}

.showcase {
  margin: 1em;
  text-align: left;
  margin-left: 45%;
}

.showDetails {
  margin-right: 1em;
  background-color: #42b983;
  padding: 8px;
  border-radius: 8px;
  border: none;
  margin-left: 8px;
}
</style>
