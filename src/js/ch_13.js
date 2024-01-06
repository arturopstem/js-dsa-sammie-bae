// SINGLY LINKED LIST
function SinglyLinkedListNode(data) {
  this.data = data;
  this.next = null;
}

function SinglyLinkedList() {
  this.head = null;
  this.size = 0;
}

SinglyLinkedList.prototype.isEmpty = function isEmpty() {
  return this.size === 0;
};

SinglyLinkedList.prototype.insert = function insert(value) {
  if (this.head === null) {
    this.head = new SinglyLinkedListNode(value);
  } else {
    const temp = this.head;
    this.head = new SinglyLinkedListNode(value);
    this.head.next = temp;
  }
  this.size += 1;
};

SinglyLinkedList.prototype.remove = function remove(value) {
  let currentHead = this.head;

  if (currentHead.data === value) {
    this.head = currentHead.next;
    this.size -= 1;
  } else {
    let prev = currentHead;
    while (currentHead.next) {
      if (currentHead.data === value) {
        prev.next = currentHead.next;
        prev = currentHead;
        currentHead = currentHead.next;
        break;
      }
      prev = currentHead;
      currentHead = currentHead.next;
    }

    if (currentHead.data === value) {
      prev.next = null;
    }
    this.size -= 1;
  }
};

SinglyLinkedList.prototype.deleteAtHead = function deleteAtHead() {
  let toReturn = null;
  if (this.head !== null) {
    toReturn = this.head.data;
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
  }
  this.size -= 1;
  return toReturn;
};

SinglyLinkedList.prototype.find = function find(value) {
  let currentHead = this.head;
  while (currentHead) {
    if (currentHead.data === value) {
      return true;
    }
    currentHead = currentHead.next;
  }
  return false;
};

// DOUBLY LINKED LIST
function DoublyLinkedListNode(data) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

DoublyLinkedList.prototype.isEmpty = function isEmpty() {
  return this.size === 0;
};

DoublyLinkedList.prototype.insertAtHead = function insertAtHead(value) {
  if (this.head === null) {
    this.head = new DoublyLinkedListNode(value);
    this.tail = this.head;
  } else {
    const temp = new DoublyLinkedListNode(value);
    temp.next = this.head;
    this.head.prev = temp;
    this.head = temp;
  }

  this.size += 1;
};

DoublyLinkedList.prototype.insertAtTail = function insertAtTail(value) {
  if (this.tail === null) {
    this.tail = new DoublyLinkedListNode(value);
    this.head = this.tail;
  } else {
    const temp = new DoublyLinkedListNode(value);
    temp.prev = this.tail;
    this.tail.next = temp;
    this.tail = temp;
  }

  this.size += 1;
};

DoublyLinkedList.prototype.deleteAtHead = function deleteAtHead() {
  let toReturn = null;

  if (this.head !== null) {
    toReturn = this.head.data;

    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
  }
  this.size -= 1;
  return toReturn;
};

DoublyLinkedList.prototype.deleteAtTail = function deleteAtTail() {
  let toReturn = null;

  if (this.tail !== null) {
    toReturn = this.tail.data;

    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }
  this.size -= 1;
  return toReturn;
};

DoublyLinkedList.prototype.findStartingHead = function findStartingHead(value) {
  let currentHead = this.head;

  while (currentHead) {
    if (currentHead.data === value) {
      return true;
    }
    currentHead = currentHead.next;
  }
  return false;
};

DoublyLinkedList.prototype.findStartingTail = function findStartingTail(value) {
  let currentTail = this.tail;

  while (currentTail) {
    if (currentTail.data === value) {
      return true;
    }
    currentTail = currentTail.prev;
  }
  return false;
};

/* -------------------------------------------------------------------------- */
/*                                  EXERCISES                                 */
/* -------------------------------------------------------------------------- */
// REVERSE A SINGLY LINKED LIST
function reverseSingleLinkedList(sll) {
  const list = sll;
  let node = list.head;
  let prev = null;
  while (node) {
    const temp = node.next;
    node.next = prev;
    prev = node;
    if (!temp) {
      break;
    }
    node = temp;
  }
  list.head = node;
  return list;
}

// DELETE DUPLICATES IN A LINKED LIST
function deleteDuplicateInUnsortedSll(sll) {
  const list = sll;
  const track = {};
  let temp = sll.head;
  let prev = null;
  while (temp) {
    if (track[temp.data]) {
      prev.next = temp.next;
      list.size -= 1;
    } else {
      track[temp.data] = true;
      prev = temp;
    }
    temp = temp.next;
  }
  return sll;
}
