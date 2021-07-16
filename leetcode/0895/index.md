# 0895：最大频率栈（★★）



## 题目

实现 FreqStack，模拟类似栈的数据结构的操作的一个类。

FreqStack 有两个函数：

- push(int x)，将整数 x 推入栈中。
- pop()，它移除并返回栈中出现最频繁的元素。

如果最频繁的元素不只一个，则移除并返回最接近栈顶的元素。

提示：

- 对 FreqStack.push(int x) 的调用中 0 <= x <= 10^9。
- 如果栈的元素数目为零，则保证不会调用  FreqStack.pop()。
- 单个测试样例中，对 FreqStack.push 的总调用次数不会超过 10000。
- 单个测试样例中，对 FreqStack.pop 的总调用次数不会超过 10000。
- 所有测试样例中，对 FreqStack.push 和 FreqStack.pop 的总调用次数不会超过 150000。

 <!--more--> 
 
示例：

	输入：
	["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
	[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
	输出：[null,null,null,null,null,null,null,5,7,5,4]
	解释：
	执行六次 push 操作后，栈自底向上为 [5,7,5,7,4,5]。然后：

	pop() -> 返回 5，因为 5 是出现频率最高的。
	栈变成 [5,7,5,7,4]。

	pop() -> 返回 7，因为 5 和 7 都是频率最高的，但 7 最接近栈顶。
	栈变成 [5,7,5,4]。

	pop() -> 返回 5 。
	栈变成 [5,7,4]。

	pop() -> 返回 4 。
	栈变成 [5,7]。
 

## 分析

有点类似 {{< lc "0460" >}} LFU缓存，不过没有 value，也没有查询操作，因此要简单很多。

令字典 freq 保存每个元素的频数，令 d 字典保存每个频数对应的元素列表。push 元素 x 时，freq[x] += 1，d[freq[x]].append(x)。
显然对于最大频数 maxFreq，d[maxFreq] 中的顺序即是元素最后一次入栈的顺序，所以 pop 时，x = d[maxFreq].pop()，freq[x] -= 1 即可。

可以维护 maxFreq 以节省时间。pop 时，若 d[maxFreq] 为空，则 maxFreq -= 1。

## 解答

```python
class FreqStack:

    def __init__(self):
        self.d = defaultdict(list)
        self.freq = defaultdict(int)
        self.maxFreq = 0

    def push(self, val: int) -> None:
        self.freq[val] += 1
        self.maxFreq = max(self.maxFreq, self.freq[val])
        self.d[self.freq[val]].append(val)

    def pop(self) -> int:
        x = self.d[self.maxFreq].pop()
        self.freq[x] -= 1
        if not self.d[self.maxFreq]:
            self.maxFreq -= 1
        return x
```

284 ms

