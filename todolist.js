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

  _validateIndex(idx) {
    if (!(idx in this.todos)) {
      throw ReferenceError(`invalid index: ${idx}`);
    }
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
}

let list = new TodoList("Today's Todos");
// console.log(list); // TodoList { title: "Today's Todos", todos: [] }

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

todo1.markDone();
todo4.markDone();
todo1.markUndone();

console.log(`${list}`);

// console.log(list.removeAt(2));
// console.log(list.removeAt(0));
// console.log(list.removeAt(1));
// console.log(list);

// console.log(list);
// console.log(list.size());
// console.log(list.first());
// console.log(list.last());
// console.log(list);
// console.log(list.itemAt(1));
// Omitted code

// console.log(list.itemAt("a")); // delete this line after testing it
// Omitted code

// console.log(list.itemAt(55)); // delete this line after testing it
// Omitted code

// console.log(list.isDone()); // false

// list.markDoneAt(0);
// list.markDoneAt(1);
// list.markDoneAt(2);
// list.markDoneAt(3);
// console.log(list.isDone()); // true

// list.markUndoneAt(2);
// console.log(list.isDone()); // false
