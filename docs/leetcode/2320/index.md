# 2320：统计放置房子的方式数（1607 分）


> <u>**[力扣第 299 场周赛第 2 题](https://leetcode.cn/problems/count-number-of-ways-to-place-houses/)**</u>

## 题目

<p>一条街道上共有 <code>n * 2</code> 个 <strong>地块</strong> ，街道的两侧各有 <code>n</code> 个地块。每一边的地块都按从 <code>1</code> 到 <code>n</code> 编号。每个地块上都可以放置一所房子。</p>

<p>现要求街道同一侧不能存在两所房子相邻的情况，请你计算并返回放置房屋的方式数目。由于答案可能很大，需要对 <code>10<sup>9</sup> + 7</code> 取余后再返回。</p>

<p>注意，如果一所房子放置在这条街某一侧上的第 <code>i</code> 个地块，不影响在另一侧的第 <code>i</code> 个地块放置房子。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 1
<strong>输出：</strong>4
<strong>解释：</strong>
可能的放置方式：
1. 所有地块都不放置房子。
2. 一所房子放在街道的某一侧。
3. 一所房子放在街道的另一侧。
4. 放置两所房子，街道两侧各放置一所。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/05/12/arrangements.png" style="width: 500px; height: 500px;">
<pre><strong>输入：</strong>n = 2
<strong>输出：</strong>9
<strong>解释：</strong>如上图所示，共有 9 种可能的放置方式。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0070：爬楼梯](/leetcode/0070)
- [0198：打家劫舍](/leetcode/0198)


## 分析

- 两侧独立，只用统计一侧，再平方即可
- 按最后一个位置放不放即可递推

## 解答


```python
lass Solution:
    def countHousePlacements(self, n: int) -> int:
        mod = 10**9+7
        a,b = 1,1
        for _ in range(n):
            a,b = b,(a+b)%mod
        return b*b%mod
```
68 ms
