import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';
import fetchItems from '../../../utils/fetch';
const API = 'https://node-hnapi.herokuapp.com';

const router = new Navigo(null, true);

export default class GlimmerHnPwa extends Component {

  @tracked page: number = 0;
  @tracked results: any[] = [];
  @tracked routeMode: string = 'top';

  constructor(options) {
    super(options);
    router
      .on({
        '/': () => this.getDataAndLoad('news', this.page),
        '/newest': () => this.getDataAndLoad('newest', this.page),
        '/show': () => this.getDataAndLoad('show', this.page),
        '/ask': () => this.getDataAndLoad('ask', this.page),
        '/jobs': () => this.getDataAndLoad('jobs', this.page),
        '/user/:username': (username) => this.user(username),
        '/item/:id': (id) => this.comment(id),
      })
      .resolve();
  }

  getEndpoint(model, page?) {
    return page ? `${API}/${model}?page=${page}` : `${API}/${model}`;
  }

  getDataAndLoad(model, page, param?) {
    this.routeMode = model;
    return this.loadModel(this.getEndpoint(model, page));
  }

  user({ username }) {
    this.routeMode = 'user';
    this.loadModel(this.getEndpoint(`user/${username}`));
  }

  comment({ id }) {
    this.routeMode = 'comment';
    this.loadModel(this.getEndpoint(`item/${id}`));
  }

  loadModel(endpoint) {
    this.results = [];
    fetchItems(endpoint).then((res) => {
      this.results = [ ...res ];
    });
  }

  cleanUp() {
    this.page = 0;
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
    }
  }

  nextPage() {
    this.page = this.page + 1;
  }
}
