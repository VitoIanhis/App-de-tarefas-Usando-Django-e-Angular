import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarEditarTodoComponent } from './modal-criar-editar-todo.component';

describe('ModalCriarEditarTodoComponent', () => {
  let component: ModalCriarEditarTodoComponent;
  let fixture: ComponentFixture<ModalCriarEditarTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCriarEditarTodoComponent]
    });
    fixture = TestBed.createComponent(ModalCriarEditarTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
