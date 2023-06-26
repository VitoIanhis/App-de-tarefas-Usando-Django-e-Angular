import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTodoComponent } from './criar-todo.component';

describe('CriarTodoComponent', () => {
  let component: CriarTodoComponent;
  let fixture: ComponentFixture<CriarTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarTodoComponent]
    });
    fixture = TestBed.createComponent(CriarTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
