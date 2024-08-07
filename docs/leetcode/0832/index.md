# 0832：翻转图像（1243 分）


> <u>**[力扣第 84 场周赛第 1 题](https://leetcode.cn/problems/flipping-an-image/)**</u>

## 题目

<p>给定一个<meta charset="UTF-8" /> <code>n x n</code> 的二进制矩阵 <code>image</code> ，先 <strong>水平</strong> 翻转图像，然后 <strong>反转 </strong>图像并返回 <em>结果</em> 。</p>

<p><strong>水平</strong>翻转图片就是将图片的每一行都进行翻转，即逆序。</p>

<ul>
<li>例如，水平翻转 <code>[1,1,0]</code> 的结果是 <code>[0,1,1]</code>。</li>
</ul>

<p><strong>反转</strong>图片的意思是图片中的 <code>0</code> 全部被 <code>1</code> 替换， <code>1</code> 全部被 <code>0</code> 替换。</p>

<ul>
<li>例如，反转 <code>[0,1,1]</code> 的结果是 <code>[1,0,0]</code>。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>image = [[1,1,0],[1,0,1],[0,0,0]]
<strong>输出：</strong>[[1,0,0],[0,1,0],[1,1,1]]
<strong>解释：</strong>首先翻转每一行: [[0,1,1],[1,0,1],[0,0,0]]；
然后反转图片: [[1,0,0],[0,1,0],[1,1,1]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
<strong>输出：</strong>[[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
<strong>解释：</strong>首先翻转每一行: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]]；
然后反转图片: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
</pre>



<p><strong>提示：</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>n == image.length</code></li>
<li><code>n == image[i].length</code></li>
<li><code>1 &lt;= n &lt;= 20</code></li>
<li><code>images[i][j]</code> == <code>0</code> 或 <code>1</code>.</li>
</ul>




## 分析

每行逆序后再将每个元素与 1 异或即可。

## 解答

```python
def flipAndInvertImage(self, image: List[List[int]]) -> List[List[int]]:
    return [[val^1 for val in row[::-1]] for row in image]
```
28 ms

