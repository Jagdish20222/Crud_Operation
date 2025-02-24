import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudencrudComponent } from './studencrud.component';

describe('StudencrudComponent', () => {
  let component: StudencrudComponent;
  let fixture: ComponentFixture<StudencrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudencrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudencrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
