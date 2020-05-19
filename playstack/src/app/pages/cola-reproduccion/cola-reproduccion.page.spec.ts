import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColaReproduccionPage } from './cola-reproduccion.page';

describe('ColaReproduccionPage', () => {
  let component: ColaReproduccionPage;
  let fixture: ComponentFixture<ColaReproduccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaReproduccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColaReproduccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
