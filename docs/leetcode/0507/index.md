# 0507：完美数


> <u>**[力扣第 507 题](https://leetcode.cn/problems/perfect-number/)**</u>

## 题目

<p>对于一个 <strong>正整数</strong>，如果它和除了它自身以外的所有 <strong>正因子</strong> 之和相等，我们称它为 <strong>「完美数」</strong>。</p>

<p>给定一个 <strong>整数 </strong><code>n</code>， 如果是完美数，返回 <code>true</code>；否则返回 <code>false</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>num = 28
<strong>输出：</strong>true
<strong>解释：</strong>28 = 1 + 2 + 4 + 7 + 14
1, 2, 4, 7, 和 14 是 28 的所有正因子。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>num = 7
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= num &lt;= 10<sup>8</sup></code></li>
</ul>


## 分析

### #1

遍历拿到因子即可。注意到除了完全平方数的根以外，因子都是成对出现的，因此只需遍历到 int(sqrt(num))。

```python
    def checkPerfectNumber(self, num: int) -> bool:
        x = int(sqrt(num))
        s = 1 + sum(i+num//i for i in range(2, x+1) if num%i==0)
        s -= x if x*x==num else 0
        return s == num
```

56 ms

### #2

完美数很少，根据计算在 32 位以内的完美数只有 5 个，因此可以直接判断。

## 解答

```python
def checkPerfectNumber(self, num: int) -> bool:
	return num in [6, 28, 496, 8128, 33550336]
```

36 ms
