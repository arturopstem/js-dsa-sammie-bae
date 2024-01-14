/* -------------------------------------------------------------------------- */
/*                              UNDIRECTED GRAPH                              */
/* -------------------------------------------------------------------------- */
function UndirectedGraph() {
  this.edges = {};
}

UndirectedGraph.prototype.addVertex = function addVertex(vertex) {
  this.edges[vertex] = {};
};

UndirectedGraph.prototype.addEdge = function addEdge(
  vertex1,
  vertex2,
  _weight,
) {
  const weight = _weight;
  this.edges[vertex1][vertex2] = weight;
  this.edges[vertex2][vertex1] = weight;
};

UndirectedGraph.prototype.removeEdge = function removeEdge(vertex1, vertex2) {
  if (this.edges[vertex1] && this.edges[vertex1][vertex2] !== undefined) {
    delete this.edges[vertex1][vertex2];
  }
  if (this.edges[vertex2] && this.edges[vertex2][vertex1 !== undefined]) {
    delete this.edges[vertex2][vertex1];
  }
};

UndirectedGraph.prototype.removeVertex = function removeVertex(vertex) {
  const adjVertices = Object.keys(this.edges[vertex]);
  adjVertices.forEach((adjVertex) => {
    this.removeEdge(adjVertex, vertex);
  });
  delete this.edges[vertex];
};

/* -------------------------------------------------------------------------- */
/*                               DIRECTED GRAPH                               */
/* -------------------------------------------------------------------------- */
function DirectedGraph() {
  this.edges = {};
}

DirectedGraph.prototype.addVertex = function addVertex(vertex) {
  this.edges[vertex] = {};
};

DirectedGraph.prototype.addEdge = function addEdge(
  origVertex,
  destVertex,
  _weight,
) {
  let weight = _weight;
  if (weight === undefined) {
    weight = 0;
  }
  this.edges[origVertex][destVertex] = weight;
};

DirectedGraph.prototype.removeEdge = function removeEdge(
  origVertex,
  destVertex,
) {
  if (
    this.edges[origVertex] &&
    this.edges[origVertex][destVertex] !== undefined
  ) {
    delete this.edges[origVertex][destVertex];
  }
};

DirectedGraph.prototype.removeVertex = function removeVertex(vertex) {
  const adjVertices = Object.keys(this.edges[vertex]);
  adjVertices.forEach((adjVertex) => {
    this.removeEdge(adjVertex, vertex);
  });
  delete this.edges[vertex];
};

// Breadth-first Search
DirectedGraph.prototype.traverseBFS = function traverseBFS(_vertex, fn) {
  let vertex = _vertex;
  const queue = [];
  const visited = {};

  queue.push(vertex);

  while (queue.length) {
    vertex = queue.shift();
    if (!visited[vertex]) {
      visited[vertex] = true;
      fn(vertex);

      const adjVertices = Object.keys(this.edges[vertex]);
      adjVertices.forEach((adjVertex) => {
        queue.push(adjVertex);
      });
    }
  }
};

// Depth-first search
DirectedGraph.prototype.traverseDFS = function traverseDFS(vertex, fn) {
  const visited = {};
  this.traverseDFSHelper(vertex, visited, fn);
};

DirectedGraph.prototype.traverseDFSHelper = function traverseDFSHelper(
  vertex,
  _visited,
  fn,
) {
  const visited = _visited;

  visited[vertex] = true;
  fn(vertex);
  const adjVertices = Object.keys(this.edges[vertex]);
  adjVertices.forEach((adjVertex) => {
    if (!visited[adjVertex]) {
      this.traverseDFSHelper(adjVertex, visited, fn);
    }
  });
};

/* -------------------------------------------------------------------------- */
/*                             DIJKSTRA ALGORITHM                             */
/* -------------------------------------------------------------------------- */
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function extractMin(Q, dist) {
  let minimunDistance = Infinity;
  let nodeWithMinimumDistance = null;

  const nodes = Object.keys(Q);
  nodes.forEach((node) => {
    if (dist[node] <= minimunDistance) {
      minimunDistance = dist[node];
      nodeWithMinimumDistance = node;
    }
  });
  return nodeWithMinimumDistance;
}

DirectedGraph.prototype.Dijkstra = function Dijkstra(source) {
  const Q = {};
  const dist = {};
  const vertices = Object.keys(this.edges);

  vertices.forEach((vertex) => {
    dist[vertex] = Infinity;
    Q[vertex] = this.edges[vertex];
  });

  dist[source] = 0;

  while (!isEmpty(Q)) {
    const u = extractMin(Q, dist);

    delete Q[u];

    const neighbors = Object.keys(this.edges[u]);
    neighbors.forEach((neighbor) => {
      const alt = dist[u] + this.edges[u][neighbor];
      if (alt < dist[neighbor]) {
        dist[neighbor] = alt;
      }
    });
  }
  return dist;
};

const digraph1 = new DirectedGraph();
digraph1.addVertex('A');
digraph1.addVertex('B');
digraph1.addVertex('C');
digraph1.addVertex('D');
digraph1.addEdge('A', 'B', 1);
digraph1.addEdge('B', 'C', 2);
digraph1.addEdge('C', 'A', 1);
digraph1.addEdge('A', 'D', 1);

console.log(digraph1.Dijkstra('A'));
