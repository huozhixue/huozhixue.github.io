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

- 类似 {{< lc "0460" >}} LFU缓存，不过没有 value，也没有查询操作，要简单很多
- 字典 ct 保存每个元素的频数，字典 d 保存每个频数对应的元素列表，并维护最大频数 ma 即可
- 注意本题中相同数值也看作不同元素，比如进了 5 个 1，那么频数从1 到 5 的列表中都有 1，保证按入栈顺序出栈


## 解答

```python
class FreqStack:
    def __init__(self):
        self.ct = defaultdict(int)
        self.d = defaultdict(list)
        self.ma = 0

    def push(self, val: int) -> None:
        self.ct[val] += 1
        w = self.ct[val]
        self.d[w].append(val)
        self.ma = max(self.ma,w)

    def pop(self) -> int:
        val = self.d[self.ma].pop()
        if not self.d[self.ma]: 
            self.ma -= 1
        self.ct[val] -= 1
        return val
```

78 ms

