# 0297：二叉树的序列化与反序列化（★★）


> <u>**[力扣第 297 题](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)**</u>

## 题目

<p>序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。</p>

<p>请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。</p>

<p><strong>提示: </strong>输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 <a href="https://support.leetcode.cn/hc/kb/article/1567641/">LeetCode 序列化二叉树的格式</a>。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg" style="width: 442px; height: 324px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,null,null,4,5]
<strong>输出：</strong>[1,2,3,null,null,4,5]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>[1]
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>root = [1,2]
<strong>输出：</strong>[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中结点数在范围 <code>[0, 10<sup>4</sup>]</code> 内</li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0271：字符串的编码与解码](/leetcode/0271)
- [0449：序列化和反序列化二叉搜索树](/leetcode/0449)
- [0652：寻找重复的子树](/leetcode/0652)
- [0428：序列化和反序列化 N 叉树](/leetcode/0428)


## 分析

### #1

- 最简单粗暴的是 json 做法
- 将树转为多重字典，用 json 序列化/反序列化

```python
class Codec:

    def serialize(self, root):
        def dfs(node):
            if not node:
                return 'None'
            return {'val': node.val, 'left':dfs(node.left), 'right':dfs(node.right) }
        return json.dumps(dfs(root))

    def deserialize(self, data): 
        def dfs(data):
            if data=='None':
                return None
            return TreeNode(data['val'], dfs(data['left']), dfs(data['right']))
        return dfs(json.loads(data))
```
128 ms

### #2

- 也可以用树的遍历列表，空节点用 '#' 表示即可
- 序列化时，递归地拼接遍历列表
- 反序列化时，从 Q 中弹出第一个元素作为 root，然后递归地构建左右子树
- 遇到空节点时就返回上一层递归即可

## 解答

```python
class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        """
        def dfs(u):
            if not u:
                return '#'
            return str(u.val)+','+dfs(u.left)+','+dfs(u.right)
        return dfs(root)
            
    def deserialize(self, data):
        """Decodes your encoded data to tree.
        
        :type data: str
        :rtype: TreeNode
        """
        def dfs():
            u = Q.popleft()
            if u=='#':
                return None
            return TreeNode(u,dfs(),dfs())
        Q = deque(data.split(','))
        return dfs()
```
82 ms

