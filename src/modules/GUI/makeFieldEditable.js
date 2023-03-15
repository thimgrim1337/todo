import { app } from '../../index';
import { renameProject } from './projectList';
import { changeDate, changeDescription, renameTodo } from './todoList';

export default function makeFieldEditable(e) {
  const currentElement = e.target;
  const currentValue = e.target.textContent;
  const input = getInput(currentElement);

  e.target.parentElement.replaceChild(input, currentElement);
  input.value = currentValue;

  input.addEventListener('keydown', editField);
  input.addEventListener('focusout', editField);

  function editField(e) {
    if (e.type == 'keydown' && e.key == 'Enter') {
      const newValue = e.target.value;
      currentElement.textContent = newValue;
      e.target.parentElement.replaceChild(currentElement, input);

      changeValue(currentElement, newValue);

      input.removeEventListener('keydown', editField);
      input.removeEventListener('focusout', editField);
    }
  }
}

function getInput(element) {
  if (element.hasAttribute('data-description'))
    return document.createElement('textarea');
  if (element.hasAttribute('data-date')) {
    const datetime = document.createElement('input');
    datetime.type = 'date';
    datetime.pattern = '(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}';
    return datetime;
  }

  return document.createElement('input');
}

function changeValue(element, value) {
  const id = element.parentElement.hasAttribute('data-id')
    ? element.parentElement.getAttribute('data-id')
    : undefined;
  if (element.hasAttribute('data-name')) renameProject(element, value);
  if (element.hasAttribute('data-title')) renameTodo(id, value);
  if (element.hasAttribute('data-description')) changeDescription(id, value);
  if (element.hasAttribute('data-date')) changeDate(id, value);
}
