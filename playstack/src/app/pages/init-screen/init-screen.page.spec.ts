import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InitScreenPage } from './init-screen.page';

describe('InitScreenPage', () => {
  let component: InitScreenPage;
  let fixture: ComponentFixture<InitScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
