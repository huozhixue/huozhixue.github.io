# 0975：奇偶跳（2079 分）


> <u>**[力扣第 119 场周赛第 4 题](https://leetcode.cn/problems/odd-even-jump/)**</u>

## 题目

<p>给定一个整数数组 <code>A</code>，你可以从某一起始索引出发，跳跃一定次数。在你跳跃的过程中，第 1、3、5... 次跳跃称为奇数跳跃，而第 2、4、6... 次跳跃称为偶数跳跃。</p>

<p>你可以按以下方式从索引 <code>i</code> 向后跳转到索引 <code>j</code>（其中 <code>i &lt; j</code>）：</p>

<ul>
<li>在进行奇数跳跃时（如，第 1，3，5... 次跳跃），你将会跳到索引 <code>j</code>，使得 <code>A[i] &lt;= A[j]</code>，<code>A[j]</code> 是可能的最小值。如果存在多个这样的索引 <code>j</code>，你只能跳到满足要求的<strong>最小</strong>索引 <code>j</code> 上。</li>
<li>在进行偶数跳跃时（如，第 2，4，6... 次跳跃），你将会跳到索引 <code>j</code>，使得 <code>A[i] &gt;= A[j]</code>，<code>A[j]</code> 是可能的最大值。如果存在多个这样的索引 <code>j</code>，你只能跳到满足要求的<strong>最小</strong>索引 <code>j</code> 上。</li>
<li>（对于某些索引 <code>i</code>，可能无法进行合乎要求的跳跃。）</li>
</ul>

<p>如果从某一索引开始跳跃一定次数（可能是 0 次或多次），就可以到达数组的末尾（索引 <code>A.length - 1</code>），那么该索引就会被认为是好的起始索引。</p>

<p>返回好的起始索引的数量。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>[10,13,12,14,15]
<strong>输出：</strong>2
<strong>解释： </strong>
从起始索引 i = 0 出发，我们可以跳到 i = 2，（因为 A[2] 是 A[1]，A[2]，A[3]，A[4] 中大于或等于 A[0] 的最小值），然后我们就无法继续跳下去了。
从起始索引 i = 1 和 i = 2 出发，我们可以跳到 i = 3，然后我们就无法继续跳下去了。
从起始索引 i = 3 出发，我们可以跳到 i = 4，到达数组末尾。
从起始索引 i = 4 出发，我们已经到达数组末尾。
总之，我们可以从 2 个不同的起始索引（i = 3, i = 4）出发，通过一定数量的跳跃到达数组末尾。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>[2,3,1,1,4]
<strong>输出：</strong>3
<strong>解释：</strong>
从起始索引 i=0 出发，我们依次可以跳到 i = 1，i = 2，i = 3：

在我们的第一次跳跃（奇数）中，我们先跳到 i = 1，因为 A[1] 是（A[1]，A[2]，A[3]，A[4]）中大于或等于 A[0] 的最小值。

在我们的第二次跳跃（偶数）中，我们从 i = 1 跳到 i = 2，因为 A[2] 是（A[2]，A[3]，A[4]）中小于或等于 A[1] 的最大值。A[3] 也是最大的值，但 2 是一个较小的索引，所以我们只能跳到 i = 2，而不能跳到 i = 3。

在我们的第三次跳跃（奇数）中，我们从 i = 2 跳到 i = 3，因为 A[3] 是（A[3]，A[4]）中大于或等于 A[2] 的最小值。

我们不能从 i = 3 跳到 i = 4，所以起始索引 i = 0 不是好的起始索引。

类似地，我们可以推断：
从起始索引 i = 1 出发， 我们跳到 i = 4，这样我们就到达数组末尾。
从起始索引 i = 2 出发， 我们跳到 i = 3，然后我们就不能再跳了。
从起始索引 i = 3 出发， 我们跳到 i = 4，这样我们就到达数组末尾。
从起始索引 i = 4 出发，我们已经到达数组末尾。
总之，我们可以从 3 个不同的起始索引（i = 1, i = 3, i = 4）出发，通过一定数量的跳跃到达数组末尾。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>[5,1,3,4,2]
<strong>输出：</strong>3
<strong>解释： </strong>
我们可以从起始索引 1，2，4 出发到达数组末尾。
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= A.length &lt;= 20000</code></li>
<li><code>0 &lt;= A[i] &lt; 100000</code></li>
</ol>




## 分析

### #1

- 显然每个位置的奇数跳和偶数跳都是确定的，考虑先求出来
- 奇数跳是在 arr[i] 右边找最接近的较大值，考虑维护一个 arr[i+1:] 的有序集合，二分查找
	- 由于相同值还要考虑下标，因此有序集合里保存 (值,下标) 二元组，找第一个 >=arr[i] 的下标即可
- 偶数跳可以将 arr 的值都取负，就跟求奇数跳一样了
- 确定了奇/偶数跳的转移，用 dp 递推每个位置能否达到末尾即可

```python
class Solution:
    def oddEvenJumps(self, arr: List[int]) -> int:
        from sortedcontainers import SortedList
        n = len(arr)

        def get(arr):
            sl = SortedList()
            A = [n]*n
            for i in range(n-1,-1,-1):
                pos = sl.bisect_left((arr[i],))
                A[i] = sl[pos][1] if pos<len(sl) else n
                sl.add((arr[i],i))
            return A
        A,B = get(arr),get([-x for x in arr])
        f = [[0,0] for _ in range(n+1)]
        f[n-1] = [1,1]
        for i in range(n-2,-1,-1):
            f[i] = [f[A[i]][1],f[B[i]][0]]
        return sum(a for a,_ in f)
```

572 ms

### #2

- 求奇/偶数跳的转移还有个巧妙的单调栈解法
- 将 arr 的下标按值排序得到 H，那么下标 i 右边第一个大于 i 的下标 j 即是满足 >= arr[i] 的最小值
- 求下一个更大元素即是经典的单调栈问题

## 解答

```python
class Solution:
    def oddEvenJumps(self, arr: List[int]) -> int:
        n = len(arr)

        def get(arr):
            A,sk = [n]*n,[]
            for x in sorted(range(n),key=lambda i:arr[i]):
                while sk and sk[-1]<x:
                    A[sk.pop()] = x
                sk.append(x)
            return A
        A,B = get(arr),get([-x for x in arr])
        f = [[0,0] for _ in range(n+1)]
        f[n-1] = [1,1]
        for i in range(n-2,-1,-1):
            f[i] = [f[A[i]][1],f[B[i]][0]]
        return sum(a for a,_ in f)
```

91 ms
