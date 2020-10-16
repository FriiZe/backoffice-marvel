import Character from "@/models/characters";
import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import axios from "axios";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import Comic from "@/models/comics";

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, { axios });

const database = new VuexORM.Database();

// Register Models to Database.
database.register(Character);
database.register(Comic);

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
});

export default store;
