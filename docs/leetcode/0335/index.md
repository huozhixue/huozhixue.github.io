# 0335：路径交叉（★★）


> <u>**[力扣第 335 题](https://leetcode.cn/problems/self-crossing/)**</u>

## 题目

<p>给你一个整数数组 <code>distance</code><em> </em>。</p>

<p>从 <strong>X-Y</strong> 平面上的点 <code>(0,0)</code> 开始，先向北移动 <code>distance[0]</code> 米，然后向西移动 <code>distance[1]</code> 米，向南移动 <code>distance[2]</code> 米，向东移动 <code>distance[3]</code> 米，持续移动。也就是说，每次移动后你的方位会发生逆时针变化。</p>

<p>判断你所经过的路径是否相交。如果相交，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/selfcross1-plane.jpg" style="width: 400px; height: 435px;" />
<pre>
<strong>输入：</strong>distance = [2,1,1,2]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/selfcross2-plane.jpg" style="width: 400px; height: 435px;" />
<pre>
<strong>输入：</strong>distance = [1,2,3,4]
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/selfcross3-plane.jpg" style="width: 400px; height: 435px;" />
<pre>
<strong>输入：</strong>distance = [1,1,1,1]
<strong>输出：</strong>true</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= distance.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= distance[i] &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

### #1

- 观察发现，第 i 步的路径只可能和 i+3、i+4、i+5 的路径交叉
- 判断路径交叉可以用类似 {{< lc "0223" >}} 的方法，看 x/y 方向上是否重叠
- 遍历时保存每个端点，分别判断即可

```python
class Solution:
    def isSelfCrossing(self, distance: List[int]) -> bool:
        def check(a1,a2,b1,b2):
            a1,a2 = sorted([a1,a2])
            b1,b2 = sorted([b1,b2])
            return all(max(a1[i],b1[i])<=min(a2[i],b2[i]) for i in range(2))

        A,dx,dy = [(0,0)],0,1
        for a in distance:
            A.append((A[-1][0]+dx*a,A[-1][1]+dy*a))
            dx,dy = -dy,dx
            for i in range(4,min(7,len(A))):
                if check(A[-1],A[-2],A[-i],A[-i-1]):
                    return True
        return False
```
491 ms

### #2

还可以继续观察，直接找交叉时距离之间的规律，具体见 [力扣官解](https://leetcode.cn/problems/self-crossing/solutions/1069749/lu-jing-jiao-cha-by-leetcode-solution-dekx/)。
## 解答

```python
class Solution:
    def isSelfCrossing(self, distance: List[int]) -> bool:
        A = distance
        for i in range(3,len(A)):
            if A[i]>=A[i-2] and A[i-1]<=A[i-3]:
                return True
            if i>=4 and A[i-1]==A[i-3] and A[i]+A[i-4]>=A[i-2]:
                return True
            if i>=5 and A[i]+A[i-4]>=A[i-2]>=A[i-4] and A[i-1]+A[i-5]>=A[i-3]>=A[i-1]:
                return True
        return False
```
64 ms
