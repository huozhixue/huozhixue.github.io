# 1231：分享巧克力（★★）


> <u>**[力扣第 11 场双周赛第 4 题](https://leetcode.cn/problems/divide-chocolate/)**</u>

## 题目

<p>你有一大块巧克力，它由一些甜度不完全相同的小块组成。我们用数组 <code>sweetness</code> 来表示每一小块的甜度。</p>

<p>你打算和 <code>K</code> 名朋友一起分享这块巧克力，所以你需要将切割 <code>K</code> 次才能得到 <code>K+1</code> 块，每一块都由一些 <strong>连续 </strong>的小块组成。</p>

<p>为了表现出你的慷慨，你将会吃掉 <strong>总甜度最小</strong> 的一块，并将其余几块分给你的朋友们。</p>

<p>请找出一个最佳的切割策略，使得你所分得的巧克力 <strong>总甜度最大</strong>，并返回这个 <strong>最大总甜度</strong>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>sweetness = [1,2,3,4,5,6,7,8,9], K = 5
<strong>输出：</strong>6
<strong>解释：</strong>你可以把巧克力分成 [1,2,3], [4,5], [6], [7], [8], [9]。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>sweetness = [5,6,7,8,9,1,2,3,4], K = 8
<strong>输出：</strong>1
<strong>解释：</strong>只有一种办法可以把巧克力分成 9 块。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>sweetness = [1,2,2,1,2,2,1,2,2], K = 2
<strong>输出：</strong>5
<strong>解释：</strong>你可以把巧克力分成 [1,2,2], [1,2,2], [1,2,2]。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= K &lt; sweetness.length &lt;= 10^4</code></li>
<li><code>1 &lt;= sweetness[i] &lt;= 10^5</code></li>
</ul>


## 分析

- 二分答案，看能否切出 k 块即可

## 解答

```python
class Solution:
    def maximizeSweetness(self, sweetness: List[int], k: int) -> int:
        def check(x):
            res, s = 0, 0
            for sw in sweetness:
                s += sw
                if s >= x:
                    res += 1
                    s = 0
            return res <= k
        ma = sum(sweetness)+1
        return bisect_left(range(ma),True,min(sweetness),key=check)-1
```

67 ms
