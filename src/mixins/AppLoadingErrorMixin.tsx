import { VNode } from 'vue';
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class AppLoadingErrorMixin extends Vue {

  public isLoading = true;

  public isError = false;

  public renderLoading(): VNode {
    return (
      <div class="text-center" p-5>
        <h1>Loading ...</h1>
      </div>
    );
  }

  public renderError(): VNode {
    return (
      <div class="text-center" p-5>
        <h1>An error has occurred</h1>
        <button onClick={() => this.$router.go(-1)}>Previous</button>
      </div>
    );
  }

  public renderPage(): VNode {
    return <div></div>;
  }

  public render(): VNode {
    let rendering;
    if (this.isLoading){
      rendering = this.renderLoading
    } else {
      rendering = this.isError ? this.renderError : this.renderPage
    }
    return rendering();
  }
  
}