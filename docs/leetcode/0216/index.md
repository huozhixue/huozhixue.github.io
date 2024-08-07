# 0216：组合总和 III（★）


> <u>**[力扣第 216 题](https://leetcode.cn/problems/combination-sum-iii/)**</u>

## 题目

<p>找出所有相加之和为 <code>n</code><em> </em>的 <code>k</code><strong> </strong>个数的组合，且满足下列条件：</p>

<ul>
<li>只使用数字1到9</li>
<li>每个数字 <strong>最多使用一次</strong> </li>
</ul>

<p>返回 <em>所有可能的有效组合的列表</em> 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> <em><strong>k</strong></em> = 3, <em><strong>n</strong></em> = 7
<strong>输出:</strong> [[1,2,4]]
<strong>解释:</strong>
1 + 2 + 4 = 7
没有其他符合的组合了。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> <em><strong>k</strong></em> = 3, <em><strong>n</strong></em> = 9
<strong>输出:</strong> [[1,2,6], [1,3,5], [2,3,4]]
<strong>解释:
</strong>1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
没有其他符合的组合了。</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> k = 4, n = 1
<strong>输出:</strong> []
<strong>解释:</strong> 不存在有效的组合。
在[1,9]范围内使用4个不同的数字，我们可以得到的最小和是1+2+3+4 = 10，因为10 &gt; 1，没有有效的组合。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>2 &lt;= k &lt;= 9</code></li>
<li><code>1 &lt;= n &lt;= 60</code></li>
</ul>


**相似问题：**
- [0039：组合总和](/leetcode/0039)


## 分析

类似 {{< lc "0077" >}} ，添加和的限制即可。

## 解答

```python
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        def dfs(i,s):
            if i>9 or len(path)==k or s>=n:
                if len(path)==k and s==n:
                    res.append(path[:])
                return
            dfs(i+1,s)
            path.append(i)
            dfs(i+1,s+i)
            path.pop()
        res,path = [],[]
        dfs(1,0)
        return res
```
30 ms



