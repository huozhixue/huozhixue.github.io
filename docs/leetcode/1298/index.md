# 1298：你能从盒子里获得的最大糖果数（1824 分）


> <u>**[力扣第 168 场周赛第 4 题](https://leetcode.cn/problems/maximum-candies-you-can-get-from-boxes/)**</u>

## 题目

<p>给你 <code>n</code> 个盒子，每个盒子的格式为 <code>[status, candies, keys, containedBoxes]</code> ，其中：</p>

<ul>
<li>状态字 <code>status[i]</code>：整数，如果 <code>box[i]</code> 是开的，那么是 <strong>1 </strong>，否则是 <strong>0 </strong>。</li>
<li>糖果数 <code>candies[i]</code>: 整数，表示 <code>box[i]</code> 中糖果的数目。</li>
<li>钥匙 <code>keys[i]</code>：数组，表示你打开 <code>box[i]</code> 后，可以得到一些盒子的钥匙，每个元素分别为该钥匙对应盒子的下标。</li>
<li>内含的盒子 <code>containedBoxes[i]</code>：整数，表示放在 <code>box[i]</code> 里的盒子所对应的下标。</li>
</ul>

<p>给你一个 <code>initialBoxes</code> 数组，表示你现在得到的盒子，你可以获得里面的糖果，也可以用盒子里的钥匙打开新的盒子，还可以继续探索从这个盒子里找到的其他盒子。</p>

<p>请你按照上述规则，返回可以获得糖果的 <strong>最大数目 </strong>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>status = [1,0,1,0], candies = [7,5,4,100], keys = [[],[],[1],[]], containedBoxes = [[1,2],[3],[],[]], initialBoxes = [0]
<strong>输出：</strong>16
<strong>解释：
</strong>一开始你有盒子 0 。你将获得它里面的 7 个糖果和盒子 1 和 2。
盒子 1 目前状态是关闭的，而且你还没有对应它的钥匙。所以你将会打开盒子 2 ，并得到里面的 4 个糖果和盒子 1 的钥匙。
在盒子 1 中，你会获得 5 个糖果和盒子 3 ，但是你没法获得盒子 3 的钥匙所以盒子 3 会保持关闭状态。
你总共可以获得的糖果数目 = 7 + 4 + 5 = 16 个。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>status = [1,0,0,0,0,0], candies = [1,1,1,1,1,1], keys = [[1,2,3,4,5],[],[],[],[],[]], containedBoxes = [[1,2,3,4,5],[],[],[],[],[]], initialBoxes = [0]
<strong>输出：</strong>6
<strong>解释：
</strong>你一开始拥有盒子 0 。打开它你可以找到盒子 1,2,3,4,5 和它们对应的钥匙。
打开这些盒子，你将获得所有盒子的糖果，所以总糖果数为 6 个。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>status = [1,1,1], candies = [100,1,100], keys = [[],[0,2],[]], containedBoxes = [[],[],[]], initialBoxes = [1]
<strong>输出：</strong>1
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>status = [1], candies = [100], keys = [[]], containedBoxes = [[]], initialBoxes = []
<strong>输出：</strong>0
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>status = [1,1,1], candies = [2,3,2], keys = [[],[],[]], containedBoxes = [[],[],[]], initialBoxes = [2,1,0]
<strong>输出：</strong>7
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= status.length &lt;= 1000</code></li>
<li><code>status.length == candies.length == keys.length == containedBoxes.length == n</code></li>
<li><code>status[i]</code> 要么是 <code>0</code> 要么是 <code>1</code> 。</li>
<li><code>1 &lt;= candies[i] &lt;= 1000</code></li>
<li><code>0 &lt;= keys[i].length &lt;= status.length</code></li>
<li><code>0 &lt;= keys[i][j] &lt; status.length</code></li>
<li><code>keys[i]</code> 中的值都是互不相同的。</li>
<li><code>0 &lt;= containedBoxes[i].length &lt;= status.length</code></li>
<li><code>0 &lt;= containedBoxes[i][j] &lt; status.length</code></li>
<li><code>containedBoxes[i]</code> 中的值都是互不相同的。</li>
<li>每个盒子最多被一个盒子包含。</li>
<li><code>0 &lt;= initialBoxes.length &lt;= status.length</code></li>
<li><code>0 &lt;= initialBoxes[i] &lt; status.length</code></li>
</ul>




## 分析

- bfs 遍历已有的打开的箱子，并维护所有已有的箱子
- 拿到钥匙时，将对应箱子的状态改为打开即可
- 针对新的钥匙和箱子，同时满足 (已有，打开，没遍历过) 即可入队

## 解答


```python
class Solution:
    def maxCandies(self, status: List[int], candies: List[int], keys: List[List[int]], containedBoxes: List[List[int]], initialBoxes: List[int]) -> int:
        Q = deque(u for u in initialBoxes if status[u])
        vis,B = set(Q),set(initialBoxes)
        res = 0
        while Q:
            u = Q.popleft()
            res += candies[u]
            for v in keys[u]:
                status[v] = 1
                if v in B and v not in vis:
                    Q.append(v)
                    vis.add(v)
            for v in containedBoxes[u]:
                B.add(v)
                if status[v] and v not in vis:
                    Q.append(v)
                    vis.add(v)
        return res
```
27 ms
