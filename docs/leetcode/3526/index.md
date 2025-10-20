# 3526：范围异或查询与子数组反转（★★）


> <u>**[力扣第 3526 题](https://leetcode.cn/problems/range-xor-queries-with-subarray-reversals/)**</u>

## 题目

<p data-end="207" data-start="54">给定一个长度为 <code>n</code> 的整数数组 <code data-end="91" data-start="85">nums</code> 和一个长度为 <code>q</code> 的二维整数数组 <code data-end="138" data-start="129">queries</code>，其中的每个查询是以下三种类型之一：</p>

<ol data-end="563" data-start="209">
<li data-end="288" data-start="209">
<p data-end="288" data-start="212"><strong data-end="222" data-start="212">更新</strong>：<code data-end="256" data-start="224">queries[i] = [1, index, value]</code><br data-end="259" data-start="256" />
赋值 <code data-end="287" data-start="266">nums[index] = value</code>。</p>
</li>
<li data-end="450" data-start="290">
<p data-end="450" data-start="293"><b>范围异或查询</b>：<code data-end="345" data-start="314">queries[i] = [2, left, right]</code><br data-end="348" data-start="345" />
计算 <span data-keyword="subarray">子数组</span> 中所有元素的按位异或 <code data-end="425" data-start="407">nums[left...right]</code>，并记录结果。</p>
</li>
<li data-end="563" data-start="452">
<p data-end="563" data-start="455"><b>反转 <span data-keyword="subarray">子数组</span></b>：<code data-end="508" data-start="477">queries[i] = [3, left, right]</code><br data-end="511" data-start="508" />
原地反转 <code data-end="553" data-start="535">nums[left...right]</code> 子数组。</p>
</li>
</ol>

<p data-end="658" data-start="565">按照遇到的顺序返回所有范围异或查询的结果数组。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [1,2,3,4,5], queries = [[2,1,3],[1,2,10],[3,0,4],[2,0,4]]</span></p>

<p><span class="example-io"><b>输出：</b>[5,8]</span></p>

<p><strong>解释：</strong></p>

<ul data-end="1371" data-start="1014">
<li data-end="1098" data-start="1014">
<p data-end="1098" data-start="1016"><strong data-end="1028" data-start="1016">查询</strong><strong data-end="1028" data-start="1016"> 1：</strong><code data-end="1040" data-start="1029">[2, 1, 3]</code> – 计算 <code data-end="1078" data-start="1067">[2, 3, 4]</code> 子数组的异或和，结果为 5。</p>
</li>
<li data-end="1198" data-start="1099">
<p data-end="1198" data-start="1101"><strong data-end="1028" data-start="1016">查询</strong><strong data-end="1113" data-start="1101"> 2：</strong><code data-end="1126" data-start="1114">[1, 2, 10]</code> – 将 <code data-end="1145" data-start="1136">nums[2]</code> 更新为 10，数组更新为 <code data-end="1197" data-start="1179">[1, 2, 10, 4, 5]</code>。</p>
</li>
<li data-end="1279" data-start="1199">
<p data-end="1279" data-start="1201"><strong data-end="1028" data-start="1016">查询</strong><strong data-end="1213" data-start="1201"> 3：</strong><code data-end="1225" data-start="1214">[3, 0, 4]</code> – 反转整个数组，得到 <code data-end="1278" data-start="1260">[5, 4, 10, 2, 1]</code>。</p>
</li>
<li data-end="1371" data-start="1280">
<p data-end="1371" data-start="1282"><strong data-end="1028" data-start="1016">查询</strong><strong data-end="1294" data-start="1282"> 4：</strong><code data-end="1306" data-start="1295">[2, 0, 4]</code> – 计算 <code data-end="1351" data-start="1333">[5, 4, 10, 2, 1]</code> 子数组的异或和，结果为 8。</p>
</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [7,8,9], queries = [[1,0,3],[2,0,2],[3,1,2]]</span></p>

<p><strong>输出：</strong><span class="example-io">[2]</span></p>

<p><strong>解释：</strong></p>

<ul>
<li data-end="1621" data-start="1531">
<p data-end="1621" data-start="1533"><strong data-end="1028" data-start="1016">查询</strong><strong data-end="1545" data-start="1533"> 1：</strong><code data-end="1557" data-start="1546">[1, 0, 3]</code> – 将 <code data-end="1576" data-start="1567">nums[0]</code> 更新为 3，数组更新为 <code data-end="1620" data-start="1609">[3, 8, 9]</code>。</p>
</li>
<li data-end="1706" data-start="1622">
<p data-end="1706" data-start="1624"><strong data-end="1028" data-start="1016">查询</strong><strong data-end="1636" data-start="1624"> 2：</strong><code data-end="1648" data-start="1637">[2, 0, 2]</code> – 计算 <code data-end="1686" data-start="1675">[3, 8, 9]</code> 子数组的异或和，结果为 2。</p>
</li>
<li data-end="1827" data-start="1707">
<p data-end="1827" data-start="1709"><strong data-end="1028" data-start="1016">查询</strong><strong data-end="1721" data-start="1709"> 3：</strong><code data-end="1733" data-start="1722">[3, 1, 2]</code> – 反转子数组 <code data-end="1765" data-start="1757">[8, 9]</code>，得到 <code data-end="1781" data-start="1773">[9, 8]</code>。</p>
</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li data-end="173" data-start="92"><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li data-end="257" data-start="176"><code>0 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li data-end="341" data-start="260"><code>1 &lt;= queries.length &lt;= 10<sup>5</sup></code></li>
<li data-end="425" data-start="344"><code>queries[i].length == 3​</code></li>
<li data-end="513" data-start="428"><code>queries[i][0] ∈ {1, 2, 3}​</code></li>
<li data-end="601" data-start="516">如果 <code>queries[i][0] == 1</code>:<code>​</code>
<ul>
<li data-end="691" data-start="606"><code>0 &lt;= index &lt; nums.length​</code></li>
<li data-end="781" data-start="696"><code>0 &lt;= value &lt;= 10<sup>9</sup></code></li>
</ul>
</li>
<li>如果 <code>queries[i][0] == 2</code> 或 <code>queries[i][0] == 3</code>：
<ul>
<li data-end="959" data-start="874"><code>0 &lt;= left &lt;= right &lt; nums.length​</code></li>
</ul>
</li>
</ul>




## 分析

- treap 树模板

## 解答


```python []
class Node:
    __slots__ = ('l','r','prio','sz','val','xo','rev')
    def __init__(self, v):
        self.l = self.r = None
        self.prio = random.randrange(1 << 30)
        self.sz = 1
        self.val = v
        self.xo = v
        self.rev = 0

def pull(t):                    # 结构改变后更新信息
    t.sz = 1
    t.xo = t.val
    if t.l:
        t.sz += t.l.sz
        t.xo ^= t.l.xo
    if t.r:
        t.sz += t.r.sz
        t.xo ^= t.r.xo

def push(t):                    # 下传懒标记
    if t and t.rev:
        t.l, t.r = t.r, t.l
        if t.l: t.l.rev ^= 1
        if t.r: t.r.rev ^= 1
        t.rev = 0

def split(t,k):                 # 按前k个节点/剩余节点拆分
    if not t:
        return None,None
    push(t)
    lsz = t.l.sz if t.l else 0
    if lsz >= k:
        L,R = split(t.l,k)
        t.l = R
        pull(t)
        return L,t
    else:
        L,R = split(t.r,k-lsz-1)
        t.r = L
        pull(t)
        return t,R

def merge(u,v):                 # 合并，u中最大值小于v中最小值
    if not u or not v:
        return u or v
    if u.prio<v.prio:
        push(u)
        u.r = merge(u.r, v)
        pull(u)
        return u
    else:
        push(v)
        v.l = merge(u,v.l)
        pull(v)
        return v

class Solution:
    def getResults(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        root = None
        for v in nums:
            node = Node(v)
            root = merge(root, node)
        res = []
        for tp,x,y in queries:
            if tp == 1:
                L,R = split(root,x)
                u,R = split(R,1)
                u.val = y
                pull(u)
                root = merge(L,merge(u,R))
            elif tp == 2:
                L,R = split(root,x)
                u,R = split(R,y-x+1)
                res.append(u.xo)
                root = merge(L,merge(u,R))
            else:
                L,R = split(root,x)
                u,R = split(R,y-x+1)
                u.rev ^= 1
                root = merge(L,merge(u,R))
        return res
```
7538 ms
