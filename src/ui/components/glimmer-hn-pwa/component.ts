import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';
import fetchItems from '../../../utils/fetch';
const API = 'https://node-hnapi.herokuapp.com';

const router = new Navigo(null, true);

export default class GlimmerHnPwa extends Component {

  @tracked results: any[];
  @tracked routeMode: string = 'top';

  constructor(options) {
    super(options);
    router
      .on({
        '/': () => this.topNews(),
        '/new': () => this.new(),
        '/show': () => this.show(),
        '/ask': () => this.ask(),
        '/jobs': () => this.jobs(),
        '/user/:username': (username) => this.user(username),
        '/item/:id': (id) => this.comment(id),
      })
      .resolve();
  }

  getEndpoint(model, page?) {
    return page ? `${API}/${model}?page=${page}` : `${API}/${model}`;
  }

  topNews() {
    this.routeMode = 'top';
    this.loadModel(this.getEndpoint('news', 1));
  }

  new() {
    this.routeMode = 'new';
    this.loadModel(this.getEndpoint('newest', 1));
  }

  show() {
    this.routeMode = 'show';
    this.loadModel(this.getEndpoint('show', 1));
  }

  ask() {
    this.routeMode = 'ask';
    this.loadModel(this.getEndpoint('ask', 1));
  }

  jobs() {
    this.routeMode = 'jobs';
    this.loadModel(this.getEndpoint('jobs', 1));
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
}
