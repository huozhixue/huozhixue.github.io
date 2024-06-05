# 0895：最大频率栈（2027 分）


> <u>**[力扣第 99 场周赛第 4 题](https://leetcode.cn/problems/maximum-frequency-stack/)**</u>

## 题目

<p>设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出<strong>出现频率</strong>最高的元素。</p>

<p>实现 <code>FreqStack</code> 类:</p>

<ul>
<li><meta charset="UTF-8" /><code>FreqStack()</code> 构造一个空的堆栈。</li>
<li><meta charset="UTF-8" /><code>void push(int val)</code> 将一个整数 <code>val</code> 压入栈顶。</li>
<li><meta charset="UTF-8" /><code>int pop()</code> 删除并返回堆栈中出现频率最高的元素。
<ul>
<li>如果出现频率最高的元素不只一个，则移除并返回最接近栈顶的元素。</li>
</ul>
</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
<strong>输出：</strong>[null,null,null,null,null,null,null,5,7,5,4]
<strong>解释：</strong>
FreqStack = new FreqStack();
freqStack.push (5);//堆栈为 [5]
freqStack.push (7);//堆栈是 [5,7]
freqStack.push (5);//堆栈是 [5,7,5]
freqStack.push (7);//堆栈是 [5,7,5,7]
freqStack.push (4);//堆栈是 [5,7,5,7,4]
freqStack.push (5);//堆栈是 [5,7,5,7,4,5]
freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,5,7,4]。
freqStack.pop ();//返回 7 ，因为 5 和 7 出现频率最高，但7最接近顶部。堆栈变成 [5,7,5,4]。
freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,4]。
freqStack.pop ();//返回 4 ，因为 4, 5 和 7 出现频率最高，但 4 是最接近顶部的。堆栈变成 [5,7]。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= val &lt;= 10<sup>9</sup></code></li>
<li><code>push</code> 和 <code>pop</code> 的操作数不大于 <code>2 * 10<sup>4</sup></code>。</li>
<li>输入保证在调用 <code>pop</code> 之前堆栈中至少有一个元素。</li>
</ul>


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

