import {PostData} from "./post.model";

/*
  Model for the object used to construct the tree.
 */

export interface TreeNodeModel {
  name?: string;
  post?: PostData;
  children?: TreeNodeModel[];
}

