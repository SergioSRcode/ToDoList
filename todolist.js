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

  _validateIndex(idx) {
    if (!(idx in this.todos)) {
      throw ReferenceError(`invalid index: ${idx}`);
    }
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
    return this.findByTitle(title).markDone();
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }
}


let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

// let doneTodos = list.filter(todo => todo.isDone());
// console.log(doneTodos);

// console.log(list.filter(todo => todo.isDone()).first());
// console.log(list.findByTitle("Clean room"));
// console.log(list.findByTitle("Clean Room"));
console.log(list.allDone());
// console.log(list.allNotDone());
// console.log(list.markDone("Clean room"));
console.log(list.markAllDone());
console.log(list.allDone());