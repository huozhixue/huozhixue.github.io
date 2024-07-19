# 2266：统计打字方案数（1856 分）


> <u>**[力扣第 292 场周赛第 3 题](https://leetcode.cn/problems/count-number-of-texts/)**</u>

## 题目

<p>Alice 在给 Bob 用手机打字。数字到字母的 <strong>对应</strong> 如下图所示。</p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png" style="width: 200px; height: 162px;"></p>

<p>为了 <strong>打出</strong> 一个字母，Alice 需要 <strong>按</strong> 对应字母 <code>i</code> 次，<code>i</code> 是该字母在这个按键上所处的位置。</p>

<ul>
<li>比方说，为了按出字母 <code>'s'</code> ，Alice 需要按 <code>'7'</code> 四次。类似的， Alice 需要按 <code>'5'</code> 两次得到字母  <code>'k'</code> 。</li>
<li>注意，数字 <code>'0'</code> 和 <code>'1'</code> 不映射到任何字母，所以 Alice <strong>不</strong> 使用它们。</li>
</ul>

<p>但是，由于传输的错误，Bob 没有收到 Alice 打字的字母信息，反而收到了 <strong>按键的字符串信息</strong> 。</p>

<ul>
<li>比方说，Alice 发出的信息为 <code>"bob"</code> ，Bob 将收到字符串 <code>"2266622"</code> 。</li>
</ul>

<p>给你一个字符串 <code>pressedKeys</code> ，表示 Bob 收到的字符串，请你返回 Alice <strong>总共可能发出多少种文字信息</strong> 。</p>

<p>由于答案可能很大，将它对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 后返回。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>pressedKeys = "22233"
<b>输出：</b>8
<strong>解释：</strong>
Alice 可能发出的文字信息包括：
"aaadd", "abdd", "badd", "cdd", "aaae", "abe", "bae" 和 "ce" 。
由于总共有 8 种可能的信息，所以我们返回 8 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>pressedKeys = "222222222222222222222222222222222222"
<b>输出：</b>82876089
<strong>解释：</strong>
总共有 2082876103 种 Alice 可能发出的文字信息。
由于我们需要将答案对 10<sup>9</sup> + 7 取余，所以我们返回 2082876103 % (10<sup>9</sup> + 7) = 82876089 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= pressedKeys.length &lt;= 10<sup>5</sup></code></li>
<li><code>pressedKeys</code> 只包含数字 <code>'2'</code> 到 <code>'9'</code> 。</li>
</ul>


**相似问题：**
- [0017：电话号码的字母组合](/leetcode/0017)
- [0091：解码方法](/leetcode/0091)


## 分析

### #1

可以按最后一个字母递推。

```python
class Solution:
    def countTexts(self, pressedKeys: str) -> int:
        mod = 10**9+7
        n = len(pressedKeys)
        f = [1]+[0]*n
        for i in range(1,n+1):
            c = pressedKeys[i-1]
            for j in range(4 if c in '79' else 3):
                if i-j-1<0 or pressedKeys[i-j-1]!=c:
                    break
                f[i] += f[i-j-1]
                f[i] %= mod
        return f[-1]
```
621 ms

### #2

- 可以把连续相同的字符分为一组
- 将每组的方案数累乘即可
- 具体求每组方案数，注意到只跟长度有关
- 因此可以预处理长度对应的方案数
## 解答


```python
mod = 10**9+7
ma = 10**5
A = [1]
B = [1]
for _ in range(ma):
    A.append(sum(A[-3:])%mod)
    B.append(sum(B[-4:])%mod)

class Solution:
    def countTexts(self, pressedKeys: str) -> int:
        res = 1
        for c,g in groupby(pressedKeys):
            m = len(list(g))
            res *= B[m] if c in '79' else A[m]
            res %= mod
        return res
```
96 ms
