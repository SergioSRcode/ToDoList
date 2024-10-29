// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  toString() {
    console.log(`---- ${this.title} ----`);
    return this.todos.map(todo => todo.toString()).join("\n");
  }

  add(todo) {
    if (!(todo instanceof Todo)) throw TypeError(`Argument must be a Todo object`);
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    let todos = this.todos.slice();
    return todos.shift();
  }

  last() {
    let todos = this.todos.slice();
    return todos.pop();
  }

  itemAt(idx) {
    this._validateIndex(idx);
    return this.todos[idx];
  }

  markDoneAt(idx) {
    this.itemAt(idx).markDone();
  }

  markUndoneAt(idx) {
    this.itemAt(idx).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(idx) {
    let removedTodo = this.itemAt(idx);
    let updatedTodos = this.todos.filter((_, index) => index !== idx);
    this.todos = updatedTodos;

    return removedTodo;
  }

  forEach(callback, thisArg) {
    this.todos.forEach(callback, thisArg);
  }

  filter(callback, thisArg) {
    let filteredList = new TodoList(`filtered ${this.title}`);

    this.forEach(todo => {
      if (callback(todo)) filteredList.add(todo);
    }, thisArg);

    return filteredList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.title === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) todo.markDone();
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

  _validateIndex(idx) {  // _ in name indicates "private" method
    if (!(idx in this.todos)) {
      throw ReferenceError(`invalid index: ${idx}`);
    }
  }
}