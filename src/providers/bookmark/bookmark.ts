import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

/*
  Generated class for the BookmarkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookmarkProvider {

  constructor(public http: HttpClient,
              public storage: Storage) {
    console.log('Hello BookmarkProvider Provider');
  }

  get() {
    return this.storage.get("bookmark.ramens").then(ramens => {
      return ramens ? ramens : {};
    });
  }

  put(ramen: any) {
    return this.get().then(ramens => {
      ramens.push(ramen);
      return this.storage.set("bookmark.ramens", ramens);
    })
  }

  delete(index: number) {
    return this.get().then(ramens => {
      delete ramens[index];
      return this.storage.set("bookmark.ramens", ramens);
    })
  }

}
