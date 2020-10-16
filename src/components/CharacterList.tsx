
import AppLoadingMixin from '@/mixins/AppLoadingMixin';
import Character from '@/models/characters';
import RouteName from '@/router/route-name';
import { VNode } from 'vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)

@Component
export default class CharacterList extends AppLoadingMixin {

  @Watch('currentPage', {immediate: true})
   async onPageChange(): Promise<void>{
    this.isLoading = true;
    await this.loadData();
    this.isLoading = false;
  }

  public totalPages: number | null = null;

  public currentPage = 1;

  public charactersList: Character[] = [];

  public charactersId: string[] = [];

  private renderCharacters() {
    return this.charactersList.map((character) =>  (
      <div>
      <div class="font-weight-bold">{character.name}</div>
      <button
        onClick={() => {
          this.$router.push({name: RouteName.ViewCharacter, params: { characterId: character.id}});
        }}
      >Voir plus</button>
      </div>
    ))
  }

  public async loadData(): Promise<void> {
    const {total, entity} = await Character.fetchAll(this.currentPage);
    this.totalPages = Math.ceil(total/10);
    this.charactersId = entity.map((character: Character) => (character.id));
    this.charactersList = Character.query().whereIdIn(this.charactersId).orderBy('name').all();
  }

  public renderPage(): VNode{
    return (
      <div>
        <h1>Characters</h1>
        {this.renderCharacters()} 
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