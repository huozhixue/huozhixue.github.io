# 0683：K 个关闭的灯泡（★★）


> <u>**[力扣第 683 题](https://leetcode.cn/problems/k-empty-slots/)**</u>

## 题目

<p><code>n</code> 个灯泡排成一行，编号从 <code>1</code> 到<meta charset="UTF-8" /> <code>n</code> 。最初，所有灯泡都关闭。每天 <strong>只打开一个</strong> 灯泡，直到<meta charset="UTF-8" /> <code>n</code> 天后所有灯泡都打开。</p>

<p>给你一个长度为<meta charset="UTF-8" /> <code>n</code> 的灯泡数组 <code>blubs</code> ，其中 <code>bulls[i] = x</code> 意味着在第 <code>(i+1)</code> 天，我们会把在位置 <code>x</code> 的灯泡打开，其中 <code>i</code> <strong>从 0 开始</strong>，<code>x</code> <strong>从 1 开始</strong>。</p>

<p>给你一个整数<meta charset="UTF-8" /> <code>k</code> ，请返回<em>恰好有两个打开的灯泡，且它们中间 <strong>正好</strong> 有<meta charset="UTF-8" /> <code>k</code> 个 <strong>全部关闭的</strong> 灯泡的 <strong>最小的天数</strong> </em>。<em>如果不存在这种情况，返回 <code>-1</code> 。</em></p>



<p><b>示例 1：</b></p>

<pre>
<b>输入：</b>
bulbs = [1,3,2]，k = 1
<b>输出：</b>2
<b>解释：</b>
第一天 bulbs[0] = 1，打开第一个灯泡 [1,0,0]
第二天 bulbs[1] = 3，打开第三个灯泡 [1,0,1]
第三天 bulbs[2] = 2，打开第二个灯泡 [1,1,1]
返回2，因为在第二天，两个打开的灯泡之间恰好有一个关闭的灯泡。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>bulbs = [1,2,3]，k = 1
<strong>输出：</strong>-1
</pre>



<p><b>提示：</b></p>

<ul>
<li><code>n == bulbs.length</code></li>
<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= bulbs[i] &lt;= n</code></li>
<li><code>bulbs</code> 是一个由从 <code>1</code> 到 <code>n</code> 的数字构成的排列</li>
<li><code>0 &lt;= k &lt;= 2 * 10<sup>4</sup></code></li>
</ul>


## 分析

### #1 有序集合

- 可以用有序集合模拟，看和上/下一个打开灯泡的间隔即可


```python
from sortedcontainers import SortedList
class Solution:
    def kEmptySlots(self, bulbs: List[int], k: int) -> int:
        sl = SortedList()
        for i,b in enumerate(bulbs,1):
            sl.add(b)
            pos = sl.index(b)
            if pos and sl[pos-1]==b-k-1:
                return i
            if pos+1<len(sl) and sl[pos+1]==b+k+1:
                return i
        return -1
```
323 ms

### #2 单调队列

- 将 bulbs 转为数组 A，A[i] 代表灯泡 i 打开的天数
- 问题转为求 A 的 k+2 长的子数组，首尾是最小值
- 可以用单调队列维护 k 长的子数组最小值，和首位比较即可
- 注意特判 k=0 的情况
## 解答

```python
class Solution:
    def kEmptySlots(self, bulbs: List[int], k: int) -> int:
        n = len(bulbs)
        A = [0]*n
        for i,x in enumerate(bulbs):
            A[x-1] = i+1
        if k==0:
            return min(max(a,b) for a,b in pairwise(A)) if len(A)>=2 else -1
        res = inf
        dq = deque()
        for i,a in enumerate(A):
            if dq and dq[0]==i-k:
                dq.popleft()
            while dq and A[dq[-1]]>a:
                dq.pop()
            dq.append(i)
            if k<=i<n-1 and A[dq[0]]>max(A[i+1],A[i-k]):
                res = min(res,max(A[i+1],A[i-k]))
        return res if res<inf else -1
```
229 ms
