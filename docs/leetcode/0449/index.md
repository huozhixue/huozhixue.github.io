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


## 分析

### #1

类似 {{< lc "0428" >}}，最简单粗暴的是用 json。

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
84 ms

### #2

还可以根据前序遍历重构：
- 反序列化可以用 dfs 模拟序列化的过程
- 从遍历列表 Q 中弹出第一个元素作为 root
- 进入下一层的左右子树，元素大于限定值时就返回上一层

```python
class Codec:

    def serialize(self, root):
        return '' if not root else ','.join(
            filter(None, [str(root.val), self.serialize(root.left), self.serialize(root.right)]))

    def deserialize(self, data):
        def dfs(ma):
            if not Q or Q[0] > ma:
                return None
            x = Q.popleft()
            return TreeNode(x, dfs(x), dfs(ma))

        Q = deque(int(x) for x in data.split(',') if x)
        return dfs(inf)
```

72 ms

### #3

如果每个节点的值用固定长度来表示，那么分割符也可以去掉了。因为数值范围为 10^4，所以用两个字节就可以表示了。

## 解答

```python
class Codec:

    def int2str(self, val):
        return chr(val >> 7) + chr(val & 127)

    def str2int(self, s):
        return (ord(s[0]) << 7) + ord(s[1])

    def serialize(self, root):
        return '' if not root else self.int2str(root.val) + self.serialize(root.left) + self.serialize(root.right)

    def deserialize(self, data):
        def dfs(ma):
            if not Q or Q[0] > ma:
                return None
            x = Q.popleft()
            return TreeNode(x, dfs(x), dfs(ma))

        Q = deque(self.str2int(data[i:i+2]) for i in range(0, len(data), 2))
        return dfs(inf)
```
72 ms


