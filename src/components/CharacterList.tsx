
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

  public searchCharacters!: string;

  private renderCharacters() {
    return this.charactersList.map((character) =>  (
      <div>
        <div class="font-weight-bold showcase">
          <button
            onClick={() => {
              this.$router.push({name: RouteName.ViewCharacter, params: { characterId: character.id}});
            }}
            class="showDetails"
          >See more</button>
          {character.name}
        </div>
      </div>
    ))
  }

  public async loadData(name?: string): Promise<void> {
    const {total, entity} = await Character.fetchAll(this.currentPage, name);
    this.totalPages = Math.ceil(total/10);
    this.charactersId = entity.map((character: Character) => (character.id));
    this.charactersList = Character.query().whereIdIn(this.charactersId).orderBy('name').all();
  }

  public renderPage(): VNode{
    return (
      <div>
        <h1>Characters</h1>
        <input v-model={this.searchCharacters} placeholder="Enter a character's name"/>
        <button type="submit"
          onclick={()=>
            this.loadData(this.searchCharacters)}
        >Search</button>
        {this.renderCharacters()}
        <paginate
          pageCount={this.totalPages}
          clickHandler={(value: number) => { this.currentPage = value}}
          prevText='Prev'
          nextText='Next'
          containerClass="paging"
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