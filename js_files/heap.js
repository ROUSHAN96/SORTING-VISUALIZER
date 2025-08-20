// Heap Sort Implementation
async function heapSort(ele) {
  console.log("In heapSort()");
  let n = ele.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(ele, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    ele[i].style.background = "orange";
    ele[0].style.background = "orange";
    await waitforme(delay);

    swap(ele[0], ele[i]);

    // Mark the sorted element
    ele[i].style.background = "green";
    await waitforme(delay);

    // Call max heapify on the reduced heap
    await heapify(ele, i, 0);
  }
  ele[0].style.background = "green";
}

async function heapify(ele, n, i) {
  console.log("In heapify()");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // Color the current root
  ele[i].style.background = "red";
  await waitforme(delay);

  // If left child is larger than root
  if (left < n) {
    ele[left].style.background = "yellow";
    await waitforme(delay);

    if (
      parseInt(ele[left].style.height) > parseInt(ele[largest].style.height)
    ) {
      // Reset color of previous largest
      if (largest !== i) {
        ele[largest].style.background = "cyan";
      }
      largest = left;
      ele[largest].style.background = "red";
    } else {
      ele[left].style.background = "cyan";
    }
    await waitforme(delay);
  }

  // If right child is larger than largest so far
  if (right < n) {
    ele[right].style.background = "yellow";
    await waitforme(delay);

    if (
      parseInt(ele[right].style.height) > parseInt(ele[largest].style.height)
    ) {
      // Reset color of previous largest
      ele[largest].style.background = "cyan";
      largest = right;
      ele[largest].style.background = "red";
    } else {
      ele[right].style.background = "cyan";
    }
    await waitforme(delay);
  }

  // If largest is not root
  if (largest != i) {
    // Highlight elements being swapped
    ele[i].style.background = "orange";
    ele[largest].style.background = "orange";
    await waitforme(delay);

    swap(ele[i], ele[largest]);
    await waitforme(delay);

    // Reset colors
    ele[i].style.background = "cyan";
    ele[largest].style.background = "cyan";
    await waitforme(delay);

    // Recursively heapify the affected sub-tree
    await heapify(ele, n, largest);
  } else {
    ele[i].style.background = "cyan";
  }
}

const heapSortbtn = document.querySelector(".heapSort");
heapSortbtn.addEventListener("click", async function () {
  let ele = document.querySelectorAll(".bar");
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await heapSort(ele);
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});
