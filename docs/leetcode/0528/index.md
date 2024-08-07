# 0528：按权重随机选择（★）


> <u>**[力扣第 528 题](https://leetcode.cn/problems/random-pick-with-weight/)**</u>

## 题目

<p>给你一个 <strong>下标从 0 开始</strong> 的正整数数组 <code>w</code> ，其中 <code>w[i]</code> 代表第 <code>i</code> 个下标的权重。</p>

<p>请你实现一个函数 <code>pickIndex</code> ，它可以 <strong>随机地</strong> 从范围 <code>[0, w.length - 1]</code> 内（含 <code>0</code> 和 <code>w.length - 1</code>）选出并返回一个下标。选取下标 <code>i</code> 的 <strong>概率</strong> 为 <code>w[i] / sum(w)</code> 。</p>

<ol>
</ol>

<ul>
<li>例如，对于 <code>w = [1, 3]</code>，挑选下标 <code>0</code> 的概率为 <code>1 / (1 + 3) = 0.25</code> （即，25%），而选取下标 <code>1</code> 的概率为 <code>3 / (1 + 3) = 0.75</code>（即，<code>75%</code>）。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>
["Solution","pickIndex"]
[[[1]],[]]
<strong>输出：</strong>
[null,0]
<strong>解释：</strong>
Solution solution = new Solution([1]);
solution.pickIndex(); // 返回 0，因为数组中只有一个元素，所以唯一的选择是返回下标 0。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
<strong>输出：</strong>
[null,1,1,1,1,0]
<strong>解释：</strong>
Solution solution = new Solution([1, 3]);
solution.pickIndex(); // 返回 1，返回下标 1，返回该下标概率为 3/4 。
solution.pickIndex(); // 返回 1
solution.pickIndex(); // 返回 1
solution.pickIndex(); // 返回 1
solution.pickIndex(); // 返回 0，返回下标 0，返回该下标概率为 1/4 。

由于这是一个随机问题，允许多个答案，因此下列输出都可以被认为是正确的:
[null,1,1,1,1,0]
[null,1,1,1,1,1]
[null,1,1,1,0,0]
[null,1,1,1,0,1]
[null,1,0,1,0,0]
......
诸若此类。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= w.length &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= w[i] &lt;= 10<sup>5</sup></code></li>
<li><code>pickIndex</code> 将被调用不超过 <code>10<sup>4</sup></code> 次</li>
</ul>


**相似问题：**
- [0398：随机数索引](/leetcode/0398)
- [0710：黑名单中的随机数](/leetcode/0710)
- [0497：非重叠矩形中的随机点](/leetcode/0497)


## 分析

- 每个下标映射到连续区间
- 从总区间随机选个数，二分判断属于哪个区间即可
## 解答

```python
class Solution:

    def __init__(self, w: List[int]):
        self.p = list(accumulate([0]+w))


    def pickIndex(self) -> int:
        x = randrange(self.p[-1])
        return bisect_right(self.p,x)-1
```
135 ms
