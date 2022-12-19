import {Component, Input} from '@angular/core';
import {PostData} from "../models/post.model";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

/*
Component to display a post and relevant post information
 */

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent {

  // Post data input from app component
  @Input() post!: PostData;
  // Status of expanded section of the Post Display
  public expanded: boolean = false;
  public updateEnabled: boolean = false;
  // form for updating post
  public postForm!: UntypedFormGroup;

  ngOnInit(): void {
    // initialise form
    this.postForm = new UntypedFormGroup({
        author: new UntypedFormControl(this.post.author!, [Validators.required]),
        location: new UntypedFormControl(this.post.location!, [Validators.required]),
        time: new UntypedFormControl({value: this.unixTimeToDateAndTime(this.post.time!), disabled: true})
      }
    )
    this.trackFormChanges();
  }

  // monitor form for changes
  trackFormChanges(): void {
    this.postForm.valueChanges.subscribe(res => {
      // update enabled if there are changes and the fields are not blank
      this.updateEnabled = ((res.author !== this.post.author || res.location !== this.post.location) && (res.author !== '' && res.location !== ''));
    });
  }

  // convert unix time and date to a readable local format
  unixTimeToDateAndTime(unixTime: string): string {
    const date = new Date(Number(unixTime) * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  // updates values for the post from the form values
  updatePost(): void {
    this.post.author = this.author.value;
    this.post.location = this.location.value;
    this.updateEnabled = false;
  }

  get author(): UntypedFormControl {
    return this.postForm.get('author') as UntypedFormControl;
  }

  get location(): UntypedFormControl {
    return this.postForm.get('location') as UntypedFormControl;
  }

  get time(): UntypedFormControl {
    return this.postForm.get('time') as UntypedFormControl;
  }

}
