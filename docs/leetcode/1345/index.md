# 1345：跳跃游戏 IV（1809 分）


> <u>**[力扣第 19 场双周赛第 4 题](https://leetcode.cn/problems/jump-game-iv/)**</u>

## 题目

<p>给你一个整数数组 <code>arr</code> ，你一开始在数组的第一个元素处（下标为 0）。</p>

<p>每一步，你可以从下标 <code>i</code> 跳到下标 <code>i + 1</code> 、<code>i - 1</code> 或者 <code>j</code> ：</p>

<ul>
<li><code>i + 1</code> 需满足：<code>i + 1 &lt; arr.length</code></li>
<li><code>i - 1</code> 需满足：<code>i - 1 &gt;= 0</code></li>
<li><code>j</code> 需满足：<code>arr[i] == arr[j]</code> 且 <code>i != j</code></li>
</ul>

<p>请你返回到达数组最后一个元素的下标处所需的 <strong>最少操作次数</strong> 。</p>

<p>注意：任何时候你都不能跳到数组外面。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr = [100,-23,-23,404,100,23,23,23,3,404]
<strong>输出：</strong>3
<strong>解释：</strong>那你需要跳跃 3 次，下标依次为 0 --&gt; 4 --&gt; 3 --&gt; 9 。下标 9 为数组的最后一个元素的下标。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr = [7]
<strong>输出：</strong>0
<strong>解释：</strong>一开始就在最后一个元素处，所以你不需要跳跃。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>arr = [7,6,9,6,9,6,9,7]
<strong>输出：</strong>1
<strong>解释：</strong>你可以直接从下标 0 处跳到下标 7 处，也就是数组的最后一个元素处。
</pre>



<p><strong>提示：</strong></p>
<meta charset="UTF-8" />

<ul>
<li><code>1 &lt;= arr.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>-10<sup>8</sup> &lt;= arr[i] &lt;= 10<sup>8</sup></code></li>
</ul>


**相似问题：**
- [1871：跳跃游戏 VII（1896 分）](/leetcode/1871)
- [2297：跳跃游戏 VIII](/leetcode/2297)
- [2770：达到末尾下标所需的最大跳跃次数（1533 分）](/leetcode/2770)


## 分析

bfs 即可，注意一个值访问过就将列表清空

## 解答


```python
class Solution:
    def minJumps(self, arr: List[int]) -> int:
        n = len(arr)
        d = defaultdict(list)
        for i,x in enumerate(arr):
            d[x].append(i)
        Q, vis = deque([(0,0)]), {0}
        while Q:
            w,u = Q.popleft()
            if u==n-1:
                return w
            for v in chain(d[arr[u]], [u-1,u+1]):
                if 0<=v<n and v not in vis:
                    Q.append((w+1,v))
                    vis.add(v)
            d[arr[u]].clear()
```
367 ms
