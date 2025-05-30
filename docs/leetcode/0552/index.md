# 0552：学生出勤记录 II（★★）


> <u>**[力扣第 552 题](https://leetcode.cn/problems/student-attendance-record-ii/)**</u>

## 题目

可以用字符串表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况（缺勤、迟到、到场）。记录中只含下面三种字符：
<ul>
<li><code>'A'</code>：Absent，缺勤</li>
<li><code>'L'</code>：Late，迟到</li>
<li><code>'P'</code>：Present，到场</li>
</ul>

<p>如果学生能够 <strong>同时</strong> 满足下面两个条件，则可以获得出勤奖励：</p>

<ul>
<li>按 <strong>总出勤</strong> 计，学生缺勤（<code>'A'</code>）<strong>严格</strong> 少于两天。</li>
<li>学生 <strong>不会</strong> 存在 <strong>连续</strong> 3 天或 <strong>连续</strong> 3 天以上的迟到（<code>'L'</code>）记录。</li>
</ul>

<p>给你一个整数 <code>n</code> ，表示出勤记录的长度（次数）。请你返回记录长度为 <code>n</code> 时，可能获得出勤奖励的记录情况 <strong>数量</strong> 。答案可能很大，所以返回对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>8
<strong>解释：
</strong>有 8 种长度为 2 的记录将被视为可奖励：
"PP" , "AP", "PA", "LP", "PL", "AL", "LA", "LL"
只有"AA"不会被视为可奖励，因为缺勤次数为 2 次（需要少于 2 次）。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>3
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 10101
<strong>输出：</strong>183236316
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0551：学生出勤记录 I](/leetcode/0551)


## 分析

- 按最后一个字符递推
- 令 f[i][j][k] 代表长度 i，有 j 个 'A' 且末尾 k 个连续 'L' 的个数，即可递推
- 可以用滚动数组优化掉 i，还可以将 j 和 k 合并为一维

## 解答

```python
class Solution:
    def checkRecord(self, n: int) -> int:
        mod = 10**9+7
        f = [1,0,0,0,0,0]
        for _ in range(n):
            f = [sum(f[:3])%mod,f[0],f[1],sum(f)%mod,f[3],f[4]]
        return sum(f)%mod
```
550 ms

## *附加

- 这是完全的线性递推关系，还可以用矩阵快速幂优化

```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat, n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res

class Solution:
    def checkRecord(self, n: int) -> int:
        A = [[1,1,1,0,0,0],[1,0,0,0,0,0],[0,1,0,0,0,0],
             [1,1,1,1,1,1],[0,0,0,1,0,0],[0,0,0,0,1,0]]
        f = [[1],[0],[0],[0],[0],[0]]
        f = mul(mpow(A,n),f)
        return sum(a[0] for a in f)%mod
```
19 ms
