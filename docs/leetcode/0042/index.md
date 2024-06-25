# 0042：接雨水（★★）


> <u>**[力扣第 42 题](https://leetcode.cn/problems/trapping-rain-water/)**</u>

## 题目

<p>给定 <code>n</code> 个非负整数表示每个宽度为 <code>1</code> 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png" style="height: 161px; width: 412px;" /></p>

<pre>
<strong>输入：</strong>height = [0,1,0,2,1,0,1,3,2,1,2,1]
<strong>输出：</strong>6
<strong>解释：</strong>上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>height = [4,2,0,3,2,5]
<strong>输出：</strong>9
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == height.length</code></li>
<li><code>1 &lt;= n &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= height[i] &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析 

### #1 前后缀分解

- 对于任一柱子 h，如果左右都有更高的柱子，那么该位置就能接到雨水
- 设左右最高的柱子分别为 l, r, 该位置能接到的雨水数量为 min(l, r)-h
- 每根柱子对应的 l 和 r 可以一趟递推得到

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        L = list(accumulate(height,max))
        R = list(accumulate(height[::-1],max))[::-1]
        return sum(min(l,r)-h for h,l,r in zip(height,L,R))
```
62 ms

### #2 单调栈

也可以用单调栈

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        res = 0
        sk = []
        for i,x in enumerate(height):
            while sk and sk[-1][1]<=x:
                _,y = sk.pop()
                if sk:
                    j,z = sk[-1]
                    res += (min(x,z)-y)*(i-j-1)
            sk.append((i,x))
        return res
```
53 ms

### #3 双指针

还有个巧妙的双指针方法：
- 初始 i、j 分别指向数组首尾
- 若 max(height[:i+1]) <= max(height[j:])，可求得位置 i 处的雨水，然后移动 i
- 若 max(height[:i+1]) >= max(height[j:])，可求得位置 j 处的雨水，然后移动 j
- 循环操作直到 i、j 相遇，即可得到每个位置处的雨水

## 解答

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        res,l,r = 0,0,0
        i,j = 0,len(height)-1
        while i<j:
            l,r = max(l,height[i]),max(r,height[j])
            if l<=r:
                res += l-height[i]
                i += 1
            else:
                res += r-height[j]
                j -= 1
        return res
```
54 ms

## *附加

还可以用并查集
- 可以将下雨看作动态的过程，假如下到高度 h 时，某个柱子上的雨水能流出去，该柱子能接的最大高度即是 h
- 雨水能否流出去是一个连通性问题，因此可以考虑用并查集
- 从低到高遍历所有柱子，维护连通性，高度 h 时与边界连通的即加到结果中
	- 可以通过边界所在连通块的大小变化计算
- 最后再减去柱子本身的高度即可

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        def find(x):
            if f[x]!=x:
                f[x]=find(f[x])
            return f[x]
        
        def union(x,y):
            fx,fy = find(x),find(y)
            if fx!=fy:
                f[fx]=fy
                sz[fy]+=sz[fx]

        H = height
        n = len(H)
        f = list(range(n+1))
        sz = [1]*(n+1)
        d = defaultdict(list)
        for i in range(n):
            d[H[i]].append(i)
        res,pre=0,1
        for h in sorted(d):
            for i in d[h]:
                if i in [0,n-1]:
                    union(i,n)
                for x in [i-1,i+1]:
                    if 0<=x<n and H[x]<=h:
                        union(i,x)
            cur = sz[find(n)]
            res += (cur-pre)*h-len(d[h])*h
            pre = cur
        return res
```
100 ms
