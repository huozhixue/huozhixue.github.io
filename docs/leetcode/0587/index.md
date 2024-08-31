# 0587：安装栅栏（★★）


> <u>**[力扣第 587 题](https://leetcode.cn/problems/erect-the-fence/)**</u>

## 题目

<p>给定一个数组 <code>trees</code>，其中 <code>trees[i] = [x<sub>i</sub>, y<sub>i</sub>]</code> 表示树在花园中的位置。</p>

<p>你被要求用最短长度的绳子把整个花园围起来，因为绳子很贵。只有把 <strong>所有的树都围起来</strong>，花园才围得很好。</p>

<p>返回<em>恰好位于围栏周边的树木的坐标</em>。</p>

<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/24/erect2-plane.jpg" style="width: 400px;" /></p>

<pre>
<strong>输入:</strong> points = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
<strong>输出:</strong> [[1,1],[2,0],[3,3],[2,4],[4,2]]</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/24/erect1-plane.jpg" style="height: 393px; width: 400px;" /></p>

<pre>
<strong>输入:</strong> points = [[1,2],[2,2],[4,2]]
<strong>输出:</strong> [[4,2],[2,2],[1,2]]</pre>



<p><strong>注意:</strong></p>

<ul>
<li><code>1 &lt;= points.length &lt;= 3000</code></li>
<li><code>points[i].length == 2</code></li>
<li><code>0 &lt;= x<sub>i</sub>, y<sub>i</sub> &lt;= 100</code></li>
<li>
<p data-group="1-1">所有给定的点都是 <strong>唯一 </strong>的。</p>
</li>
</ul>


**相似问题：**
- [1924：安装栅栏 II](/leetcode/1924)
- [2545：根据第 K 场考试的分数排序（1294 分）](/leetcode/2545)


## 分析

经典的凸包问题，常用 [Andrew 算法](https://leetcode.cn/problems/erect-the-fence/solutions/1440879/an-zhuang-zha-lan-by-leetcode-solution-75s3/)。

## 解答


```python
class Solution:
    def outerTrees(self, trees: List[List[int]]) -> List[List[int]]:
        def cal(a,b,c):
            return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
        
        def get(A):
            sk = []
            for a in A:
                while len(sk)>=2 and cal(sk[-2],sk[-1],a)<0:
                    sk.pop()
                sk.append(tuple(a))
            return sk

        trees.sort()
        res = get(trees)
        vis = set(res)
        for a in get(trees[::-1])[1:]:
            if a in vis:
                break
            res.append(a)
        return res
```
71 ms
