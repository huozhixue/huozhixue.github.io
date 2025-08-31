# 3549：两个多项式相乘（★★）


> <u>**[力扣第 3549 题](https://leetcode.cn/problems/multiply-two-polynomials/)**</u>

## 题目

<p data-end="315" data-start="119">给定两个整数数组 <code>poly1</code> 和 <code>poly2</code>，其中每个数组中下标 <code>i</code> 的元素表示多项式中 <code>x<sup>i</sup></code> 的系数。</p>

<p>设 <code>A(x)</code> 和 <code>B(x)</code> 分别是 <code>poly1</code> 和 <code>poly2</code> 表示的多项式。</p>

<p>返回一个长度为 <code>(poly1.length + poly2.length - 1)</code> 的整数数组 <code>result</code> 表示乘积多项式 <code>R(x) = A(x) * B(x)</code> 的系数，其中 <code>result[i]</code> 表示 <code>R(x)</code> 中 <code>x<sup>i</sup></code> 的系数。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>poly1 = [3,2,5], poly2 = [1,4]</span></p>

<p><span class="example-io"><b>输出：</b>[3,14,13,20]</span></p>

<p><strong>解释：</strong></p>

<ul>
<li><code>A(x) = 3 + 2x + 5x<sup>2</sup></code> 且 <code>B(x) = 1 + 4x</code></li>
<li><code>R(x) = (3 + 2x + 5x<sup>2</sup>) * (1 + 4x)</code></li>
<li><code>R(x) = 3 * 1 + (3 * 4 + 2 * 1)x + (2 * 4 + 5 * 1)x<sup>2</sup> + (5 * 4)x<sup>3</sup></code></li>
<li><code>R(x) = 3 + 14x + 13x<sup>2</sup> + 20x<sup>3</sup></code></li>
<li>因此，result = <code>[3, 14, 13, 20]</code>。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">poly1 = [1,0,-2], poly2 = [-1]</span></p>

<p><span class="example-io"><b>输出：</b>[-1,0,2]</span></p>

<p><strong>解释：</strong></p>

<ul>
<li><code>A(x) = 1 + 0x - 2x<sup>2</sup></code> 且 <code>B(x) = -1</code></li>
<li><code>R(x) = (1 + 0x - 2x<sup>2</sup>) * (-1)</code></li>
<li><code>R(x) = -1 + 0x + 2x<sup>2</sup></code></li>
<li>因此，result = <code>[-1, 0, 2]</code>。</li>
</ul>
</div>

<p><strong class="example">示例 3：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>poly1 = [1,5,-3], poly2 = [-4,2,0]</span></p>

<p><span class="example-io"><b>输出：</b>[-4,-18,22,-6,0]</span></p>

<p><strong>解释：</strong></p>

<ul>
<li><code>A(x) = 1 + 5x - 3x<sup>2</sup></code> 且 <code>B(x) = -4 + 2x + 0x<sup>2</sup></code></li>
<li><code>R(x) = (1 + 5x - 3x<sup>2</sup>) * (-4 + 2x + 0x<sup>2</sup>)</code></li>
<li><code>R(x) = 1 * -4 + (1 * 2 + 5 * -4)x + (5 * 2 + -3 * -4)x<sup>2</sup> + (-3 * 2)x<sup>3</sup> + 0x<sup>4</sup></code></li>
<li><code>R(x) = -4 -18x + 22x<sup>2</sup> -6x<sup>3</sup> + 0x<sup>4</sup></code></li>
<li>因此，result = <code>[-4, -18, 22, -6, 0]</code>。</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= poly1.length, poly2.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>-10<sup>3</sup> &lt;= poly1[i], poly2[i] &lt;= 10<sup>3</sup></code></li>
<li><code>poly1</code> 与 <code>poly2</code> 至少包含一个非零系数。</li>
</ul>




## 分析

- fft 模板

## 解答


```python
import math
I = complex(0,1)

def fft(A,N,sgn=1):
    L = N.bit_length()-1
    rev = [0]*N
    for i in range(N):
        j = rev[i] = (rev[i >> 1] >> 1) | (i&1)*(N>>1)
        if i<j:
            A[i],A[j] = A[j],A[i]
    for i in range(L):
        a = 1<<i
        step = math.e**(math.pi/a*sgn*I)    
        for j in range(0,N,a*2):
            w = 1
            for k in range(j,j+a):
                x,y = A[k],A[k+a]*w
                A[k],A[k+a] = x+y,x-y
                w *= step
    if sgn==-1:
        for i,x in enumerate(A):
            A[i] = round(x.real/N)

class Solution:
    def multiply(self, poly1: List[int], poly2: List[int]) -> List[int]:
        A,B = poly1,poly2
        n = len(A)+len(B)-1
        N = 1<<n.bit_length()
        A += [0]*(N-len(A))
        B += [0]*(N-len(B))
        fft(A,N)
        fft(B,N)
        C = [a*b for a,b in zip(A,B)]
        fft(C,N,-1)
        return C[:n]
```
3480 ms
