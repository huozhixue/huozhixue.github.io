# 0780：到达终点（1897 分）


> <u>**[力扣第 780 题](https://leetcode.cn/problems/reaching-points/)**</u>

## 题目

<p>给定四个整数 <code>sx</code> , <code>sy</code> ，<code>tx</code> 和 <code>ty</code>，如果通过一系列的<strong>转换</strong>可以从起点 <code>(sx, sy)</code> 到达终点 <code>(tx, ty)</code>，则返回 <code>true</code>，否则返回 <code>false</code>。</p>

<p>从点 <code>(x, y)</code> 可以<strong>转换</strong>到 <code>(x, x+y)</code>  或者 <code>(x+y, y)</code>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> sx = 1, sy = 1, tx = 3, ty = 5
<strong>输出:</strong> true
<strong>解释:
</strong>可以通过以下一系列<strong>转换</strong>从起点转换到终点：
(1, 1) -&gt; (1, 2)
(1, 2) -&gt; (3, 2)
(3, 2) -&gt; (3, 5)
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> sx = 1, sy = 1, tx = 2, ty = 2
<strong>输出:</strong> false
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> sx = 1, sy = 1, tx = 1, ty = 1
<strong>输出:</strong> true
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= sx, sy, tx, ty &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [2400：恰好移动 k 步到达某一位置的方法数目（1751 分）](/leetcode/2400)
- [2543：判断一个点是否可以到达（2220 分）](/leetcode/2543)
- [2849：判断能否在给定时间到达单元格（1515 分）](/leetcode/2849)


## 分析

- 从起点递推情况很多，但注意到从终点反推状态很少
	- 若 tx=ty，没有上一状态
	- 若 tx>ty，上一状态必然是 [tx-ty,ty]
	- 若 tx<ty，上一状态必然是 [tx,ty-tx]
- 若 tx<sx 或 ty<sy，直接 false
- 若 tx=sx，判断 ty 能否减成 sy；ty=sy 同理
- 若 tx>sx 且 ty>sy
	- 若 tx=ty，直接 false
	- 若 tx>ty，tx 要一直减到小于 ty，才有可能让 ty 减小，因此直接更新 tx%=ty
	- 若 ty>tx，同理

## 解答


```python
class Solution:
    def reachingPoints(self, sx: int, sy: int, tx: int, ty: int) -> bool:
        while tx>sx and ty>sy and tx!=ty:
            tx,ty = (tx,ty%tx) if tx<ty else (tx%ty,ty)
        if tx==sx and ty>=sy and (ty-sy)%tx==0:
            return True
        return ty==sy and tx>=sx and (tx-sx)%ty==0
```
0 ms
