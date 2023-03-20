# 0281：锯齿迭代器（★）


## 题目

给出两个一维的向量，请你实现一个迭代器，交替返回它们中间的元素。

示例:

	输入:
	v1 = [1,2]
	v2 = [3,4,5,6] 

	输出: [1,3,2,4,5,6]

	解析: 通过连续调用 next 函数直到 hasNext 函数返回 false，
	     next 函数返回值的次序应依次为: [1,3,2,4,5,6]。
	拓展：假如给你 k 个一维向量呢？你的代码在这种情况下的扩展性又会如何呢?

	拓展声明：
	 “锯齿” 顺序对于 k > 2 的情况定义可能会有些歧义。所以，假如你觉得 “锯齿” 这个表述不妥，
	也可以认为这是一种 “循环”。例如：

	输入:
	[1,2,3]
	[4,5,6,7]
	[8,9]

	输出: [1,4,8,2,5,9,3,6,7].


## 分析

每次取一对 v1、v2 的元素放入缓存即可。

## 解答

```python
class ZigzagIterator:
    def __init__(self, v1: List[int], v2: List[int]):
        self.v1 = v1
        self.v2 = v2
        self.i = 0
        self.cache = []
        
    def next(self) -> int:
        return self.cache.pop(0)

    def hasNext(self) -> bool:
        if not self.cache:
            if self.i<len(self.v1):
                self.cache.append(self.v1[self.i])
            if self.i<len(self.v2):
                self.cache.append(self.v2[self.i])
            self.i += 1
        return bool(self.cache)
```
52 ms



