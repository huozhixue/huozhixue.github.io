# 0420：强密码检验器（★★）


> <u>**[力扣第 420 题](https://leetcode.cn/problems/strong-password-checker/)**</u>

## 题目

<p>满足以下条件的密码被认为是强密码：</p>

<ul>
<li>由至少 <code>6</code> 个，至多 <code>20</code> 个字符组成。</li>
<li>包含至少 <strong>一个小写 </strong>字母，至少 <strong>一个大写</strong> 字母，和至少 <strong>一个数字</strong> 。</li>
<li>不包含连续三个重复字符 (比如 <code>"B<em><strong>aaa</strong></em>bb0"</code> 是弱密码, 但是 <code>"B<em><strong>aa</strong></em>b<em><strong>a</strong></em>0"</code> 是强密码)。</li>
</ul>

<p>给你一个字符串 <code>password</code> ，返回 <em>将 <code>password</code> 修改到满足强密码条件需要的最少修改步数。如果 <code>password</code> 已经是强密码，则返回 <code>0</code> 。</em></p>

<p>在一步修改操作中，你可以：</p>

<ul>
<li>插入一个字符到 <code>password</code> ，</li>
<li>从 <code>password</code> 中删除一个字符，或</li>
<li>用另一个字符来替换 <code>password</code> 中的某个字符。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>password = "a"
<strong>输出：</strong>5
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>password = "aA1"
<strong>输出：</strong>3
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>password = "1337C0d3"
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= password.length &lt;= 50</code></li>
<li><code>password</code> 由字母、数字、点 <code>'.'</code> 或者感叹号 <code>'!'</code> 组成</li>
</ul>


## 分析

先得到必须补充的字符个数 lack，然后按密码长度 n 分类讨论：
- n<6，可以再按 n==5 和 n<5 分类考虑，结果都满足 max(6-n, lack)
- 6<=n<=20，对于任一连续段长度 a，用 a//3 步替换操作即可满足条件“同一字符不连续出现三次 ”，最后取 max(替换操作, lack)即可。
- n>20，必须进行删除操作。
  - 优先删除连续段的字符，而且优先删除长度 a%3==0 的连续段，从而减少之后的替换操作。
  - 于是考虑用堆，每轮选 a%3 最小的 a 进行删除操作，直到没有连续段长度 >=3 或 n==20 为止。
  - 删除完成后，就转为上一情况了。


## 解答


```python
def strongPasswordChecker(self, password: str) -> int:
    n = len(password)
    lack = 3 - sum(bool(re.search(reg, password)) for reg in ['[a-z]', '[A-Z]', '[0-9]'])
    if n < 6:
        return max(6-n, lack)
    pq = []
    for _, g in groupby(password):
        a = len(list(g))
        if a>=3:
            heappush(pq, (a%3, a))
    res = 0
    while pq and n>20:
        _, a = heappop(pq)
        if a>3:
            heappush(pq, ((a-1)%3, a-1))
        n -= 1
        res += 1
    return res + max(0, n-20) + max(sum(a//3 for _, a in pq), lack)
````
24 ms
