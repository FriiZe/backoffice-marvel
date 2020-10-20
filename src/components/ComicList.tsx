
import AppLoadingMixin from '@/mixins/AppLoadingMixin';
import Comic from '@/models/comics';
import RouteName from '@/router/route-name';
import { VNode } from 'vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)

@Component
export default class ComicList extends AppLoadingMixin {

  @Watch('currentPage', {immediate: true})
   async onPageChange(): Promise<void>{
    this.isLoading = true;
    await this.loadData();
    this.isLoading = false;
  }

  public totalPages: number | null = null;

  public currentPage = 1;

  public comicsList: Comic[] = [];

  public comicsId: string[] = [];

  private renderComics() {
    return this.comicsList.map((comic) =>  (
      <div>
      <div class="font-weight-bold">{comic.title}</div>
      <button
        onClick={() => this.redirectComic(comic.id)}
      >Voir encore plus</button>
      </div>
    ))
  }

  public redirectComic(comicId: string): void {
    this.$router.push({name: RouteName.ViewComic, params: { comicId }});
  }

  public async loadData(): Promise<void> {
    const {total, entity} = await Comic.fetchAll(this.currentPage);
    this.totalPages = Math.ceil(total/10);
    this.comicsId = entity.map((comic: Comic) => (comic.id));
    this.comicsList = Comic.query().whereIdIn(this.comicsId).orderBy('title').all();
  }

  public renderPage(): VNode{
    return (
      <div>
        <h1>Comics</h1>
        {this.renderComics()} 
        <paginate
          pageCount={this.totalPages}
          clickHandler={(value: number) => { this.currentPage = value}}
          prevText='Prev'
          nextText='Next'
          containerClass="'className'"
          v-model={this.currentPage}>
        </paginate>
      </div>
    )
  }

  public async  created(): Promise<void> {
    this.isLoading = true;
    await this.loadData();
    this.isLoading = false;
  }
}