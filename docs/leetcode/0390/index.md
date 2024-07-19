# 0390：消除游戏（★）


> <u>**[力扣第 390 题](https://leetcode.cn/problems/elimination-game/)**</u>

## 题目

<p>列表 <code>arr</code> 由在范围 <code>[1, n]</code> 中的所有整数组成，并按严格递增排序。请你对 <code>arr</code> 应用下述算法：</p>

<div class="original__bRMd">
<div>
<ul>
<li>从左到右，删除第一个数字，然后每隔一个数字删除一个，直到到达列表末尾。</li>
<li>重复上面的步骤，但这次是从右到左。也就是，删除最右侧的数字，然后剩下的数字每隔一个删除一个。</li>
<li>不断重复这两步，从左到右和从右到左交替进行，直到只剩下一个数字。</li>
</ul>

<p>给你整数 <code>n</code> ，返回 <code>arr</code> 最后剩下的数字。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 9
<strong>输出：</strong>6
<strong>解释：</strong>
arr = [<strong><em>1</em></strong>, 2, <em><strong>3</strong></em>, 4, <em><strong>5</strong></em>, 6, <em><strong>7</strong></em>, 8, <em><strong>9</strong></em>]
arr = [2, <em><strong>4</strong></em>, 6, <em><strong>8</strong></em>]
arr = [<em><strong>2</strong></em>, 6]
arr = [6]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>
</div>
</div>


**相似问题：**
- [2293：极大极小游戏（1241 分）](/leetcode/2293)


## 分析

容易想到递归：
- 令 dfs(n) 表示 n 个数字玩游戏剩下第几个
- 设初始数组 A，从左到右删除后转为求 B=A[1::2][::-1]
- 最终剩下的是 B 的第 dfs(n//2) 个，即 A[1::2] 的第 n//2+1-dfs(n//2) 个
- 再乘以 2 即是 A 中的序号

	
## 解答

```python
class Solution:
    def lastRemaining(self, n: int) -> int:
        def dfs(n):
            m = n//2
            return (m+1-dfs(m))*2 if m else 1
        return dfs(n)
```
37 ms

## *附加

也可以写成递推的形式。

```python
class Solution:
    def lastRemaining(self, n: int) -> int:
        res = 1
        for i in range(n.bit_length()-1,0,-1):
            res = ((n>>i)+1-res)*2
        return res
```
50 ms
