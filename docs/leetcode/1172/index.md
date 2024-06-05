# 1172：餐盘栈（2109 分）


> <u>**[力扣第 151 场周赛第 4 题](https://leetcode.cn/problems/dinner-plate-stacks/)**</u>

## 题目

<p>我们把无限数量 &infin; 的栈排成一行，按从左到右的次序从 0 开始编号。每个栈的的最大容量 <code>capacity</code> 都相同。</p>

<p>实现一个叫「餐盘」的类 <code>DinnerPlates</code>：</p>

<ul>
<li><code>DinnerPlates(int capacity)</code> - 给出栈的最大容量 <code>capacity</code>。</li>
<li><code>void push(int val)</code> - 将给出的正整数 <code>val</code> 推入 <strong>从左往右第一个 </strong>没有满的栈。</li>
<li><code>int pop()</code> - 返回 <strong>从右往左第一个 </strong>非空栈顶部的值，并将其从栈中删除；如果所有的栈都是空的，请返回 <code>-1</code>。</li>
<li><code>int popAtStack(int index)</code> - 返回编号 <code>index</code> 的栈顶部的值，并将其从栈中删除；如果编号 <code>index</code> 的栈是空的，请返回 <code>-1</code>。</li>
</ul>



<p><strong>示例：</strong></p>

<pre><strong>输入： </strong>
[&quot;DinnerPlates&quot;,&quot;push&quot;,&quot;push&quot;,&quot;push&quot;,&quot;push&quot;,&quot;push&quot;,&quot;popAtStack&quot;,&quot;push&quot;,&quot;push&quot;,&quot;popAtStack&quot;,&quot;popAtStack&quot;,&quot;pop&quot;,&quot;pop&quot;,&quot;pop&quot;,&quot;pop&quot;,&quot;pop&quot;]
[[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
<strong>输出：</strong>
[null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]

<strong>解释：</strong>
DinnerPlates D = DinnerPlates(2);  // 初始化，栈最大容量 capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // 栈的现状为：    2  4
1  3  5
﹈ ﹈ ﹈
D.popAtStack(0);   // 返回 2。栈的现状为：      4
1  3  5
﹈ ﹈ ﹈
D.push(20);        // 栈的现状为：  20  4
1  3  5
﹈ ﹈ ﹈
D.push(21);        // 栈的现状为：  20  4 21
1  3  5
﹈ ﹈ ﹈
D.popAtStack(0);   // 返回 20。栈的现状为：       4 21
1  3  5
﹈ ﹈ ﹈
D.popAtStack(2);   // 返回 21。栈的现状为：       4
1  3  5
﹈ ﹈ ﹈
D.pop()            // 返回 5。栈的现状为：        4
1  3
﹈ ﹈
D.pop()            // 返回 4。栈的现状为：    1  3
﹈ ﹈
D.pop()            // 返回 3。栈的现状为：    1
﹈
D.pop()            // 返回 1。现在没有栈。
D.pop()            // 返回 -1。仍然没有栈。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= capacity &lt;= 20000</code></li>
<li><code>1 &lt;= val &lt;= 20000</code></li>
<li><code>0 &lt;= index &lt;= 100000</code></li>
<li>最多会对 <code>push</code>，<code>pop</code>，和 <code>popAtStack</code> 进行 <code>200000</code> 次调用。</li>
</ul>


## 分析

考虑用数组 A 动态维护所有栈的信息（保证末尾是非空栈），那么 pop 时：

    若 len(A[-1]) > 1，直接 pop A[-1] 即可
    若 len(A[-1]) == 1，pop A[-1] 并去掉末尾所有空栈
    每个非末尾的空栈至少对应了一个 push 和 popAtStack 操作
    因此平摊下来 pop 时间复杂度 O(1)

然后为了方便 push，考虑用堆 pq 维护没有满的栈下标集合，那么：

    若 pq 空或 pq[0]>=len(A)
        说明 A 中的栈的都满了，末尾添加一个栈并 push
    否则
        得到没有满的最小下标 i=pq[0]，往 A[i] push

> 注意在所有操作中都要维护 pq，不过去掉空栈时可以采用延迟删除的技巧，从而节省时间。

## 解答

```python
class DinnerPlates:

    def __init__(self, capacity: int):
        self.size = capacity
        self.pq = []
        self.A = []

    def push(self, val: int) -> None:
        if not self.pq or self.pq[0] >= len(self.A):
            self.A.append([val])
            self.pq = [len(self.A)-1] if self.size > 1 else []
        else:
            i = self.pq[0]
            self.A[i].append(val)
            if len(self.A[i]) == self.size:
                heappop(self.pq)

    def pop(self) -> int:
        return -1 if not self.A else self.popAtStack(len(self.A)-1)

    def popAtStack(self, index: int) -> int:
        if index >= len(self.A) or not self.A[index]:
            return -1
        val = self.A[index].pop()
        if len(self.A[index]) == self.size - 1:
            heappush(self.pq, index)
        while self.A and not self.A[-1]:
            self.A.pop()
        return val
```
时间复杂度 O(N*logN)，648 ms

