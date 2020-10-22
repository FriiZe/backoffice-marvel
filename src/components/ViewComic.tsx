import Comic, { Price } from '@/models/comics';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import AppLoadingMixin from '@/mixins/AppLoadingErrorMixin';
import { ModelRelation } from '@/models/models-types';
import RouteName from '@/router/route-name';

@Component
export default class ViewComic extends AppLoadingMixin {

  get comic(): Comic | null{
    if (!this.comicId) {return null;}
    return Comic.query().whereId(+this.comicId).first()
  }

  public characterId(url: string): string {
    const id = url.split('http://gateway.marvel.com/v1/public/characters/')
    return id[1]
  }

  get comicId(): string | null{
    return this.$route.params.comicId ?? null;
  }

  public async mounted() {
    this.isLoading = true;
      if (this.comicId) {
        try {
          await Comic.fetchById(this.comicId);
        }
        finally{
          this.isLoading = false;
        }
      }
    this.isLoading = false
  }

  private renderPrices(): any {
    return this.comic?.prices.map((price: Price) => (
      <div>{price.type} : {price.price}</div>
    ))
  }

  public renderPage(): VNode {
    if (!this.comic) {
      return (
      <div>
        <h1>404 comic not found :/</h1> 
      </div>
    )}

    return (
      <div>
        <h1>{this.comic?.title}</h1>
        <h2>Price</h2>
        {this.renderPrices()}
        <h3>{this.comic?.description}</h3>
        <img 
          src={this.comic?.thumbnail.path+'.'+this.comic?.thumbnail.extension}
          alt={`image ${this.comic.title}`}
        />
        <h2>Characters ({this.comic.characters.returned}):</h2>
        <ul class="font-weight-bold showcase">
          {this.comic.characters.items.map((character: ModelRelation) => (
            <li>
              {character.name} 
              <button
                class="showDetails"
                onClick={() => {
                   this.$router.push({ 
                    name: RouteName.ViewCharacter,
                    params: { characterId: this.characterId(character.resourceURI) } 
                  })
                }}>
                See character
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}