# 0341：扁平化嵌套列表迭代器（★★）


## 题目

给你一个嵌套的整型列表。请你设计一个迭代器，使其能够遍历这个整型列表中的所有整数。

列表中的每一项或者为一个整数，或者是另一个列表。其中列表的元素也可能是整数或是其他列表。

<!--more--> 

示例 1:

	输入: [[1,1],2,[1,1]]
	输出: [1,1,2,1,1]
	解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,1,2,1,1]。

示例 2:

	输入: [1,[4,[6]]]
	输出: [1,4,6]
	解释: 通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,4,6]。

## 分析

可以构造一个队列，如果队首是列表，就拆为元素加到队首，循环操作直到队首是整数，再弹出即可。比如示例 2：

	[1, [4,[6]]]			队首是整数，直接弹出 1
	[[4, [6]]]				队首是列表，拆为元素加到队首
	[4, [6]]				队首是整数，直接弹出 4
	[[6]]					队首是列表，拆为元素加到队首
	[6]						队首是整数，直接弹出 6

因为可能有 [ [] ] 这种数据，所以将拆列表的操作放在 hasNext() 中。

## 解答

```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.queue = deque(nestedList)
    
    def next(self) -> int:
        return self.queue.popleft().getInteger()
        
    def hasNext(self) -> bool:
        while self.queue and not self.queue[0].isInteger():
            self.queue.extendleft(self.queue.popleft().getList()[::-1])
        return bool(self.queue)
```

76 ms


