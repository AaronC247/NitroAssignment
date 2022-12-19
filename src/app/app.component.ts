import {Component, OnInit, ViewChild} from '@angular/core';
import {GroupingEnum} from "./enums/grouping.enum";
import {TreeViewComponent} from "./tree-view/tree-view.component";
import {PostService} from "./services/posts.service";
import {PostData} from "./models/post.model";

/*
  Component calls the service to retrieve the data and calls the tree to be created
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  groupingEnum = GroupingEnum;
  grouping: GroupingEnum = GroupingEnum.DATE;
  posts: PostData[] = [];
  @ViewChild(TreeViewComponent) tree!: TreeViewComponent;

  constructor(private postService: PostService) {
  }

  ngOnInit(){
    //get post data from server
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  // updates the tree for a given grouping type
  updateSelection(grouping: GroupingEnum): void {
    this.grouping = grouping;
  }

}
