# 1320：二指输入的的最小距离（2027 分）


> <u>**[力扣第 171 场周赛第 4 题](https://leetcode.cn/problems/minimum-distance-to-type-a-word-using-two-fingers/)**</u>

## 题目

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/11/leetcode_keyboard.png" /></p>

<p>二指输入法定制键盘在 <strong>X-Y</strong> 平面上的布局如上图所示，其中每个大写英文字母都位于某个坐标处。</p>

<ul>
<li>例如字母 <strong>A</strong> 位于坐标 <strong>(0,0)</strong>，字母 <strong>B</strong> 位于坐标 <strong>(0,1)</strong>，字母 <strong>P</strong> 位于坐标 <strong>(2,3)</strong> 且字母 <strong>Z</strong> 位于坐标 <strong>(4,1)</strong>。</li>
</ul>

<p>给你一个待输入字符串 <code>word</code>，请你计算并返回在仅使用两根手指的情况下，键入该字符串需要的最小移动总距离。</p>

<p>坐标<code> <strong>(x<sub>1</sub>,y<sub>1</sub>)</strong> </code>和 <code><strong>(x<sub>2</sub>,y<sub>2</sub>)</strong></code> 之间的 <strong>距离</strong> 是 <code><strong>|x<sub>1</sub> - x<sub>2</sub>| + |y<sub>1</sub> - y<sub>2</sub>|</strong></code>。 </p>

<p><strong>注意</strong>，两根手指的起始位置是零代价的，不计入移动总距离。你的两根手指的起始位置也不必从首字母或者前两个字母开始。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>word = "CAKE"
<strong>输出：</strong>3
<strong>解释：
</strong>使用两根手指输入 "CAKE" 的最佳方案之一是：
手指 1 在字母 'C' 上 -&gt; 移动距离 = 0
手指 1 在字母 'A' 上 -&gt; 移动距离 = 从字母 'C' 到字母 'A' 的距离 = 2
手指 2 在字母 'K' 上 -&gt; 移动距离 = 0
手指 2 在字母 'E' 上 -&gt; 移动距离 = 从字母 'K' 到字母 'E' 的距离  = 1
总距离 = 3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>word = "HAPPY"
<strong>输出：</strong>6
<strong>解释： </strong>
使用两根手指输入 "HAPPY" 的最佳方案之一是：
手指 1 在字母 'H' 上 -&gt; 移动距离 = 0
手指 1 在字母 'A' 上 -&gt; 移动距离 = 从字母 'H' 到字母 'A' 的距离 = 2
手指 2 在字母 'P' 上 -&gt; 移动距离 = 0
手指 2 在字母 'P' 上 -&gt; 移动距离 = 从字母 'P' 到字母 'P' 的距离 = 0
手指 1 在字母 'Y' 上 -&gt; 移动距离 = 从字母 'A' 到字母 'Y' 的距离 = 4
总距离 = 6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= word.length &lt;= 300</code></li>
<li>每个 <code>word[i]</code> 都是一个大写英文字母。</li>
</ul>


**相似问题：**
- [1974：使用特殊打字机键入单词的最少时间（1364 分）](/leetcode/1974)


## 分析

### #1

令 f(a,b) 代表两根手指分别在位置 a,b 时的最小距离，递推即可

```python
@cache
def cal(a,b):
    x1,y1 = divmod(a,6)
    x2,y2 = divmod(b,6)
    return abs(x1-x2)+abs(y1-y2)

class Solution:
    def minimumDistance(self, word: str) -> int:
        f = {(a,b):0 for a in range(26) for b in range(26)}
        for c in word:
            c = ord(c)-ord('A')
            g = defaultdict(lambda:inf)
            for (a,b),w in f.items():
                g[(a,c)] = min(g[(a,c)], cal(b,c)+w)
                g[(c,b)] = min(g[(c,b)], cal(a,c)+w)
            f = g
        return min(f.values())
```
259 ms


### #2

- 注意到遍历到 word[i] 时必然有根手指在 word[i] 处，状态中无需记录该信息
- 因此，令 f(a) 代表另一根手指在位置 a 时的最小距离，进行递推
## 解答

```python
@cache
def cal(a,b):
    x1,y1 = divmod(a,6)
    x2,y2 = divmod(b,6)
    return abs(x1-x2)+abs(y1-y2)

class Solution:
    def minimumDistance(self, word: str) -> int:
        A = [ord(c)-ord('A') for c in word]
        f = [0]*26
        for a,b in pairwise(A):
            f = [min(f[c]+cal(a,b),f[b]+cal(a,c)) for c in range(26)]
        return min(f)
```
47 ms

