import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PostData} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})

/*
  Service to get Post data
 */

export class PostService {

  private url = 'http://localhost';
  private port = '3000';

  constructor(private http: HttpClient) {
  }

  // get post data from server
  getPosts(): Observable<PostData[]> {
    return this.http.get<PostData[]>(this.constructUrl('posts'));
  }

  // constructs URL for REST request
  private constructUrl(path: string): string {
    return this.url + ':' + this.port + '/' + path;
  }
}
