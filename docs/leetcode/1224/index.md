# 1224：最大相等频率（2050 分）


> <u>**[力扣第 158 场周赛第 4 题](https://leetcode.cn/problems/maximum-equal-frequency/)**</u>

## 题目

<p>给你一个正整数数组 <code>nums</code>，请你帮忙从该数组中找出能满足下面要求的 <strong>最长</strong> 前缀，并返回该前缀的长度：</p>

<ul>
<li>从前缀中 <strong>恰好删除一个</strong> 元素后，剩下每个数字的出现次数都相同。</li>
</ul>

<p>如果删除这个元素后没有剩余元素存在，仍可认为每个数字都具有相同的出现次数（也就是 0 次）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,1,1,5,3,3,5]
<strong>输出：</strong>7
<strong>解释：</strong>对于长度为 7 的子数组 [2,2,1,1,5,3,3]，如果我们从中删去 nums[4] = 5，就可以得到 [2,2,1,1,3,3]，里面每个数字都出现了两次。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1,2,2,2,3,3,3,4,4,4,5]
<strong>输出：</strong>13
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [2423：删除字符使频率相同（1648 分）](/leetcode/2423)
- [3212：统计 X 和 Y 频数相等的子矩阵数量](/leetcode/3212)


## 分析

### #1

- 维护每个数的次数，设当前的次数数组为 A
- 删除操作等价于从 A 选一个元素减 1
- 统计 A 的元素的频数，分类讨论
	- 假如元素种类>2，不可能满足
	- 假如元素种类=2，分别是 a,b
		- 要么 a=1 且 a 的频数为 1
		- 要么 a=b-1 且 b 的频数为 1
	- 假如元素种类=1，为 a
		- 要么 a=1，要么 a 的频数为 1
- 因此维护 A 的计数器即可（二重计数）

```python
class Solution:
    def maxEqualFreq(self, nums: List[int]) -> int:
        def check(cct):
            if len(cct)>2:
                return False
            if len(cct)==1:
                a,w = list(cct.items())[0]
                return a==1 or w==1
            a,b = sorted(cct)
            return a==cct[a]==1 or (a==b-1 and cct[b]==1)

        ct = defaultdict(int)
        cct = defaultdict(int)
        res = 0
        for i,x in enumerate(nums):
            a = ct[x]
            ct[x] += 1
            if a>0:
                cct[a] -= 1
                if not cct[a]:
                    del cct[a]
            cct[a+1] += 1
            if check(cct):
                res = i+1
        return res
```
199 ms

### #2

由于只求最长，可以倒序遍历到第一个符合的即可返回

## 解答

```python
class Solution:
    def maxEqualFreq(self, nums: List[int]) -> int:
        def check(cct):
            if len(cct)>2:
                return False
            if len(cct)==1:
                a,w = list(cct.items())[0]
                return a==1 or w==1
            a,b = sorted(cct)
            return a==cct[a]==1 or (a==b-1 and cct[b]==1)

        n = len(nums)
        ct = Counter(nums)
        cct = Counter(ct.values())
        for i in range(n-1,-1,-1):
            if check(cct):
                return i+1
            x = nums[i]
            a = ct[x]
            ct[x] -= 1
            cct[a] -= 1
            if not cct[a]:
                del cct[a]
            if a-1>0:
                cct[a-1] += 1
        return 0
```
32 ms

