import {PostService} from "./posts.service";
import {PostData} from "../models/post.model";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const post: PostData = {
    id: 1,
    location: 'San Francisco',
    time: '1552657573',
    author: 'Happy User',
    text: 'Proper PDF conversion ensures that every element of your document remains just as you left it.'
  }
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new PostService(httpClientSpy);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  })


  it('should return expected posts', (done: DoneFn) => {
    const expectedPosts: PostData[] = [post];
    httpClientSpy.get.and.returnValue(of(expectedPosts));

    service.getPosts().subscribe({
      next: posts => {
        expect(posts)
          .withContext('expected posts')
          .toEqual([post]);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  describe('getPosts()', () => {
    it('should return posts from request', () => {
      expect(service['constructUrl']('path')).toEqual('http://localhost:3000/path');
    });
  });

  describe('constructUrl()', () => {
    it('should construct url for request', () => {
      expect(service['constructUrl']('path')).toEqual('http://localhost:3000/path');
    });
  });

});
