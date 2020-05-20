import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreadorContenidoPage } from './creador-contenido.page';

describe('CreadorContenidoPage', () => {
  let component: CreadorContenidoPage;
  let fixture: ComponentFixture<CreadorContenidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreadorContenidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreadorContenidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
