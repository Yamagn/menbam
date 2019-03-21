import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {client_id, client_secret} from "../../key";
import {Storage} from "@ionic/storage";

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
    window.open(
      "https://foursquare.com/oauth2/authenticate" +
      "?client_id=" + client_id +
      "&response_type=code" +
      "&redirect_uri=" + location.toString(),
      "_blank",
      "location=no"
    );
  }

  getToken(code: string){
    let params = new HttpParams()
      .append("client_id", client_id)
      .append("client_secret", client_secret)
      .append("grant_type", "authorization_code")
      .append("redirect_uri", location.toString())
      .append("code", code)

    let res = this.http.get("https://foursquare.com/oauth2/access_token", { params: params });
    res.subscribe((token: Token) => {
      if(token.access_token) {
        if(!this.storage.get("token")) {
          this.storage.set("token", token.access_token)
        }
      }
    })

  }
}
