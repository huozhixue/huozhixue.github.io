# 0625：最小因式分解（★）


> <u>**[力扣第 625 题](https://leetcode.cn/problems/minimum-factorization/)**</u>

## 题目

<p>给定一个正整数 <code>a</code>，找出最小的正整数 <code>b</code> 使得 <code>b</code> 的所有数位相乘恰好等于 <code>a</code>。</p>

<p>如果不存在这样的结果或者结果不是 32 位有符号整数，返回 0。</p>



<p><strong>样例 1</strong></p>

<p>输入：</p>

<pre>48
</pre>

<p>输出：</p>

<pre>68</pre>



<p><strong>样例 2</strong></p>

<p>输入：</p>

<pre>15
</pre>

<p>输出：</p>

<pre>35</pre>




## 分析

## 解答

```python
    def smallestFactorization(self, num: int) -> int:
        res = ''
        for x in range(9, 1, -1):
            while num % x == 0:
                num //= x
                res += str(x)
        if num != 1:
            return 0
        res = int(res[::-1]) if res else 1
        return res if res < 2**31 else 0
```

24 ms
