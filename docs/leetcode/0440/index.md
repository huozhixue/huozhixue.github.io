# 0440：字典序的第K小数字（★★）


> <u>**[力扣第 440 题](https://leetcode.cn/problems/k-th-smallest-in-lexicographical-order/)**</u>

## 题目

<p>给定整数 <code>n</code> 和 <code>k</code>，返回  <code>[1, n]</code> 中字典序第 <code>k</code> 小的数字。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>n = 13, k = 2
<strong>输出: </strong>10
<strong>解释: </strong>字典序的排列是 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]，所以第二小的数字是 10。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 1, k = 1
<strong>输出:</strong> 1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

- 采用试填法，先考虑首位：
	- 统计 [1,n] 中首位 1 的个数 w
	- 如果 w>=k，首位即是 1
	- 如果 w<k，更新 k-=w，继续试填 2
	- 依此类推确定首位为 a
- 接着考虑第二位：
	- 如果 k=1，说明 a 即为所求，没有第二位
	- 否则，更新 k-=1，第二位试填 0
	- 接着要统计 [1,n] 中前缀为 a0 的个数
	- 后面依此类推
- 综上，每一步试填需要计算 [1,n] 中前缀 p 的个数
	- 可以采用分段计数
	- 分别计算 p 后面跟 0 位、1 位、2 位等的个数即可
## 解答

```python
class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        def cal(p):
            res, w = 0, 1
            while p<=n:
                res += min(w,n-p+1)
                p *= 10
                w *= 10
            return res

        res = 1
        while k>1:
            w = cal(res)
            if w < k:
                k -= w
                res += 1
            else:
                k -= 1
                res *= 10
        return res
```
38 ms
