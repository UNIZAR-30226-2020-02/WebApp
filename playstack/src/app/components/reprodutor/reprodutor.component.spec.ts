import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReprodutorComponent } from './reprodutor.component';

describe('ReprodutorComponent', () => {
  let component: ReprodutorComponent;
  let fixture: ComponentFixture<ReprodutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprodutorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReprodutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
