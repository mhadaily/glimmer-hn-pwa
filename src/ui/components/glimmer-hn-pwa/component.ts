import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';
import fetchItems from '../../../utils/fetch';
import { API } from '../../../utils/constant/api';
import { News } from '../../../utils/model/news';
import { Comments, Comment } from '../../../utils/model/comment';
import { User } from '../../../utils/model/user';

const router = new Navigo(null, true);

// There a lot to improve, I will refactor some of these codes soon. Or feel free to open a PR.
// TODO: need to fix [Violation] 'requestAnimationFrame' handler took xxx

export default class GlimmerHnPwa extends Component {
  appShell = document.getElementById('app-shell');
  app = document.getElementById('app');
  @tracked results: News[];
  @tracked page: number = 1;
  @tracked comments: Comment[];
  @tracked post: Comments;
  @tracked userInfo: User;
  @tracked routeMode: string;
  @tracked componentName: string;
  @tracked loading: boolean = true;
  public repeat = Array.from(Array(30).keys());

  didInsertElement() {
    if (this.appShell) {
      this.appShell.remove();
    }
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
  }

  didUpdate() {
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
    this.page = Number(page);
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
            this.componentName = 'user-info';
            break;
          case 'item':
            this.comments = [...res.comments];
            this.post = { ...res };
            this.componentName = 'comments-list';
            break;
          default:
            this.results = res;
            this.componentName = 'items-list';
        }
      });
  }

  changePage(minusPlus) {
    this.updateModel(this.page + Number(minusPlus));
  }

  updateModel(page: number): string {
    this.page = page;
    return document.location.hash = `#/${this.routeMode}/${page}`;
  }
}
