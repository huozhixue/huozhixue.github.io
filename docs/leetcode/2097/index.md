# 2097：合法重新排列数对（2650 分）


> <u>**[力扣第 270 场周赛第 4 题](https://leetcode.cn/problems/valid-arrangement-of-pairs/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的二维整数数组 <code>pairs</code> ，其中 <code>pairs[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 。如果 <code>pairs</code> 的一个重新排列，满足对每一个下标 <code>i</code> （ <code>1 &lt;= i &lt; pairs.length</code> ）都有 <code>end<sub>i-1</sub> == start<sub>i</sub></code><sub> </sub>，那么我们就认为这个重新排列是 <code>pairs</code> 的一个 <strong>合法重新排列</strong> 。</p>

<p>请你返回 <strong>任意一个</strong> <code>pairs</code> 的合法重新排列。</p>

<p><b>注意：</b>数据保证至少存在一个 <code>pairs</code> 的合法重新排列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>pairs = [[5,1],[4,5],[11,9],[9,4]]
<b>输出：</b>[[11,9],[9,4],[4,5],[5,1]]
<strong>解释：
</strong>输出的是一个合法重新排列，因为每一个 end<sub>i-1</sub> 都等于 start<sub>i</sub> 。
end<sub>0</sub> = 9 == 9 = start<sub>1</sub>
end<sub>1</sub> = 4 == 4 = start<sub>2</sub>
end<sub>2</sub> = 5 == 5 = start<sub>3</sub>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>pairs = [[1,3],[3,2],[2,1]]
<b>输出：</b>[[1,3],[3,2],[2,1]]
<strong>解释：</strong>
输出的是一个合法重新排列，因为每一个 end<sub>i-1</sub> 都等于 start<sub>i</sub> 。
end<sub>0</sub> = 3 == 3 = start<sub>1</sub>
end<sub>1</sub> = 2 == 2 = start<sub>2</sub>
重新排列后的数组 [[2,1],[1,3],[3,2]] 和 [[3,2],[2,1],[1,3]] 都是合法的。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>pairs = [[1,2],[1,3],[2,1]]
<b>输出：</b>[[1,2],[2,1],[1,3]]
<strong>解释：</strong>
输出的是一个合法重新排列，因为每一个 end<sub>i-1</sub> 都等于 start<sub>i</sub> 。
end<sub>0</sub> = 2 == 2 = start<sub>1</sub>
end<sub>1</sub> = 1 == 1 = start<sub>2</sub>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= pairs.length &lt;= 10<sup>5</sup></code></li>
<li><code>pairs[i].length == 2</code></li>
<li><code>0 &lt;= start<sub>i</sub>, end<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
<li><code>start<sub>i</sub> != end<sub>i</sub></code></li>
<li><code>pairs</code> 中不存在一模一样的数对。</li>
<li>至少 <strong>存在</strong> 一个合法的 <code>pairs</code> 重新排列。</li>
</ul>


**相似问题：**
- [0332：重新安排行程](/leetcode/0332)
- [1971：寻找图中是否存在路径](/leetcode/1971)


## 分析

将 start，end 看作点，pair 看作边，那么就是典型的欧拉通路问题。

数据保证存在欧拉通路，那么先找到起始节点

    若存在点的出度比入度多 1，该点即是起始节点
    否则任一点都可作为起始节点

然后用 Hierholzer 算法即可。


## 解答

```python
def validArrangement(self, pairs: List[List[int]]) -> List[List[int]]:
    def dfs(u):
        while nxt[u]:
            dfs(nxt[u].pop())
        stack.append(u)
    
    nxt, ct = defaultdict(list), Counter()
    for u, v in pairs:
        nxt[u].append(v)
        ct[u] += 1
        ct[v] -= 1
    A = [u for u, _ in pairs if ct[u]==1]
    stack, start = [], A.pop() if A else pairs[0][0]
    dfs(start)
    return [[stack[i], stack[i-1]] for i in range(len(stack)-1, 0, -1)]
```
时间复杂度 O(N)，712 ms
