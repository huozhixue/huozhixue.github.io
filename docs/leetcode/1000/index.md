# 1000：合并石头的最低成本（2422 分）


> <u>**[力扣第 126 场周赛第 4 题](https://leetcode.cn/problems/minimum-cost-to-merge-stones/)**</u>

## 题目

<p>有 <code>n</code> 堆石头排成一排，第 <code>i</code> 堆中有 <code>stones[i]</code> 块石头。</p>

<p>每次 <strong>移动</strong> 需要将 <strong>连续的</strong> <code>k</code> 堆石头合并为一堆，而这次移动的成本为这 <code>k</code> 堆中石头的总数。</p>

<p>返回把所有石头合并成一堆的最低成本。如果无法合并成一堆，返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>stones = [3,2,4,1], K = 2
<strong>输出：</strong>20
<strong>解释：</strong>
从 [3, 2, 4, 1] 开始。
合并 [3, 2]，成本为 5，剩下 [5, 4, 1]。
合并 [4, 1]，成本为 5，剩下 [5, 5]。
合并 [5, 5]，成本为 10，剩下 [10]。
总成本 20，这是可能的最小值。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>stones = [3,2,4,1], K = 3
<strong>输出：</strong>-1
<strong>解释：</strong>任何合并操作后，都会剩下 2 堆，我们无法再进行合并。所以这项任务是不可能完成的。.
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>stones = [3,5,1,2,6], K = 3
<strong>输出：</strong>25
<strong>解释：</strong>
从 [3, 5, 1, 2, 6] 开始。
合并 [5, 1, 2]，成本为 8，剩下 [3, 8, 6]。
合并 [3, 8, 6]，成本为 17，剩下 [17]。
总成本 25，这是可能的最小值。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == stones.length</code></li>
<li><code>1 &lt;= n &lt;= 30</code></li>
<li><code>1 &lt;= stones[i] &lt;= 100</code></li>
<li><code>2 &lt;= k &lt;= 30</code></li>
</ul>


**相似问题：**
- [0312：戳气球](/leetcode/0312)
- [1167：连接木棍的最低费用（1481 分）](/leetcode/1167)


## 分析

### #1

- 考虑最后一步合并时，假如第1堆是区间 [0,a]
	- 区间 [0,a] 要合成1堆
	- 区间 [a+1,n-1] 要合成 k-1 堆
- 因此，令 dfs(i,j,x) 代表区间 [i,j] 合成 x 堆的最低成本，即可递归
-  n 堆要能合成 1 堆，必须满足 (n-1)%(k-1)=0，因此遍历 a 时，只用遍历 (j-i)//(k-1) 次
```python
class Solution:
    def mergeStones(self, stones: List[int], k: int) -> int:
        @cache
        def dfs(i,j,x):
            if i==j:
                return 0
            res = inf
            for a in range(i,j,k-1):
                res = min(res,dfs(i,a,1)+dfs(a+1,j,x-1 or k-1))
            if x==1:
                res += p[j+1]-p[i]
            return res

        n = len(stones)
        if (n-1)%(k-1):
            return -1
        p = list(accumulate([0]+stones))
        return dfs(0,n-1,1)
```
16 ms

### #2

- 注意到当 x>1 时，dfs(i,j,x) 的递推式是一样的
- 而 x=1 时，(j-i)%(k-1)=0
- 因此可以去掉 x 的参数，直接用 dfs(i,j) 递归
- 还可以改写成递推的形式

## 解答

```python
class Solution:
    def mergeStones(self, stones: List[int], k: int) -> int:
        n = len(stones)
        if (n-1)%(k-1):
            return -1
        p = list(accumulate([0]+stones))
        f = [[0]*n for _ in range(n)]
        for i in range(n-2,-1,-1):
            for j in range(i+1,n):
                f[i][j] = min(f[i][a]+f[a+1][j] for a in range(i,j,k-1))
                if (j-i)%(k-1)==0:
                    f[i][j] += p[j+1]-p[i]
        return f[0][-1]
```
7 ms

