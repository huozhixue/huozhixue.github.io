# 1707：与数组中元素的最大异或值（2358 分）


> <u>**[力扣第 221 场周赛第 4 题](https://leetcode.cn/problems/maximum-xor-with-an-element-from-array/)**</u>

## 题目

<p>给你一个由非负整数组成的数组 <code>nums</code> 。另有一个查询数组 <code>queries</code> ，其中 <code>queries[i] = [x<sub>i</sub>, m<sub>i</sub>]</code> 。</p>

<p>第 <code>i</code> 个查询的答案是 <code>x<sub>i</sub></code> 和任何 <code>nums</code> 数组中不超过 <code>m<sub>i</sub></code> 的元素按位异或（<code>XOR</code>）得到的最大值。换句话说，答案是 <code>max(nums[j] XOR x<sub>i</sub>)</code> ，其中所有 <code>j</code> 均满足 <code>nums[j] &lt;= m<sub>i</sub></code> 。如果 <code>nums</code> 中的所有元素都大于 <code>m<sub>i</sub></code>，最终答案就是 <code>-1</code> 。</p>

<p>返回一个整数数组<em> </em><code>answer</code><em> </em>作为查询的答案，其中<em> </em><code>answer.length == queries.length</code><em> </em>且<em> </em><code>answer[i]</code><em> </em>是第<em> </em><code>i</code><em> </em>个查询的答案。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
<strong>输出：</strong>[3,3,7]
<strong>解释：</strong>
1) 0 和 1 是仅有的两个不超过 1 的整数。0 XOR 3 = 3 而 1 XOR 3 = 2 。二者中的更大值是 3 。
2) 1 XOR 2 = 3.
3) 5 XOR 2 = 7.
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
<strong>输出：</strong>[15,-1,5]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length, queries.length &lt;= 10<sup>5</sup></code></li>
<li><code>queries[i].length == 2</code></li>
<li><code>0 &lt;= nums[j], x<sub>i</sub>, m<sub>i</sub> &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0421：数组中两个数的最大异或值](/leetcode/0421)
- [1938：查询最大基因差（2502 分）](/leetcode/1938)
- [2429：最小异或（1532 分）](/leetcode/2429)
- [2932：找出强数对的最大异或值 I（1246 分）](/leetcode/2932)
- [2935：找出强数对的最大异或值 II（2348 分）](/leetcode/2935)


## 分析

-  {{< lc "0421" >}} 升级版，区别是只查询 <=m 的元素
- 一种常用的方法是将查询和元素都排序，保证整个查询过程中元素只加不减
- 在这个过程中，动态构建哈希表或字典树，即转为 {{< lc "0421" >}} 

## 解答

```python
class Solution:
    def maximizeXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        L = max(nums+[x for x,_ in queries]).bit_length()
        T = [set() for _ in range(L)]
        nums.sort()
        j = 0
        res = [-1]*len(queries)
        for i,(x,m) in sorted(enumerate(queries),key=lambda p:p[1][1]):
            while j<len(nums) and nums[j]<=m:
                for k in range(L):
                    T[k].add(nums[j]>>k)
                j += 1
            if j:
                y = 0
                for k in range(L-1,-1,-1):
                    y <<= 1
                    y += (y+1)^(x>>k) in T[k]
                res[i] = y
        return res
```
1565 ms

## *附加

字典树写法。

```python
class BitTrie:
    def __init__(self,n,L):                       # 插入总长度 n-1、最长 L 的二进制串
        self.t = [[0]*n for _ in range(2)]        # 模拟树节点
        self.i = 0
        self.L = L

    def add(self, x):
        p = 0
        for j in range(self.L-1, -1, -1):
            bit = (x>>j)&1
            if not self.t[bit][p]:
                self.i += 1
                self.t[bit][p] = self.i  
            p = self.t[bit][p]

    def maxxor(self,x):
        p = 0
        res = 0
        for j in range(self.L-1, -1, -1):
            bit = (x>>j)&1
            if self.t[bit^1][p]:
                res |= 1 << j
                bit ^= 1
            p = self.t[bit][p]
        return res

class Solution:
    def maximizeXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        L = max(nums+[x for x,_ in queries]).bit_length()
        trie = BitTrie(len(nums)*L+1,L)
        nums.sort()
        j = 0
        res = [-1]*len(queries)
        for i,(x,m) in sorted(enumerate(queries),key=lambda p:p[1][1]):
            while j<len(nums) and nums[j]<=m:
                trie.add(nums[j])
                j += 1
            if j:
                res[i] = trie.maxxor(x)
        return res
```
1753 ms


