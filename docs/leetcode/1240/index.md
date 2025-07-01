# 1240：铺瓷砖（2241 分）


> <u>**[力扣第 160 场周赛第 4 题](https://leetcode.cn/problems/tiling-a-rectangle-with-the-fewest-squares/)**</u>

## 题目

<p>给定一个大小为 <code>n</code> x <code>m</code> 的长方形，返回贴满矩形所需的整数边正方形的最小数量。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/10/25/sample_11_1592.png" style="height: 106px; width: 154px;" /></p>

<pre>
<strong>输入：</strong>n = 2, m = 3
<strong>输出：</strong>3
<code><strong>解释：</strong>需要<strong> </strong>3</code> 个正方形来覆盖长方形。
<code>     2</code> 个 <code>1x1 的正方形</code>
<code>     1</code> 个 <code>2x2 的正方形</code></pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/10/25/sample_22_1592.png" style="height: 126px; width: 224px;" /></p>

<pre>
<strong>输入：</strong>n = 5, m = 8
<strong>输出：</strong>5
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/10/25/sample_33_1592.png" style="height: 189px; width: 224px;" /></p>

<pre>
<strong>输入：</strong>n = 11, m = 13
<strong>输出：</strong>6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n, m &lt;= 13</code></li>
</ul>


**相似问题：**
- [2312：卖木头块（2363 分）](/leetcode/2312)


## 分析

- 遍历空格子，尝试放正方形，回溯即可
- 朴素回溯会超时，有两种剪枝方法
	- 先计算一个上界
		- 比如若 m>n，直接放一个 n*n 的正方形，递归计算一个解
		- 回溯时超过上界即中断
	- 尝试放正方形时，从大到小放
		- 同样的，回溯时超过上界即中断
- 这里采用第二种，速度更快
## 解答


```python
```python
class Solution:
    def tilingRectangle(self, n: int, m: int) -> int:
        g = [[0]*n for _ in range(m)]
        res = inf
        def dfs(i,j,k):
            nonlocal res
            if k>=res or i==m:
                res = min(res,k)
                return
            if j==n:
                dfs(i+1,0,k)
                return
            if g[i][j]:
                dfs(i,j+1,k)
                return
            a = next(a for a in range(n+1) if i+a>=m or j+a>=n or g[i][j+a])
            for x in range(i,i+a):
                for y in range(j,j+a):
                    g[x][y] = 1
            for b in range(a,0,-1):
                dfs(i,j+b,k+1)
                for x in range(i,i+b):
                    g[x][j+b-1] = 0
                for y in range(j,j+b):
                    g[i+b-1][y] = 0
        dfs(0,0,0)
        return res
```

87 ms
