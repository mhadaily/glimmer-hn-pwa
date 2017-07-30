import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';
import fetchItems from '../../../utils/fetch';
import { API } from '../../../utils/constant/api';
import { News } from '../../../utils/model/news';
import { Comments, Comment } from '../../../utils/model/comment';
import { User } from '../../../utils/model/user';

const router = new Navigo(null, true);

// There a lot to improve, I will refactor some of these codes soon. Or feel free to open a PR.
export default class GlimmerHnPwa extends Component {
  appShell = document.getElementById('app-shell');
  loadingScript = document.getElementById('loadingScript');
  app = document.getElementById('app');
  @tracked results: News[];
  @tracked page: number;
  @tracked comments: Comment[];
  @tracked post: Comments;
  @tracked userInfo: User;
  @tracked routeMode: string;
  @tracked loading: boolean = true;
  public repeat = Array.from(Array(30).keys());

  didInsertElement() {
    router
      .on({
        '/': () => router.navigate('/news/1'),
        '/news/:page': (params) => this.getDataAndLoad('news', params),
        '/newest/:page': (params) => this.getDataAndLoad('newest', params),
        '/show/:page': (params) => this.getDataAndLoad('show', params),
        '/ask/:page': (params) => this.getDataAndLoad('ask', params),
        '/jobs/:page': (params) => this.getDataAndLoad('jobs', params),
        '/user/:id': (params) => this.getDataAndLoad('user', params),
        '/item/:id': (params) => this.getDataAndLoad('item', params),
      })
      .resolve();

    router.notFound(() => router.navigate('/'));
    this.removeAppShell();
  }

  didUpdate() {
    this.page = this.getPageNumber();
    router.hooks({
      after: () => {
        this.app.scrollIntoView(false);
      },
    });
  }

  private getEndpoint({ model, id, page }) {
    return id ? `${API}/${model}/${id}` : `${API}/${model}?page=${page}`;
  }

  private getDataAndLoad(model, { id, page }) {
    this.routeMode = model;
    return this.loadModel(this.getEndpoint({ model, id, page }));
  }

  private loadModel(endpoint: string) {
    this.loading = true;
    fetchItems(endpoint)
      .then((res) => {
        this.loading = false;
        switch (this.routeMode) {
          case 'user':
            this.userInfo = { ...res };
            break;
          case 'item':
            this.comments = [...res.comments];
            this.post = { ...res };
            break;
          default:
            this.results = res;
        }
      });
  }

  removeAppShell() {
    if (this.appShell) {
      this.appShell.remove();
      this.loadingScript.remove();
    }
  }

  previousPage() {
    this.updateModel(this.getPageNumber() - 1);
  }

  nextPage() {
    this.updateModel(this.getPageNumber() + 1);
  }

  // It's just working with this app, need to generalize it later, don't have time now!
  getPageNumber(): number {
    const page = Number(document.location.hash.split('/').slice(-1)[0]);
    if (isNaN(page)) router.navigate('news/1');
    return page;
  }

  // It's just working with this app, need to generalize it later, don't have time now!
  getHash(): string {
    return document.location.hash.split('/').slice(0, -1).join('/');
  }

  updateModel(page: number): string {
    this.page = page;
    if (page < 1) return;
    return document.location.hash = this.getHash() + '/' + page;
  }

  didDestroy() {
    console.log('didDestory!');
  }
}
