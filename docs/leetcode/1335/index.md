# 1335：工作计划的最低难度（2034 分）


> <u>**[力扣第 173 场周赛第 4 题](https://leetcode.cn/problems/minimum-difficulty-of-a-job-schedule/)**</u>

## 题目

<p>你需要制定一份 <code>d</code> 天的工作计划表。工作之间存在依赖，要想执行第 <code>i</code> 项工作，你必须完成全部 <code>j</code> 项工作（ <code>0 &lt;= j &lt; i</code>）。</p>

<p>你每天 <strong>至少</strong> 需要完成一项任务。工作计划的总难度是这 <code>d</code> 天每一天的难度之和，而一天的工作难度是当天应该完成工作的最大难度。</p>

<p>给你一个整数数组 <code>jobDifficulty</code> 和一个整数 <code>d</code>，分别代表工作难度和需要计划的天数。第 <code>i</code> 项工作的难度是 <code>jobDifficulty[i]</code>。</p>

<p>返回整个工作计划的 <strong>最小难度</strong> 。如果无法制定工作计划，则返回 <strong>-1 </strong>。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/26/untitled.png" style="height: 304px; width: 365px;"></p>

<pre><strong>输入：</strong>jobDifficulty = [6,5,4,3,2,1], d = 2
<strong>输出：</strong>7
<strong>解释：</strong>第一天，您可以完成前 5 项工作，总难度 = 6.
第二天，您可以完成最后一项工作，总难度 = 1.
计划表的难度 = 6 + 1 = 7
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>jobDifficulty = [9,9,9], d = 4
<strong>输出：</strong>-1
<strong>解释：</strong>就算你每天完成一项工作，仍然有一天是空闲的，你无法制定一份能够满足既定工作时间的计划表。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>jobDifficulty = [1,1,1], d = 3
<strong>输出：</strong>3
<strong>解释：</strong>工作计划为每天一项工作，总难度为 3 。
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>jobDifficulty = [7,1,7,1,7,1], d = 3
<strong>输出：</strong>15
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>jobDifficulty = [11,111,22,222,33,333,44,444], d = 6
<strong>输出：</strong>843
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= jobDifficulty.length &lt;= 300</code></li>
<li><code>0 &lt;= jobDifficulty[i] &lt;= 1000</code></li>
<li><code>1 &lt;= d &lt;= 10</code></li>
</ul>




## 分析

### #1

令 f(i,j) 代表 i 天完成 A[:j+1] 的最小难度，按最后一天完成的任务数，即可递推

```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        A = jobDifficulty
        n = len(A)
        f = list(accumulate(A,max))
        for i in range(2,d+1):
            g = [inf]*n
            for j in range(i-1,n):
                a = 0
                for k in range(j,i-2,-1):
                    a = max(a,A[k])
                    g[j] = min(g[j],f[k-1]+a)
            f = g
        return f[-1] if f[-1]<inf else -1
```
567 ms
### #2

- 观察递推过程，还可以简化
- 假如 A[j] 左边第一个更大的位置是 k
	- 要么最后一段包括了 k，那么 g[j]=g[k]
	- 要么最后一段的最大值即是 A[j]，g[j] = min(f[k:j])+A[j]
- 找上一个更大位置即是典型的单调栈
	- 注意到单调栈过程中，找 j 对应的 k 时，刚好遍历了 [k:j] 区间
	- 因此栈中额外保存每个 j 对应的 min(f[k:j]) 信息，即可在单调栈过程中递推

## 解答

```python
class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        A = jobDifficulty
        n = len(A)
        f = list(accumulate(A,max))
        for i in range(2,d+1):
            g = [inf]*n
            sk = []
            for j in range(i-1,n):
                a = f[j-1]
                while sk and sk[-1][1]<=A[j]:
                    a = min(a,sk.pop()[2])
                g[j] = a+A[j]
                if sk:
                    g[j] = min(g[j],g[sk[-1][0]])
                sk.append((j,A[j],a))
            f = g
        return f[-1] if f[-1]<inf else -1
```
7 ms

