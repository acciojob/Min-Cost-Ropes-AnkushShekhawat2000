class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const root = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp() {
    let currentIdx = this.heap.length - 1;
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (this.heap[currentIdx] < this.heap[parentIdx]) {
        [this.heap[currentIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currentIdx]];
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  bubbleDown() {
    let currentIdx = 0;
    while (true) {
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;
      let smallestChildIdx = currentIdx;

      if (leftChildIdx < this.heap.length && this.heap[leftChildIdx] < this.heap[smallestChildIdx]) {
        smallestChildIdx = leftChildIdx;
      }

      if (rightChildIdx < this.heap.length && this.heap[rightChildIdx] < this.heap[smallestChildIdx]) {
        smallestChildIdx = rightChildIdx;
      }

      if (smallestChildIdx !== currentIdx) {
        [this.heap[currentIdx], this.heap[smallestChildIdx]] = [this.heap[smallestChildIdx], this.heap[currentIdx]];
        currentIdx = smallestChildIdx;
      } else {
        break;
      }
    }
  }
}

function mincost(arr) {
  const minHeap = new MinHeap();

  // Add all ropes to the min-heap
  for (const rope of arr) {
    minHeap.push(rope);
  }

  let totalCost = 0;

  // Combine ropes until only one remains
  while (!minHeap.isEmpty()) {
    const firstRope = minHeap.pop();
    const secondRope = minHeap.pop();

    const combinedCost = firstRope + (secondRope || 0);
    totalCost += combinedCost;

    if (secondRope !== null) {
      minHeap.push(combinedCost);
    }
  }

  return totalCost;
}

// Example
console.log(mincost([4, 3, 2, 6])); // Output: 29
console.log(mincost([1, 2, 3, 4, 5])); // Output: 33
