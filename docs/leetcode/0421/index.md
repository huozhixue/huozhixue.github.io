# 0421：数组中两个数的最大异或值（★）


> <u>**[力扣第 421 题](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，返回<em> </em><code>nums[i] XOR nums[j]</code> 的最大运算结果，其中 <code>0 ≤ i ≤ j &lt; n</code> 。</p>



<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3,10,5,25,2,8]
<strong>输出：</strong>28
<strong>解释：</strong>最大运算结果是 5 XOR 25 = 28.</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [14,70,53,83,49,91,36,80,92,51,66,70]
<strong>输出：</strong>127
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>
</div>
</div>


## 分析

### #1

经典的位运算问题，可以采用试填法：
- 为了使结果最大，应该尽可能让二进制的高位取 1
- 假如前 k-1 位能取到的最大值为 M，接下来要使前 k位尽量取到 M'=(M<<1)+1
- 假设有两个数的 k 位前缀 x、y 满足 x^y=M'，M' 即能取到
- 根据异或的重要性质：如果 x^y=M'，那么 M'^x=y
- 因此将 k 位前缀保存在哈希表中，遍历判断即可


```python
class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        L = max(nums).bit_length()
        res = 0
        for j in range(L-1,-1,-1):
            res <<= 1
            vis = {x>>j for x in nums}
            res += any(x^(res+1) in vis for x in vis)
        return res
```
611 ms

### #2

- 更通用的方法是用 01 字典树
- 将每个数的二进制串插入字典树
- 然后对于每个数，查找最大的异或结果，依然是试填法
	- 假如第 k 位为 bit，bit^1 在字典树中，那么该位可以取 1，并且树中往 bit^1 走
	- 否则该位取 0，字典树中往 bit 走
-  01 字典树用数组形式可以优化时间


## 解答

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
    def findMaximumXOR(self, nums: List[int]) -> int:
        L = max(nums).bit_length()
        trie = BitTrie(len(nums)*L+1,L)
        res = 0
        for x in nums:
            trie.add(x)
            res = max(res,trie.maxxor(x))
        return res
```
3025 ms




