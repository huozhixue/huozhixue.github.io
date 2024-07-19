# 0449：序列化和反序列化二叉搜索树（★）


> <u>**[力扣第 449 题](https://leetcode.cn/problems/serialize-and-deserialize-bst/)**</u>

## 题目

<p>序列化是将数据结构或对象转换为一系列位的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，以便稍后在同一个或另一个计算机环境中重建。</p>

<p>设计一个算法来序列化和反序列化<strong> 二叉搜索树</strong> 。 对序列化/反序列化算法的工作方式没有限制。 您只需确保二叉搜索树可以序列化为字符串，并且可以将该字符串反序列化为最初的二叉搜索树。</p>

<p><strong>编码的字符串应尽可能紧凑。</strong></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>root = [2,1,3]
<strong>输出：</strong>[2,1,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数范围是 <code>[0, 10<sup>4</sup>]</code></li>
<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
<li>题目数据 <strong>保证</strong> 输入的树是一棵二叉搜索树。</li>
</ul>


**相似问题：**
- [0297：二叉树的序列化与反序列化](/leetcode/0297)
- [0652：寻找重复的子树](/leetcode/0652)
- [0428：序列化和反序列化 N 叉树](/leetcode/0428)


## 分析

-  {{< lc "0428" >}} 的特殊版，可以用 json，也可以用先序 dfs
- 由于是二叉搜索树，可以根据值的大小中止递归，无需用 '#' 代表空节点了
- 注意值的范围可以用两个字节表示，那么可以去掉分隔符，直接转为两个ASCII 码，更为紧凑

## 解答

```python
class Codec:

    def i2s(self,i):
        return chr(i>>8)+chr(i&255)

    def s2i(self,s):
        return (ord(s[0])<<8)|ord(s[1])

    def serialize(self, root: Optional[TreeNode]) -> str:
        """Encodes a tree to a single string.
        """
        def dfs(u):
            if not u:
                return ''
            return self.i2s(u.val)+dfs(u.left)+dfs(u.right)
        return dfs(root)
        
    def deserialize(self, data: str) -> Optional[TreeNode]:
        """Decodes your encoded data to tree.
        """
        def dfs(ma):
            if not Q or Q[0]>ma:
                return None
            x = Q.popleft()
            return TreeNode(x, dfs(x), dfs(ma))

        Q = deque(self.s2i(data[i:i+2]) for i in range(0, len(data), 2))
        return dfs(inf)
```
50 ms


