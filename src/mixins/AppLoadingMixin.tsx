import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class AppLoadingMixin extends Vue {

  public isLoading = true;

  public renderLoading(): VNode {
    return (
      <div class="text-center" p-5>
        <h1>Chargement en cours ...</h1>
      </div>
    );
  }

  public renderPage(): VNode {
    return <div></div>;
  }

  public render(): VNode {
    const rendering = this.isLoading ? this.renderLoading : this.renderPage;
    return rendering();
  }
  
}