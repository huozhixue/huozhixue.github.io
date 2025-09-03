# 2927：给小朋友们分糖果 III（★★）


> <u>**[力扣第 2927 题](https://leetcode.cn/problems/distribute-candies-among-children-iii/)**</u>

## 题目

<p>你被给定两个正整数 <code>n</code> 和 <code>limit</code>。</p>

<p>返回 <em>在每个孩子得到不超过 </em><code>limit</code><em> 个糖果的情况下，将</em> <code>n</code> <em>个糖果分发给</em> <code>3</code> <em>个孩子的 <strong>总方法数</strong>。</em></p>



<p><b>示例 1:</b></p>

<pre>
<b>输入：</b>n = 5, limit = 2
<b>输出：</b>3
<b>解释：</b>有 3 种方式将 5 个糖果分发给 3 个孩子，使得每个孩子得到不超过 2 个糖果：(1, 2, 2), (2, 1, 2) 和 (2, 2, 1)。
</pre>

<p><b>示例 2:</b></p>

<pre>
<b>输入：</b>n = 3, limit = 3
<b>输出：</b>10
<b>解释：</b>有 10 种方式将 3 个糖果分发给 3 个孩子，使得每个孩子得到不超过 3 个糖果：(0, 0, 3), (0, 1, 2), (0, 2, 1), (0, 3, 0), (1, 0, 2), (1, 1, 1), (1, 2, 0), (2, 0, 1), (2, 1, 0) 和 (3, 0, 0)。
</pre>



<p><b>提示：</b></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>8</sup></code></li>
<li><code>1 &lt;= limit &lt;= 10<sup>8</sup></code></li>
</ul>




## 分析

典型的容斥
## 解答


```python
def f2(x):
    return x*(x-1)//2 if x>1 else 0

class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        return f2(n+2)-3*f2(n-limit+1)+3*f2(n-limit*2)-f2(n-limit*3-1)
```
0 ms
