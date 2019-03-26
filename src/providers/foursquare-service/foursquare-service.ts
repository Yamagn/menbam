import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {client_id, client_secret, token} from "../../key";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs";

/*
  Generated class for the FoursquareServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Token {
  access_token: string
}

@Injectable()
export class FoursquareServiceProvider {

  constructor(public http: HttpClient,
              public storage: Storage) {
    console.log('Hello FoursquareServiceProvider Provider');
  }

  auth() {
    location.replace(
      "https://foursquare.com/oauth2/authenticate" +
      "?client_id=" + client_id +
      "&response_type=code" +
      "&redirect_uri=" + "http://localhost:8100"
    );
  }

  getToken(code: string){
    let url = "https://foursquare.com/oauth2/access_token?" +
      "client_id=" + client_id + "&" +
      "client_secret=" + client_secret + "&" +
      "grant_type=authorization_code&" +
      "redirect_uri=http://localhost:8100&" +
      "code=" + code;

    let res = this.http.get(url);
    res.subscribe((body: any) => {
      if(body && body.access_token) {
        console.log("access_token: " + body.access_token);
        this.storage.set("token", body.access_token);
      } else {
        console.log(body);
      }
    })
  }

  getCheckins(): Observable<Object> {
    var access_token = "";
    this.storage.get("token").then( t => {
      access_token = t;
    });
    if(access_token === "") {
      this.storage.set("token", token);
      access_token = token;
    }
    return this.http.get("https://api.foursquare.com/v2/users/self/checkins?oauth_token=" + access_token + "&v=20190324&limit=100");
  }
}
