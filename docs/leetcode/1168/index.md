# 1168：水资源分配优化（★★）


> <u>**[力扣第 7 场双周赛第 4 题](https://leetcode.cn/problems/optimize-water-distribution-in-a-village/)**</u>

## 题目

<p>村里面一共有 <code>n</code> 栋房子。我们希望通过建造水井和铺设管道来为所有房子供水。</p>

<p>对于每个房子 <code>i</code>，我们有两种可选的供水方案：一种是直接在房子内建造水井，成本为 <code>wells[i - 1]</code> （注意 <code>-1</code> ，因为 <strong>索引从0开始</strong> ）；另一种是从另一口井铺设管道引水，数组 <code>pipes</code> 给出了在房子间铺设管道的成本，其中每个 <code>pipes[j] = [house1<sub>j</sub>, house2<sub>j</sub>, cost<sub>j</sub>]</code> 代表用管道将 <code>house1<sub>j</sub></code> 和 <code>house2<sub>j</sub></code>连接在一起的成本。连接是双向的。</p>

<p>请返回 <em>为所有房子都供水的最低总成本</em> 。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/08/23/1359_ex1.png" /></strong></p>

<pre>
<strong>输入：</strong>n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
<strong>输出：</strong>3
<strong>解释： </strong>
上图展示了铺设管道连接房屋的成本。
最好的策略是在第一个房子里建造水井（成本为 1），然后将其他房子铺设管道连起来（成本为 2），所以总成本为 3。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2, wells = [1,1], pipes = [[1,2,1]]
<strong>输出：</strong>2
<strong>解释：</strong>我们可以用以下三种方法中的一种来提供低成本的水:
选项1:
在1号房子里面建一口井，成本为1
在房子2内建造井，成本为1
总成本是2。
选项2:
在1号房子里面建一口井，成本为1
-花费1连接房子2和房子1。
总成本是2。
选项3:
在房子2内建造井，成本为1
-花费1连接房子1和房子2。
总成本是2。
注意，我们可以用cost 1或cost 2连接房子1和房子2，但我们总是选择最便宜的选项。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>wells.length == n</code></li>
<li><code>0 &lt;= wells[i] &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= pipes.length &lt;= 10<sup>4</sup></code></li>
<li><code>pipes[j].length == 3</code></li>
<li><code>1 &lt;= house1<sub>j</sub>, house2<sub>j</sub> &lt;= n</code></li>
<li><code>0 &lt;= cost<sub>j</sub> &lt;= 10<sup>5</sup></code></li>
<li><code>house1<sub>j</sub> != house2<sub>j</sub></code></li>
</ul>


## 分析

- 设一个虚拟节点 0 代表水，房子造井看作是铺设了到节点 0 的管道
- 转为求最小生成树问题，用并查集即可

## 解答

```python
class Solution:
    def minCostToSupplyWater(self, n: int, wells: List[int], pipes: List[List[int]]) -> int:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        pipes.extend([0, i+1, w] for i, w in enumerate(wells))
        res, f = 0, list(range(n+1))
        for x, y, w in sorted(pipes, key=lambda x: x[-1]):
            fx, fy = find(x), find(y)
            if fx != fy:
                f[fx] = fy
                res += w
        return res
```

140 ms
