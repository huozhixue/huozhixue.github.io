# 0546：移除盒子（★★）


> <u>**[力扣第 546 题](https://leetcode.cn/problems/remove-boxes/)**</u>

## 题目

<p>给出一些不同颜色的盒子<meta charset="UTF-8" /> <code>boxes</code> ，盒子的颜色由不同的正数表示。</p>

<p>你将经过若干轮操作去去掉盒子，直到所有的盒子都去掉为止。每一轮你可以移除具有相同颜色的连续 <code>k</code> 个盒子（<code>k &gt;= 1</code>），这样一轮之后你将得到 <code>k * k</code> 个积分。</p>

<p>返回 <em>你能获得的最大积分和</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>boxes = [1,3,2,2,2,3,4,3,1]
<strong>输出：</strong>23
<strong>解释：</strong>
[1, 3, 2, 2, 2, 3, 4, 3, 1]
----&gt; [1, 3, 3, 4, 3, 1] (3*3=9 分)
----&gt; [1, 3, 3, 3, 1] (1*1=1 分)
----&gt; [1, 1] (3*3=9 分)
----&gt; [] (2*2=4 分)
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>boxes = [1,1,1]
<strong>输出：</strong>9
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>boxes = [1]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= boxes.length &lt;= 100</code></li>
<li><code>1 &lt;= boxes[i] &lt;= 100</code></li>
</ul>


**相似问题：**
- [0664：奇怪的打印机](/leetcode/0664)
- [2107：分享 K 个糖果后独特口味的数量](/leetcode/2107)


## 分析

显然初始连续的盒子最后是一起移除的，考虑将连续段合并，得到元素为 (颜色，连续段长度) 的数组 A。
- 考虑元素 A[-1]，它要么单独移除，要么和前面颜色相同的元素一起移除
- 假如 A[-1] 单独移除，显然转为递归子问题
- 假如 A[-1] 和 A[i] 一起移除
    - 必然先移除了 A[i+1:-1] 部分，这部分即是子问题
    - 然后将 A[-1] 的长度累加到 A[i] 上，剩下的也是子问题

因此令 dfs(A) 代表数组 A 的最大积分，即可递归。 

## 解答

```python
def removeBoxes(self, boxes: List[int]) -> int:
    @lru_cache(None)
    def dfs(A):
        if not A:
            return 0
        c, k = A[-1]
        res = dfs(A[:-1])+k**2
        for i in range(len(A)-2):
            if A[i][0]==c:
                B = A[:i]+((c, A[i][1]+k),)
                res = max(res, dfs(B)+dfs(A[i+1:-1]))
        return res

    A = tuple((x, len(list(g))) for x, g in groupby(boxes))
    return dfs(A)
```
364 ms

## *附加

时间复杂度分析：
- 注意到递归时只会对区间数组的末尾进行修改，因此可以改写成一般的区间 dp 形式
    - 令 dfs(i, j, k) 代表 A[i:j+1] 且 A[j] 额外加了 k 的最大积分，即可递归
    - 显然 k 小于 n，因此一般的区间 dp 写法的时间复杂度是 O(N^4)
- 直接递归区间数组的形式，有切片操作，所以时间复杂度更高
- 但因为本题的数值范围很小，一般会存在重复的区间数组，所以直接递归区间数组的实际时间更快
