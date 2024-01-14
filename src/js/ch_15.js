function BinaryTreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// BINARY TREE
function BinaryTree() {
  this.root = null;
}

BinaryTree.prototype.traversePreOrder = function traversePreOrder() {
  function traversePreOrderHelper(node) {
    if (!node) {
      return;
    }
    console.log(node.value);
    traversePreOrderHelper(node.left);
    traversePreOrderHelper(node.right);
  }

  traversePreOrderHelper(this.root);
};

BinaryTree.prototype.traverseInOrder = function traverseInOrder() {
  function traverseInOrderHelper(node) {
    if (!node) {
      return;
    }
    traverseInOrderHelper(this.left);
    console.log(node.value);
    traverseInOrderHelper(this.right);
  }
  traverseInOrderHelper(this.root);
};

BinaryTree.prototype.traversePostOrder = function traversePostOrder() {
  function traversePostOrderHelper(node) {
    if (!node) {
      return;
    }
    traversePostOrderHelper(node.left);
    traversePostOrderHelper(node.right);
    console.log(node.value);
  }
  traversePostOrderHelper(this.root);
};

BinaryTree.prototype.traverseLevelOrder = function traverseLevelOrder() {
  // Breath first search
  const { root } = this;
  const queue = [];
  if (!root) {
    return;
  }
  queue.push(root);

  while (queue.length) {
    const temp = queue.shift();
    console.log(temp.value);
    if (temp.left) {
      queue.push(temp.left);
    }
    if (temp.right) {
      queue.push(temp.right);
    }
  }
};

// BINARY SEARCH TREE
function BinarySearchTree() {
  this.root = null;
}

// Insertion
BinarySearchTree.prototype.insert = function insert(value) {
  const thisNode = { left: null, right: null, value };
  if (!this.root) {
    // if there is no root value yet
    this.root = thisNode;
  } else {
    // loop traverse until
    let currentRoot = this.root;
    for (;;) {
      if (currentRoot.value > value) {
        // let's increment if it's not a null and instead insert if
        // it is a null
        if (currentRoot.left != null) {
          currentRoot = currentRoot.left;
        } else {
          currentRoot.left = thisNode;
          break;
        }
      } else if (currentRoot.value < value) {
        // if bigger than current, put it on the right
        // let's increment if it's not a null and insert if it
        // is a null
        if (currentRoot.right != null) {
          currentRoot = currentRoot.right;
        } else {
          currentRoot.right = thisNode;
          break;
        }
      } else {
        // case that both are the same
        break;
      }
    }
  }
};

// Deletion
BinarySearchTree.prototype.remove = function remove(_value) {
  function findMin(_root) {
    let root = _root;
    while (root.left) {
      root = root.left;
    }
    return root;
  }

  function deleteRecursively(_root, value) {
    let root = _root;
    if (!root) {
      return null;
    }
    if (value < root.value) {
      root.left = deleteRecursively(root.left, value);
    } else if (value > root.value) {
      root.right = deleteRecursively(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        root = root.right;
        return root;
      }
      if (!root.right) {
        root = root.left;
        return root;
      }
      const temp = findMin(root.right);
      root.value = temp.value;
      root.right = deleteRecursively(root.right, temp.value);
      return root;
    }
    return root;
  }
  return deleteRecursively(this.root, _value);
};

// Search
BinarySearchTree.prototype.findNode = function findNode(value) {
  let currentRoot = this.root;
  let found = false;

  while (currentRoot) {
    if (currentRoot.value > value) {
      currentRoot = currentRoot.left;
    } else if (currentRoot.value < value) {
      currentRoot = currentRoot.right;
    } else {
      found = true;
      break;
    }
  }
  return found;
};
