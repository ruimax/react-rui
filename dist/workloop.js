function performUnitOfWork(fiber) {
  // 参数fiber即是一个工作单元unitOfWork
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.return) {
    fiber.return.dom.appendChild(fiber.dom);
  }

  // vdom转fiber
  const elements = fiber.children;
  let prevSibling = null;
  if (elements && elements.length) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const newFiber = {
        type: element.type,
        props: element.props,
        return: fiber,
        dom: null
      };
      if (!prevSibling) {
        fiber.child = newFiber;
      } else {
        prevSibling.sibling = newFiber;
      }
      prevSibling = element;
    }
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    // 深度优先遍历
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }

  // 所有单元都处理完成
  return null;
}

// 操作dom
function commitRoot() {
  commitRootImpl(workInProgressRoot.child);
  workInProgressRoot = null;
}
function updateDom() {}
function commitRootImpl(fiber) {
  if (!fiber) {
    return;
  }
  const parentDom = fiber.return.dom;
  // 
  if (fiber.effectTag === 'REPLACEMENT' && fiber.dom) {
    // 替换
    parentDom.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELETION') {
    // 删除
    parentDom.removeChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
    // props更新
    // 更新dom属性
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  parentDom.appendChild(fiber.dom);

  // 递归更新子元素和兄弟节点
  commitRootImpl(fiber.child);
  commitRootImpl(fiber.sibling);
}
function workloop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    // 渲染器，commit阶段
    commitRoot();
  }
  requestIdleCallback(workloop);
}
requestIdleCallback(workloop);