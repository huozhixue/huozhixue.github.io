# 0531：孤独像素 I（★）


> <u>**[力扣第 531 题](https://leetcode.cn/problems/lonely-pixel-i/)**</u>

## 题目

<p>给你一个大小为 <code>m x n</code> 的图像 <code>picture</code> ，图像由黑白像素组成，<code>'B'</code> 表示黑色像素，<code>'W'</code> 表示白色像素，请你统计并返回图像中 <strong>黑色</strong> 孤独像素的数量。</p>

<p><strong>黑色孤独像素</strong> 的定义为：如果黑色像素 <code>'B'</code> 所在的同一行和同一列不存在其他黑色像素，那么这个黑色像素就是黑色孤独像素。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/11/pixel1.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>输入：</strong>picture = [["W","W","B"],["W","B","W"],["B","W","W"]]
<strong>输出：</strong>3
<strong>解释：</strong>全部三个 'B' 都是黑色的孤独像素
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/11/pixel2.jpg" style="width: 242px; height: 242px;" />
<pre>
<strong>输入：</strong>picture = [["B","B","B"],["B","B","W"],["B","B","B"]]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == picture.length</code></li>
<li><code>n == picture[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 500</code></li>
<li><code>picture[i][j]</code> 为 <code>'W'</code> 或 <code>'B'</code></li>
</ul>


## 分析

## 解答

```python
    def findLonelyPixel(self, picture: List[List[str]]) -> int:
        m, n = len(picture), len(picture[0])
        r = [row.count('B') for row in picture]
        c = [col.count('B') for col in zip(*picture)]
        return sum(r[i]==c[j]==1 for i in range(m) for j in range(n) if picture[i][j]=='B')
```

68 ms
