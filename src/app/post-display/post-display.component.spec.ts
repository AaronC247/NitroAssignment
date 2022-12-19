import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PostDisplayComponent} from './post-display.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PostData} from "../models/post.model";
import {FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

describe('PostDisplayComponent', () => {
  let component: PostDisplayComponent;
  let fixture: ComponentFixture<PostDisplayComponent>;

  beforeEach(async () => {

    const post: PostData = {
      id: 1,
      location: 'San Francisco',
      time: '1552657573',
      author: 'Happy User',
      text: 'Proper PDF conversion ensures that every element of your document remains just as you left it.'
    }

    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatExpansionModule, MatFormFieldModule, BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule, MatTooltipModule, MatSelectModule, MatInputModule],
      declarations: [PostDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostDisplayComponent);
    component = fixture.componentInstance;
    component.post = post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('trackFormChanges()', () => {

    beforeEach(() => {
      component.postForm = new UntypedFormGroup({
        author: new UntypedFormControl('testAuthor', [Validators.required]),
        location: new UntypedFormControl('testLocation', [Validators.required]),
        time: new UntypedFormControl({value: component.unixTimeToDateAndTime('12345678'), disabled: true})
      });
    })

    it('should have no changes and return false', () => {
      fixture.whenStable().then(() => {
        expect(component.updateEnabled).toBe(false);
      });
    });

    it('should have changes and return true', () => {
      const el = fixture.nativeElement.querySelectorAll('.active-input')[0];
      el.value = 'something';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.updateEnabled).toBe(true);
      });
    });

    it('should have changes and return true for second input', () => {
      const el = fixture.nativeElement.querySelectorAll('.active-input')[1];
      el.value = 'something';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.updateEnabled).toBe(true);
      });
    });

    it('should have changes with empty string and return false', () => {
      const el = fixture.nativeElement.querySelectorAll('.active-input')[0];
      el.value = '';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.updateEnabled).toBe(false);
      });
    });

  });

  describe('unixTimeToDateAndTime()', () => {
    it('should convert unix time to string', () => {
      expect(component.unixTimeToDateAndTime('0')).toEqual(new Date(0).toLocaleDateString() + ' ' + new Date(0).toLocaleTimeString())
    });
  });

  describe('updatePost()', () => {
    it('should update post', () => {
      const testAuthor = 'Tester';
      const testLocation = 'Area 51';
      const testTime = '12345678'
      component.postForm = new UntypedFormGroup({
        author: new UntypedFormControl(testAuthor, [Validators.required]),
        location: new UntypedFormControl(testLocation, [Validators.required]),
        time: new UntypedFormControl({value: component.unixTimeToDateAndTime(testTime), disabled: true})
      });
      component.updatePost();
      expect(component.post.author).toEqual(testAuthor);
      expect(component.post.location).toEqual(testLocation);
      expect(component.post.time).not.toEqual(testTime);
    });
  });

});
