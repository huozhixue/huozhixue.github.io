# 0401：二进制手表


> <u>**[力扣第 401 题](https://leetcode.cn/problems/binary-watch/)**</u>

## 题目

<p>二进制手表顶部有 4 个 LED 代表<strong> 小时（0-11）</strong>，底部的 6 个 LED 代表<strong> 分钟（0-59）</strong>。每个 LED 代表一个 0 或 1，最低位在右侧。</p>

<ul>
<li>例如，下面的二进制手表读取 <code>"4:51"</code> 。</li>
</ul>

<p><img src="https://assets.leetcode.com/uploads/2021/04/08/binarywatch.jpg" style="height: 300px; width" /></p>

<p>给你一个整数 <code>turnedOn</code> ，表示当前亮着的 LED 的数量，返回二进制手表可以表示的所有可能时间。你可以 <strong>按任意顺序</strong> 返回答案。</p>

<p>小时不会以零开头：</p>

<ul>
<li>例如，<code>"01:00"</code> 是无效的时间，正确的写法应该是 <code>"1:00"</code> 。</li>
</ul>

<p>分钟必须由两位数组成，可能会以零开头：</p>

<ul>
<li>例如，<code>"10:2"</code> 是无效的时间，正确的写法应该是 <code>"10:02"</code> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>turnedOn = 1
<strong>输出：</strong>["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>turnedOn = 9
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= turnedOn &lt;= 10</code></li>
</ul>


**相似问题：**
- [0017：电话号码的字母组合](/leetcode/0017)
- [0191：位1的个数](/leetcode/0191)


## 分析


### #1

- 可以用二进制代表灯的状态，遍历[1,1<<10]，判断是否符合
- 遍历还可以用 [Gosper's Hack](https://zhuanlan.zhihu.com/p/360512296)，只枚举二进制 k 个 1 的数


```python
class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        res = []
        st = (1<<turnedOn)-1
        while st<(1<<10):
            a,b = st>>6,st&63
            if a<12 and b<60:
                res.append('%d:%02d'%(a,b))
            lb = st&-st
            r = st+lb
            st = (r^st)>>(lb.bit_length()+1)|r
            if st==0:
                break
        return res
```
41 ms

### #2

- 数据量较小，因此可以逆向思维，直接遍历所有有效时间，计算亮灯个数

## 解答

```python
A = [[] for _ in range(11)]
for a,b in product(range(12),range(60)):
    A[a.bit_count()+b.bit_count()].append('%d:%02d'%(a,b))

class Solution:
    def readBinaryWatch(self, turnedOn: int) -> List[str]:
        return A[turnedOn]
```
38 ms
