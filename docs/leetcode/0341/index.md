# 0341：扁平化嵌套列表迭代器（★★）


## 题目

给你一个嵌套的整数列表 nestedList 。每个元素要么是一个整数，要么是一个列表；
该列表的元素也可能是整数或者是其他列表。请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。

实现扁平迭代器类 NestedIterator ：
- NestedIterator(List<NestedInteger> nestedList) 用嵌套列表 nestedList 初始化迭代器。
- int next() 返回嵌套列表的下一个整数。
- boolean hasNext() 如果仍然存在待迭代的整数，返回 true ；否则，返回 false 。

示例 1：

    输入：nestedList = [[1,1],2,[1,1]]
    输出：[1,1,2,1,1]
    解释：通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,1,2,1,1]。

示例 2：

    输入：nestedList = [1,[4,[6]]]
    输出：[1,4,6]
    解释：通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,4,6]。
 
 提示：
- 1 <= nestedList.length <= 500
- 嵌套列表中的整数值在范围 [-10^6, 10^6] 内

## 分析

### #1

可以直接递归将 nextedList 转为一维列表，然后迭代返回即可。

为了方便，可以用转为队列，不断弹出首位元素即可。

```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        def dfs(nest):
            if nest.isInteger():
                return [nest.getInteger()]
            return [x for sub in nest.getList() for x in dfs(sub)]
        self.A = deque(x for sub in nestedList for x in dfs(sub))
    
    def next(self) -> int:
        return self.A.popleft()

    def hasNext(self) -> bool:
        return bool(self.A)
```
64 ms

### #2

还可以边迭代边转换：
- 如果队首是列表，就拆为元素加到队首
- 循环操作直到队首是整数，再弹出即可
- 为了方便，在 hasNext() 中完成转换，从而判断是否为空

## 解答


```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.A = deque(nestedList)

    def next(self) -> int:
        return self.A.popleft().getInteger()

    def hasNext(self) -> bool:
        while self.A and not self.A[0].isInteger():
            self.A.extendleft(self.A.popleft().getList()[::-1])
        return bool(self.A)
```
72 ms


