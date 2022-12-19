/*
  Model for storing the post data received from the server
 */

export interface PostData {
  id: number;
  location: string;
  time: string;
  author: string;
  text: string;
}
