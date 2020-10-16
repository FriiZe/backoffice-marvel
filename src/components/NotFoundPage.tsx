
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';

@Component
export default class NotFoundPage extends Vue {
  private render(): VNode {
      return (
      <div>
        <h1>404 page not found :/</h1> 
      </div>
    )
  }
}