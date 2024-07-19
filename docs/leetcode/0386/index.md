# 0386：字典序排数（★）


> <u>**[力扣第 386 题](https://leetcode.cn/problems/lexicographical-numbers/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，按字典序返回范围 <code>[1, n]</code> 内所有整数。</p>

<p>你必须设计一个时间复杂度为 <code>O(n)</code> 且使用 <code>O(1)</code> 额外空间的算法。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 13
<strong>输出：</strong>[1,10,11,12,13,2,3,4,5,6,7,8,9]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
</ul>




## 分析

### #1

观察知道字典排序和字符串排序是一样的，可直接调包。

```python
class Solution:
    def lexicalOrder(self, n: int) -> List[int]:
        return sorted(range(1,n+1), key=str)
```
48 ms

### #2

- 可以把字符串看作十叉树
- 字典排序即是树的前序遍历

## 解答

```python
    def lexicalOrder(self, n: int) -> List[int]:
        res = []
        sk = [0]
        while sk:
            u = sk.pop()
            res.append(u)
            sk.extend(u*10+i for i in range(9,-1,-1) if 0<u*10+i<=n)
        return res[1:]
```
129 ms



