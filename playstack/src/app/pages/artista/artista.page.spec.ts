import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArtistaPage } from './artista.page';

describe('ArtistaPage', () => {
  let component: ArtistaPage;
  let fixture: ComponentFixture<ArtistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
