import Component, { tracked } from '@glimmer/component';

export default class GlimmerHnPwa extends Component {
  api = 'https://node-hnapi.herokuapp.com';
  endpoint = this.api+'/newest?page=1';

  @tracked
  results: any[];

  constructor(options) {
    super(options);
    this.loadNews();
  }

  async loadNews() {
    const request = await fetch(this.endpoint);
    const json = await request.json();
    this.results = json;
  }
}
