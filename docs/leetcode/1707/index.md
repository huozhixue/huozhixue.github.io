# 1707：与数组中元素的最大异或值（★★★）


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


## 分析

基于 {{< lc "0421" >}} 可知，先构建二进制前缀的哈希表或字典树，
即可在 31 步内求得 x 与 nums 中元素的最大异或值。

但本题限制了每轮 nums 的范围，只能取不超过 mi 的元素，所以固定的哈希表或字典树不可行。

有个巧妙的想法是将 nums 排序，在动态地构建哈希表或字典树的过程中，
便得到了任意 mi 所对应的哈希表或字典树。

注意到这种方法得到的 queries 的答案并不是按 queries 的顺序依次得到的。这被称为离线查询。

这里用哈希表方法，更简单。

## 解答

```python
def maximizeXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
    def find(x):
        ans = 0
        for j in range(30, -1, -1):
            ans <<= 1
            ans += int((ans+1)^(x>>j) in A[j])
        return ans

    nums = sorted(set(nums))
    queries = sorted((m, idx, x) for idx, (x, m) in enumerate(queries))
    A = [set() for _ in range(31)]
    res, i = [0] * len(queries), 0
    for m, idx, x in queries:
        while i < len(nums) and nums[i] <= m:
            for j in range(31):
                A[j].add(nums[i] >> j)
            i += 1
        res[idx] = -1 if i==0 else find(x)
    return res
```
2632 ms

## *附加

字典树写法。

```python
def maximizeXor(self, nums: List[int], queries: List[List[int]]) -> List[int]:
    def find(x):
        ans, p = '', trie
        for bit in bin(x)[2:].zfill(31):
            bit_rev = str(int(bit)^1)
            ans += '1' if bit_rev in p else '0'
            p = p[bit_rev] if bit_rev in p else p[bit]
        return int(ans, 2)

    nums = sorted(set(nums))
    queries = sorted((m, idx, x) for idx, (x, m) in enumerate(queries))
    T = lambda: defaultdict(T)
    trie = T()
    res, i = [0] * len(queries), 0
    for m, idx, x in queries:
        while i < len(nums) and nums[i] <= m:
            val = bin(nums[i])[2:].zfill(31)
            reduce(dict.__getitem__, val, trie)
            i += 1
        res[idx] = -1 if i==0 else find(x)
    return res
```
4564 ms


