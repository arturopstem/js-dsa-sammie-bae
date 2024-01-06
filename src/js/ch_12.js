// STACKS
function Stack(array) {
  this.array = [];
  if (array) this.array = array;
}

Stack.prototype.getBuffer = function getBuffer() {
  return this.array.slice();
};

Stack.prototype.isEmpty = function isEmpty() {
  return this.array.length === 0;
};

Stack.prototype.push = function push(value) {
  this.array.push(value);
};

Stack.prototype.pop = function pop() {
  return this.array.pop();
};

Stack.prototype.peek = function peek() {
  return this.array[this.array.length - 1];
};

function stackAccessNthTopNode(stack, _n) {
  let n = _n;
  const bufferArray = stack.getBuffer();

  if (n <= 0) throw new Error('error');

  const bufferStack = new Stack(bufferArray);

  n -= 1;
  while (n !== 0) {
    bufferStack.pop();
    n -= 1;
  }

  return bufferStack.pop();
}

// QUEUES
function Queue(array) {
  this.array = [];
  if (array) this.array = array;
}

Queue.prototype.getBuffer = function getBuffer() {
  return this.array.slice();
};

Queue.prototype.isEmpty = function isEmpty() {
  return this.array.length === 0;
};

Queue.prototype.peek = function peek() {
  return this.array[0];
};

Queue.prototype.enqueue = function enqueue(value) {
  return this.array.push(value);
};

Queue.prototype.dequeue = function dequeue() {
  return this.array.shift();
};

function queueAccessNthTopNode(queue, _n) {
  let n = _n;
  const bufferArray = queue.getBuffer();

  if (n <= 0) throw new Error('error');

  const bufferQueue = new Queue(bufferArray);

  n -= 1;
  while (n !== 0) {
    bufferQueue.dequeue();
    n -= 1;
  }

  return bufferQueue.dequeue();
}

function queueSearch(queue, element) {
  const bufferArray = queue.getBuffer();

  const bufferQueue = new Queue(bufferArray);

  while (!bufferQueue.isEmpty()) {
    if (bufferQueue.dequeue() === element) {
      return true;
    }
  }
  return false;
}

/* -------------------------------------------------------------------------- */
/*                                  EXERCISES                                 */
/* -------------------------------------------------------------------------- */
// DESIGN A CASHIER CLASS THAT TAKES IN A CUSTOMER OBJECT AND HANDLES FOOD
// ORDERING ON A FIRST-COME, FIRST_SERVED BASIS
function Customer(name, order) {
  this.name = name;
  this.order = order;
}

function Cashier() {
  this.customers = new Queue();
}

Cashier.prototype.addOrder = function addOrder(customer) {
  this.customers.enqueue(customer);
};

Cashier.prototype.deliverOrder = function deliverOrder() {
  const finishedCustomer = this.customers.dequeue();
  const { name, order } = finishedCustomer;
  console.log(`${name}, your ${order} is ready!`);
};

const cashier = new Cashier();
const customer1 = new Customer('Jim', 'Fries');
const customer2 = new Customer('Sammie', 'Burger');
const customer3 = new Customer('Peter', 'Drink');

cashier.addOrder(customer1);
cashier.addOrder(customer2);
cashier.addOrder(customer3);

cashier.deliverOrder();
cashier.deliverOrder();
cashier.deliverOrder();

// DESIGN A PARENTHESIS VALIDATION CHECKER USING A STACK
function isParenthesisValid(validationString) {
  const stack = new Stack();
  const { length } = validationString;

  for (let pos = 0; pos < length; pos += 1) {
    const currentChar = validationString.charAt(pos);

    if (currentChar === '(') {
      stack.push(currentChar);
    } else if (currentChar === ')') {
      if (stack.isEmpty()) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.isEmpty();
}
