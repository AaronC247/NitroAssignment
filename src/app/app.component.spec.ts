import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {GroupingEnum} from "./enums/grouping.enum";
import {PostData} from "./models/post.model";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const post: PostData = {
    id: 1,
    location: 'San Francisco',
    time: '1552657573',
    author: 'Happy User',
    text: 'Proper PDF conversion ensures that every element of your document remains just as you left it.'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonToggleModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.posts = [post];
    fixture.detectChanges();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('updateSelection()', () => {
    it('should update tree data selection', () => {
      component.updateSelection(GroupingEnum.AUTHOR);
      expect(component.grouping).toEqual('Author')
    });
  });

});
