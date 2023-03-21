# 0385：迷你语法分析器（★）


> <u>**[力扣第 385 题](https://leetcode.cn/problems/mini-parser/)**</u>

## 题目

<p>给定一个字符串 s 表示一个整数嵌套列表，实现一个解析它的语法分析器并返回解析的结果 <code>NestedInteger</code> 。</p>

<p>列表中的每个元素只可能是整数或整数嵌套列表</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "324",
<strong>输出：</strong>324
<strong>解释：</strong>你应该返回一个 NestedInteger 对象，其中只包含整数值 324。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "[123,[456,[789]]]",
<strong>输出：</strong>[123,[456,[789]]]
<strong>解释：</strong>返回一个 NestedInteger 对象包含一个有两个元素的嵌套列表：
1. 一个 integer 包含值 123
2. 一个包含两个元素的嵌套列表：
i.  一个 integer 包含值 456
ii. 一个包含一个元素的嵌套列表
a. 一个 integer 包含值 789
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>s</code> 由数字、方括号 <code>"[]"</code>、负号 <code>'-'</code> 、逗号 <code>','</code>组成</li>
<li>用例保证 <code>s</code> 是可解析的 <code>NestedInteger</code></li>
<li>输入中的所有值的范围是 <code>[-10<sup>6</sup>, 10<sup>6</sup>]</code></li>
</ul>


## 分析

显然 s 的对象由子串递归地组成。可以用栈模拟这个过程，一趟解决。

> 特别注意数字前可能有负号。

## 解答

```python
def deserialize(self, s: str) -> NestedInteger:
    stack = [NestedInteger()]
    for left, num, right in re.findall(r'(\[)|(-?\d+)|(\])', s):
        if left:
            stack.append(NestedInteger())
        elif num:
            stack[-1].add(NestedInteger(int(num)))
        else:
            x = stack.pop()
            stack[-1].add(x)
    return stack[0].getList()[0]
```
40 ms



