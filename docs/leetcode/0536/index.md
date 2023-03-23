# 0536：从字符串生成二叉树（★）


> <u>**[力扣第 536 题](https://leetcode.cn/problems/construct-binary-tree-from-string/)**</u>

## 题目

<p>你需要用一个包括括号和整数的字符串构建一棵二叉树。</p>

<p>输入的字符串代表一棵二叉树。它包括整数和随后的 0 、1 或 2 对括号。整数代表根的值，一对括号内表示同样结构的子树。</p>

<p>若存在子结点，则从<strong>左子结点</strong>开始构建。</p>



<p><strong>示例 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/02/butree.jpg" style="height: 322px; width: 382px;" />
<pre>
<strong>输入：</strong> s = "4(2(3)(1))(6(5))"
<strong>输出：</strong> [4,2,6,3,1,5]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong> s = "4(2(3)(1))(6(5)(7))"
<strong>输出：</strong> [4,2,6,3,1,5,7]
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入：</strong> s = "-4(2(3)(1))(6(5)(7))"
<strong>输出： </strong>[-4,2,6,3,1,5,7]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>
<li>输入字符串中只包含 <code>'('</code>, <code>')'</code>, <code>'-'</code> 和 <code>'0'</code> ~ <code>'9'</code> </li>
<li>空树由 <code>""</code> 而非<code>"()"</code>表示。</li>
</ul>


## 分析

## 解答


```python
    def str2tree(self, s: str) -> TreeNode:
        stack = []
        for val, right in re.findall('(-?\d+)|(\))', s):
            if val:
                stack.append(TreeNode(int(val)))
            else:
                x = stack.pop()
                if not stack[-1].left:
                    stack[-1].left = x
                else:
                    stack[-1].right = x
        return stack[0] if stack else None
```

60 ms
