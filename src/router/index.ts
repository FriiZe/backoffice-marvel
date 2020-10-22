import CharacterList from "@/components/CharacterList";
import ComicList from "@/components/ComicList";
import NotFoundPage from "@/components/NotFoundPage";
import ViewCharacter from "@/components/ViewCharacter";
import ViewComic from "@/components/ViewComic";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RouteName from "./route-name";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: RouteName.Home,
    redirect: "characters"
  },
  {
    path: "/characters",
    name: RouteName.CharacterList,
    component: CharacterList
  },
  {
    path: "/characters/:characterId",
    name: RouteName.ViewCharacter,
    component: ViewCharacter,
    props: route => ({
      characterId: route.params.characterId
    })
  },
  {
    path: "/comics",
    name: RouteName.ComicList,
    component: ComicList
  },
  {
    path: "/comics/:comicId",
    name: RouteName.ViewComic,
    component: ViewComic,
    props: route => ({
      comicId: route.params.comicId
    })
  },
  {
    path: "*",
    name: RouteName.NotFound,
    component: NotFoundPage
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
