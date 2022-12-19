import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TreeViewComponent} from './tree-view.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {PostData} from "../models/post.model";
import {GroupingEnum} from "../enums/grouping.enum";
import {TreeNodeModel} from "../models/tree-node.model";
import {CdkTreeModule} from "@angular/cdk/tree";
import {HarnessLoader} from "@angular/cdk/testing";
import {MatTreeHarness} from "@angular/material/tree/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";

describe('TreeViewComponent', () => {
  let component: TreeViewComponent;
  let fixture: ComponentFixture<TreeViewComponent>;
  let loader: HarnessLoader;

  const mockNodes: TreeNodeModel[] = [{
    name: "Week 12 2019",
    children: [{
      post: {
        id: 5,
        location: "Dublin",
        time: "1553080742",
        author: "Happy Manager",
        text: "A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need."
      }
    }, {
      name: "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time.",
      post: {
        id: 6,
        location: "Dublin",
        time: "1553099742",
        author: "Happy Manager",
        text: "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time."
      }
    }]
  }, {
    name: "Week 11 2019",
    children: [{
      post: {
        id: 1,
        location: "San Francisco",
        time: "1552657573",
        author: "Happy User",
        text: "Proper PDF conversion ensures that every element of your document remains just as you left it."
      }
    }, {
      name: "The modern workplace is increasingly digital, and workflows are constantly evolving. ",
      post: {
        id: 2,
        location: "San Francisco",
        time: "1552571173",
        author: "Happy User",
        text: "The modern workplace is increasingly digital, and workflows are constantly evolving. "
      }
    }, {
      name: "Digital transformation isn’t just a buzzword",
      post: {
        id: 3,
        location: "San Francisco",
        time: "1552571174",
        author: "Happy Developer",
        text: "Digital transformation isn’t just a buzzword"
      }
    }, {
      name: "An expectation of digital efficiency has become the norm in our daily lives",
      post: {
        id: 4,
        location: "Sydney",
        time: "1552563973",
        author: "Happy Developer",
        text: "An expectation of digital efficiency has become the norm in our daily lives"
      }
    }]
  }]

  const posts: PostData[] = [{
    id: 1,
    location: "San Francisco",
    time: "1552657573",
    author: "Happy User",
    text: "Proper PDF conversion ensures that every element of your document remains just as you left it."
  }, {
    id: 2,
    location: "San Francisco",
    time: "1552571173",
    author: "Happy User",
    text: "The modern workplace is increasingly digital, and workflows are constantly evolving. "
  }, {
    id: 3,
    location: "San Francisco",
    time: "1552571174",
    author: "Happy Developer",
    text: "Digital transformation isn’t just a buzzword"
  }, {
    id: 4,
    location: "Sydney",
    time: "1552563973",
    author: "Happy Developer",
    text: "An expectation of digital efficiency has become the norm in our daily lives"
  }, {
    id: 5,
    location: "Dublin",
    time: "1553080742",
    author: "Happy Manager",
    text: "A modern PDF annotator that can accommodate all of the cooks in a very busy kitchen is what your employees really need."
  }, {
    id: 6,
    location: "Dublin",
    time: "1553099742",
    author: "Happy Manager",
    text: "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time."
  }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatTreeModule, MatIconModule, CdkTreeModule],
      declarations: [TreeViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TreeViewComponent);
    component = fixture.componentInstance;
    component.dataSource.data = mockNodes;
    component.posts = posts;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  describe('tree tests', () => {
    it('should call constructTree() for date grouping', () => {
      component.grouping = GroupingEnum.DATE;
      const constructTreeSpy = spyOn(component, 'constructTree')
      component.createTree();
      expect(constructTreeSpy).toHaveBeenCalled();
    });

    it('should call constructTree() for author grouping', () => {
      component.grouping = GroupingEnum.AUTHOR;
      const constructTreeSpy = spyOn(component, 'constructTree')
      component.createTree();
      expect(constructTreeSpy).toHaveBeenCalled();
    });

    it('should call constructTree() for location grouping', () => {
      component.grouping = GroupingEnum.LOCATION;
      const constructTreeSpy = spyOn(component, 'constructTree')
      component.createTree();
      expect(constructTreeSpy).toHaveBeenCalled();
    });

    it('should get number of main upper nodes and total for Date grouping', async () => {
      component.grouping = GroupingEnum.DATE;
      const tree = await loader.getHarness(MatTreeHarness);
      expect(component.treeNodes.length).toBe(2)
      expect((await tree.getNodes()).length).toBe(8);
    });

    it('should get number of main upper nodes and total for Author grouping', async () => {
      component.grouping = GroupingEnum.AUTHOR;
      const tree = await loader.getHarness(MatTreeHarness);
      expect(component.treeNodes.length).toBe(3)
      expect((await tree.getNodes()).length).toBe(9);
    });

    it('should get number of main upper nodes and total for Location grouping', async () => {
      component.grouping = GroupingEnum.LOCATION;
      const tree = await loader.getHarness(MatTreeHarness);
      expect(component.treeNodes.length).toBe(3)
      expect((await tree.getNodes()).length).toBe(9);
    });

    it('should correctly get correct node with text', async () => {
      component.grouping = GroupingEnum.DATE;
      const tree = await loader.getHarness(MatTreeHarness);
      const nodes = await tree.getNodes();
      expect(await nodes[0].getText()).toBe('Week 12 2019');
      expect(await nodes[0].getLevel()).toBe(1);
      expect(await nodes[0].isDisabled()).toBe(false);
      expect(await nodes[0].isExpanded()).toBe(false);
      expect(await nodes[1].getText()).toBe('');
      expect(await nodes[1].getLevel()).toBe(2);
    });
  });

  describe('getWeekOfDate()', () => {
    it('should get the week in a year that contains the given date ', () => {
      expect(component.getWeekOfDate(new Date(0))).toEqual(1);
      expect(component.getWeekOfDate(new Date(1234567890000))).toEqual(7);
      expect(component.getWeekOfDate(new Date(1671461662000))).toEqual(52);
    });
  });
});

