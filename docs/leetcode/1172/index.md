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

### #1 有序集合

- 最简单的就是维护两个有序集合
	- nfull 维护没有满的栈
	- nvoid 维护非空的栈
- push 和 pop 时更新两个有序集合即可
- 由于 nfull 只有添加和删除最值的操作，可以用堆

```python
class DinnerPlates:

    def __init__(self, capacity: int):
        from sortedcontainers import SortedList
        self.ca = capacity
        self.A = []
        self.nfull = []
        self.nvoid = SortedList()

    def push(self, val: int) -> None:
        if self.nfull:
            i = heappop(self.nfull)
        else:
            i = len(self.A)
            self.A.append([])
        self.A[i].append(val)
        if len(self.A[i])<self.ca:
            heappush(self.nfull,i)
        if len(self.A[i])==1:
            self.nvoid.add(i)

    def pop(self) -> int:
        if not self.nvoid:
            return -1
        return self.popAtStack(self.nvoid[-1])

    def popAtStack(self, index: int) -> int:
        if not (0<=index<len(self.A) and self.A[index]):
            return -1
        x = self.A[index].pop()
        if len(self.A[index])==self.ca-1:
            heappush(self.nfull,index)
        if not self.A[index]:
            self.nvoid.remove(index)
        return x
```
480 ms
### #2 堆


- 还可以注意维护数组 A，保证末尾非空，那么无需维护 nvoid
- 此时 nfull 采用懒删除即可

## 解答

```python
class DinnerPlates:

    def __init__(self, capacity: int):
        self.ma = capacity
        self.A = []
        self.nfull = []

    def push(self, val: int) -> None:
        nfull,A = self.nfull,self.A
        if not nfull or nfull[0]>=len(A):
            nfull.clear()
            i = len(A)
            A.append([])
        else:
            i = heappop(nfull)
        A[i].append(val)
        if len(A[i])<self.ma:
            heappush(nfull, i)

    def pop(self) -> int:
        return self.popAtStack(len(self.A)-1)

    def popAtStack(self, index: int) -> int:
        nfull,A = self.nfull,self.A
        if not (0<=index<len(A) and A[index]):
            return -1
        x = A[index].pop()
        if len(A[index])==self.ma-1:
            heappush(nfull,index)
        while A and not A[-1]:
            A.pop()
        return x
```
176 ms

