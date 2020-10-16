import Character from '@/models/characters';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import AppLoadingMixin from '@/mixins/AppLoadingMixin';

@Component
export default class ViewCharacter extends AppLoadingMixin {

  get character(): Character | null{
    if (!this.characterId) {return null;}
    return Character.query().whereId(+this.characterId).first()
  }

  get characterId(): string | null{
    return this.$route.params.characterId ?? null;
  }

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
      </div>
    )
  }
}