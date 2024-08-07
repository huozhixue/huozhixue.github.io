# 0788：旋转数字（1396 分）


> <u>**[力扣第 788 题](https://leetcode.cn/problems/rotated-digits/)**</u>

## 题目

<p>我们称一个数 X 为好数, 如果它的每位数字逐个地被旋转 180 度后，我们仍可以得到一个有效的，且和 X 不同的数。要求每位数字都要被旋转。</p>

<p>如果一个数的每位数字被旋转以后仍然还是一个数字， 则这个数是有效的。0, 1, 和 8 被旋转后仍然是它们自己；2 和 5 可以互相旋转成对方（在这种情况下，它们以不同的方向旋转，换句话说，2 和 5 互为镜像）；6 和 9 同理，除了这些以外其他的数字旋转以后都不再是有效的数字。</p>

<p>现在我们有一个正整数 <code>N</code>, 计算从 <code>1</code> 到 <code>N</code> 中有多少个数 X 是好数？</p>



<p><strong>示例：</strong></p>

<pre><strong>输入:</strong> 10
<strong>输出:</strong> 4
<strong>解释:</strong>
在[1, 10]中有四个好数： 2, 5, 6, 9。
注意 1 和 10 不是好数, 因为他们在旋转之后不变。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>N 的取值范围是 <code>[1, 10000]</code>。</li>
</ul>




## 分析

暴力做法是遍历 1 到 N，判断是否不含 '347' 且至少有一个 '2569' 即可。

不过这是求范围内数字满足某种性质的个数，典型的数位 dp 问题，能极大优化时间。

令 dfs(pos, st, bound) 代表：
- 遍历到 n 的第 pos 位
- st 代表前面是否至少有一个 '2569'
- bound 代表前面取的数是否贴着 n 的上界

即可递归。

## 解答

```python
def rotatedDigits(self, n: int) -> int:
    @lru_cache(None)
    def dfs(pos, st, bound):
        if pos == len(s):
            return int(st)
        res, cur = 0, int(s[pos])
        up = cur if bound else 9
        for x in range(up+1):
            if x not in [3,4,7]:
                res += dfs(pos+1, st or x in [2,5,6,9], bound and x==cur)
        return res
    
    s = str(n)
    return dfs(0, False, True)
```
36 ms


