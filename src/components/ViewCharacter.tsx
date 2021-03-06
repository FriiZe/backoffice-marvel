import Character from '@/models/characters';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import AppLoadingMixin from '@/mixins/AppLoadingErrorMixin';
import RouteName from '@/router/route-name';
import { ModelRelation } from '@/models/models-types';

@Component
export default class ViewCharacter extends AppLoadingMixin {

  @Prop()
  readonly characterId!: string;

  get character(): Character | null{
    if (!this.characterId) {return null;}
    return Character.query().whereId(+this.characterId).first()
  }

  public comicId(url: string): any {
    const id = url.split('http://gateway.marvel.com/v1/public/comics/')
    return id[1]
  }

  // get characterId(): string | null{
  //   return this.$route.params.characterId ?? null;
  // }

  public async mounted() {
    this.isLoading = true;
      if (this.characterId) {
        try {
          await Character.fetchById(this.characterId);
        }
        finally{
          this.isLoading = false;
        }
      }
    this.isLoading = false
  }

  public renderPage(): VNode {
    if (!this.character) {
      return (
      <div>
        <h1>404 character not found :/</h1> 
      </div>
    )}
    return (
      <div>
        <h1>{this.character?.name}</h1>
        <h2>{this.character?.description}</h2>
        <img 
          src={this.character?.thumbnail.path+'.'+this.character?.thumbnail.extension}
          alt={`image ${this.character.name}`}
        />
        <h2>Appears in following comics ({this.character.comics.returned}):</h2>
        <ul class="font-weight-bold showcase">
          {this.character.comics.items.map((comic: ModelRelation) => (
            <li>
              {comic.name} 
              <button
                class="showDetails"
                onClick={() => {
                   this.$router.push({ 
                     name: RouteName.ViewComic,
                    params: { comicId: this.comicId(comic.resourceURI) } 
                  })
                }}>
                See comic 
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}