# 1340：跳跃游戏 V（1866 分）


> <u>**[力扣第 174 场周赛第 4 题](https://leetcode.cn/problems/jump-game-v/)**</u>

## 题目

<p>给你一个整数数组 <code>arr</code> 和一个整数 <code>d</code> 。每一步你可以从下标 <code>i</code> 跳到：</p>

<ul>
<li><code>i + x</code> ，其中 <code>i + x &lt; arr.length</code> 且 <code>0 &lt; x &lt;= d</code> 。</li>
<li><code>i - x</code> ，其中 <code>i - x &gt;= 0</code> 且 <code>0 &lt; x &lt;= d</code> 。</li>
</ul>

<p>除此以外，你从下标 <code>i</code> 跳到下标 <code>j</code> 需要满足：<code>arr[i] &gt; arr[j]</code> 且 <code>arr[i] &gt; arr[k]</code> ，其中下标 <code>k</code> 是所有 <code>i</code> 到 <code>j</code> 之间的数字（更正式的，<code>min(i, j) &lt; k &lt; max(i, j)</code>）。</p>

<p>你可以选择数组的任意下标开始跳跃。请你返回你 <strong>最多</strong> 可以访问多少个下标。</p>

<p>请注意，任何时刻你都不能跳到数组的外面。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/02/meta-chart.jpeg" style="height: 419px; width: 633px;"></p>

<pre><strong>输入：</strong>arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
<strong>输出：</strong>4
<strong>解释：</strong>你可以从下标 10 出发，然后如上图依次经过 10 --&gt; 8 --&gt; 6 --&gt; 7 。
注意，如果你从下标 6 开始，你只能跳到下标 7 处。你不能跳到下标 5 处因为 13 &gt; 9 。你也不能跳到下标 4 处，因为下标 5 在下标 4 和 6 之间且 13 &gt; 9 。
类似的，你不能从下标 3 处跳到下标 2 或者下标 1 处。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>arr = [3,3,3,3,3], d = 3
<strong>输出：</strong>1
<strong>解释：</strong>你可以从任意下标处开始且你永远无法跳到任何其他坐标。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>arr = [7,6,5,4,3,2,1], d = 1
<strong>输出：</strong>7
<strong>解释：</strong>从下标 0 处开始，你可以按照数值从大到小，访问所有的下标。
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>arr = [7,1,7,1,7,1], d = 2
<strong>输出：</strong>2
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>arr = [66], d = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr.length &lt;= 1000</code></li>
<li><code>1 &lt;= arr[i] &lt;= 10^5</code></li>
<li><code>1 &lt;= d &lt;= arr.length</code></li>
</ul>


**相似问题：**
- [1871：跳跃游戏 VII（1896 分）](/leetcode/1871)
- [2297：跳跃游戏 VIII](/leetcode/2297)


## 分析

### #1 dp

跳的路径严格递减，因此可以递归

```python
class Solution:
    def maxJumps(self, arr: List[int], d: int) -> int:
        @cache
        def dfs(i):
            res = 1
            for j in range(i+1,i+d+1):
                if j>=n or arr[j]>=arr[i]:
                    break
                res = max(res, 1+dfs(j))
            for j in range(i-1,i-d-1,-1):
                if j<0 or arr[j]>=arr[i]:
                    break
                res = max(res, 1+dfs(j))
            return res
        
        n = len(arr)
        return max(dfs(i) for i in range(n))
```
371 ms

### #2 单调栈

- 还可以反过来，从低到高考虑路径
- 对于位置 j，最优的路径一定是跳到上/下一个更大位置
	- 如果该位置的距离超出了 d，则不能跳
- 因此，用单调栈求出上/下一个更大位置，即可递归

```python
class Solution:
    def maxJumps(self, arr: List[int], d: int) -> int:
        n = len(arr)
        sk,L = [],[-1]*n
        for i,x in enumerate(arr):
            while sk and arr[sk[-1]]<=x:
                sk.pop()
            if sk and i-sk[-1]<=d:
                L[i] = sk[-1]
            sk.append(i)
        sk,R = [],[-1]*n
        for i,x in enumerate(arr):
            while sk and arr[sk[-1]]<x:
                j = sk.pop()
                if i-j<=d:
                    R[j] = i
            sk.append(i)
        @cache
        def dfs(i):
            if i<0:
                return 0
            return 1+max(dfs(L[i]),dfs(R[i]))
        return max(dfs(i) for i in range(n))
```
45 ms

### #3

- 事实上，可以一次单调栈同时求出上/下一个更大位置
	- 只要将相同的值一起处理即可
- 在单调栈过程中可同时进行递推

## 解答


```python
class Solution:
    def maxJumps(self, arr: List[int], d: int) -> int:
        arr.append(inf)
        n = len(arr)
        f = [1]*n
        sk = []
        for i,a in enumerate(arr):
            while sk and arr[sk[-1]]<a:
                A = [sk.pop()]
                while sk and arr[sk[-1]]==arr[A[0]]:
                    A.append(sk.pop())
                for j in A:
                    if i-j<=d and 1+f[j]>f[i]:
                        f[i] = 1+f[j]
                    if sk and j-sk[-1]<=d and 1+f[j]>f[sk[-1]]:
                        f[sk[-1]] = 1+f[j]
            sk.append(i)
        return max(f[:-1])
```
16 ms
