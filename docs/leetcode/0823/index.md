# 0823：带因子的二叉树（1899 分）


> <u>**[力扣第 823 题](https://leetcode.cn/problems/binary-trees-with-factors/)**</u>

## 题目

<p>给出一个含有不重复整数元素的数组 <code>arr</code> ，每个整数 <code>arr[i]</code> 均大于 1。</p>

<p>用这些整数来构建二叉树，每个整数可以使用任意次数。其中：每个非叶结点的值应等于它的两个子结点的值的乘积。</p>

<p>满足条件的二叉树一共有多少个？答案可能很大，返回<strong> 对 </strong><code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> <code>arr = [2, 4]</code>
<strong>输出:</strong> 3
<strong>解释:</strong> 可以得到这些二叉树: <code>[2], [4], [4, 2, 2]</code></pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> <code>arr = [2, 4, 5, 10]</code>
<strong>输出:</strong> <code>7</code>
<strong>解释:</strong> 可以得到这些二叉树: <code>[2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2]</code>.</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr.length &lt;= 1000</code></li>
<li><code>2 &lt;= arr[i] &lt;= 10<sup>9</sup></code></li>
<li><code>arr</code> 中的所有值 <strong>互不相同</strong></li>
</ul>


## 分析

非叶节点显然大于子节点，于是考虑将 arr 排序，然后遍历 arr[j] 作为根节点的情况。

arr[j] 为根节点，然后遍历前面的 arr[i]，如果  arr[j]/arr[i] 也在 arr 中存在，即可转为递归子问题。

为了方便递归，令 dp[x] 代表根节点值为 x 的二叉树个数。x 的值稀疏，因此用哈希表存储。

## 解答

```python
def numFactoredBinaryTrees(self, arr: List[int]) -> int:
    res, mod = 0, 10**9+7
    d = defaultdict(lambda: 1)
    for x in sorted(arr):
        for y in list(d):
            if x%y==0 and x//y in d:
                d[x] = (d[x]+d[y]*d[x//y])%mod
        res = (res+d[x])%mod
    return res
```
240 ms

