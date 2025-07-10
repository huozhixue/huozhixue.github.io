# 0793：阶乘函数后 K 个零（2100 分）


> <u>**[力扣第 793 题](https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function/)**</u>

## 题目

<p> <code>f(x)</code> 是 <code>x!</code> 末尾是 0 的数量。回想一下 <code>x! = 1 * 2 * 3 * ... * x</code>，且 <code>0! = 1</code> 。</p>

<ul>
<li>例如， <code>f(3) = 0</code> ，因为 <code>3! = 6</code> 的末尾没有 0 ；而 <code>f(11) = 2</code> ，因为 <code>11!= 39916800</code> 末端有 2 个 0 。</li>
</ul>

<p>给定 <code>k</code>，找出返回能满足 <code>f(x) = k</code> 的非负整数 <code>x</code> 的数量。</p>



<p><strong>示例 1：</strong><strong> </strong></p>

<pre>
<strong>输入：</strong>k = 0<strong>
输出：</strong>5<strong>
解释：</strong>0!, 1!, 2!, 3!, 和 4! 均符合 k = 0 的条件。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>k = 5
<strong>输出：</strong>0
<strong>解释：</strong>没有匹配到这样的 x!，符合 k = 5 的条件。</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> k = 3
<strong>输出:</strong> 5
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>0 &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0172：阶乘后的零](/leetcode/0172)


## 分析

- 显然 f(x) 递增，二分查找第一个满足 f(x)>=k+1 和第一个满足 f(x)>=k 的数，相减即可
- 计算 f(x) 即是 {{< lc "0172" >}}
## 解答


```python
class Solution:
    def preimageSizeFZF(self, k: int) -> int:
        def cal(x):
            res = 0
            while x:
                x //=5
                res += x
            return res
        
        def f(k):
            return bisect_left(range(5*k),k,key=cal)

        return f(k+1)-f(k)
```
4 ms

## *附加

还可以优化为 O(logk)：[数学推导 O((logk)^2) 的二分查找法与 O(logk) 的 5 进制贪心法](https://leetcode.cn/problems/preimage-size-of-factorial-zeroes-function/solutions/1780702/by-vclip-9quy/?envType=problem-list-v2&envId=0kfBxmwK)

```python
class Solution:
    def preimageSizeFZF(self, k: int) -> int:
        p = 1
        while (p*5-1)//4<=k:
            p *= 5
        while k:
            q,k = divmod(k,(p-1)//4)
            if q>=5:
                return 0
            p //= 5
        return 5
```
0 ms

