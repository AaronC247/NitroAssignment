import {Component, Input} from '@angular/core';
import {PostData} from "../models/post.model";
import {NestedTreeControl} from "@angular/cdk/tree";
import {GroupingEnum} from "../enums/grouping.enum";
import {TreeNodeModel} from "../models/tree-node.model";
import {MatTreeNestedDataSource} from "@angular/material/tree";

const MILLISECONDS_IN_DAY: number = 86400000;
const DAYS_IN_WEEK: number = 7;

/*
  Tree view component to allow posts to be displayed in a number of different groupings
 */

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {

  // array of posts to be displayed
  private _posts: PostData[] = [];
  private _grouping!: GroupingEnum;
  // nodes used to format post data to tree data
  public treeNodes: TreeNodeModel[] = [];
  // material tree class, NestedTreeControl extends BaseTreeControl,
  // has basic toggle/expand/collapse operations on a single data node
  public treeControl = new NestedTreeControl<TreeNodeModel>(node => node.children);
  // data source for the tree
  public dataSource = new MatTreeNestedDataSource<TreeNodeModel>();

  // variable to determine if a node has at least one child
  hasChild = (_: number, node: TreeNodeModel) => !!node.children && node.children.length > 0;

  // creates a tree view from the defined set of posts
  createTree(): void {
    this.treeNodes = [];
    for (const post of this._posts) {
      this.constructTree(post, this._grouping);
    }
    this.treeNodes.reverse();
    //updates the tree with the new data
    this.dataSource.data = this.treeNodes;
  }

  // handles the construction of the tree for the different grouping types
  constructTree(post: PostData, grouping: GroupingEnum) {
    let treeNodeName = '';
    switch (grouping) {
      case GroupingEnum.DATE:
        const date = new Date(Number(post.time) * 1000);
        treeNodeName = 'Week ' + this.getWeekOfDate(date) + ' ' + date.getFullYear();
        break;
      case GroupingEnum.AUTHOR:
        treeNodeName = post.author;
        break;
      case GroupingEnum.LOCATION:
        treeNodeName = post.location;
        break;
    }

    let treeNode: TreeNodeModel = {
      name: treeNodeName,
      children: [{post: post}]
    }

    this.addNodeToTree(treeNode, post);
  }

  // adds nodes to tree, if the given name is not found it will add a parent node
  // otherwise it will place it only in the child of the given name.
  addNodeToTree(treeNode: TreeNodeModel, post: PostData): void {
    const foundIndex = this.treeNodes.map(e => e.name).indexOf(treeNode.name)
    if (foundIndex === -1) {
      this.treeNodes.push(treeNode);
    } else {
      this.treeNodes[foundIndex].children?.push({post: post});
    }
  }

  // gets the week that a given dates falls on, for example January 1st would be in week 1.
  getWeekOfDate(date: Date): number {
    const firstOfJan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date.getTime() - firstOfJan.getTime()) / MILLISECONDS_IN_DAY)
      + firstOfJan.getDay() + 1) / DAYS_IN_WEEK);
  }

  @Input()
  set grouping(value: GroupingEnum) {
    this._grouping = value;
    this.createTree();
  }

  @Input()
  set posts(value: PostData[]) {
    this._posts = value;
    this.createTree();
  }

}
