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

### #1
- 考虑最后一个盒子，只有两种情况
	- 单独移除
	- 和前面的某个 boxes[k] 一起移除
		- 必然先移除了 [k+1:-1] 部分，转为递归子问题
		- 然后将 boxes[-1] 加到 boxes[k] 后面，转为递归子问题
- 为了方便递归，令 dfs(i,j,x) 代表区间 [i,j] 且跟了 x 个 boxes[j] 的最大得分


```python
class Solution:
    def removeBoxes(self, boxes: List[int]) -> int:
        @cache
        def dfs(i,j,x):
            if i>j:
                return 0
            res = (x+1)*(x+1)+dfs(i,j-1,0)
            for k in range(i,j):
                if boxes[k]==boxes[j]:
                    res = max(res,dfs(i,k,x+1)+dfs(k+1,j-1,0))
            return res
        n = len(boxes)
        return dfs(0,n-1,0)
```
4595 ms

### #2

- 显然初始连续的盒子应该一起移除
- 考虑将连续段合并，得到元素为 (颜色，连续段长度) 的数组 A
- 在数组 A 上进行递归，可以节省时间

## 解答

```python
class Solution:
    def removeBoxes(self, boxes: List[int]) -> int:
        @cache
        def dfs(i,j,x):
            if i>j:
                return 0
            x += A[j][1]
            res = x*x+dfs(i,j-1,0)
            for k in range(i,j):
                if A[k][0]==A[j][0]:
                    res = max(res,dfs(i,k,x)+dfs(k+1,j-1,0))
            return res

        A = [(c,len(list(g))) for c,g in groupby(boxes)]
        n = len(A)
        return dfs(0,n-1,0)
```
576 ms

