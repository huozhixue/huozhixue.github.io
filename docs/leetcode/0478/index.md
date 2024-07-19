# 0478：在圆内随机生成点（★）


> <u>**[力扣第 478 题](https://leetcode.cn/problems/generate-random-point-in-a-circle/)**</u>

## 题目

<p>给定圆的半径和圆心的位置，实现函数 <code>randPoint</code> ，在圆中产生均匀随机点。</p>

<p>实现 <code>Solution</code> 类:</p>

<ul>
<li><code>Solution(double radius, double x_center, double y_center)</code> 用圆的半径 <code>radius</code> 和圆心的位置<code> (x_center, y_center)</code> 初始化对象</li>
<li><code>randPoint()</code> 返回圆内的一个随机点。圆周上的一点被认为在圆内。答案作为数组返回 <code>[x, y]</code> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:
</strong>["Solution","randPoint","randPoint","randPoint"]
[[1.0, 0.0, 0.0], [], [], []]
<strong>输出: </strong>[null, [-0.02493, -0.38077], [0.82314, 0.38945], [0.36572, 0.17248]]
<strong>解释:</strong>
Solution solution = new Solution(1.0, 0.0, 0.0);
solution.randPoint ();//返回[-0.02493，-0.38077]
solution.randPoint ();//返回[0.82314,0.38945]
solution.randPoint ();//返回[0.36572,0.17248]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt; radius &lt;= 10<sup>8</sup></code></li>
<li><code>-10<sup>7</sup> &lt;= x_center, y_center &lt;= 10<sup>7</sup></code></li>
<li><code>randPoint</code> 最多被调用 <code>3 * 10<sup>4</sup></code> 次</li>
</ul>


**相似问题：**
- [0497：非重叠矩形中的随机点](/leetcode/0497)


## 分析

拒绝抽样即可。

## 解答

```python
class Solution:

    def __init__(self, radius: float, x_center: float, y_center: float):
        self.r = radius
        self.x = x_center
        self.y = y_center

    def randPoint(self) -> List[float]:
        while True:
            a = 2*random.random()-1
            b = 2*random.random()-1
            if a*a+b*b<=1:
                return [self.x+a*self.r,self.y+b*self.r]
```

131 ms


