# 0449：序列化和反序列化二叉搜索树（★★★）


## 题目

序列化是将数据结构或对象转换为一系列位的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，以便稍后在同一个或另一个计算机环境中重建。

设计一个算法来序列化和反序列化 二叉搜索树 。 对序列化/反序列化算法的工作方式没有限制。 您只需确保二叉搜索树可以序列化为字符串，并且可以将该字符串反序列化为最初的二叉搜索树。

编码的字符串应尽可能紧凑。

提示：

- 树中节点数范围是 [0, 10^4]
- 0 <= Node.val <= 10^4
- 题目数据 保证 输入的树是一棵二叉搜索树。

 <!--more--> 
 
示例 1：

	输入：root = [2,1,3]
	输出：[2,1,3]
	
示例 2：

	输入：root = []
	输出：[]


## 分析

### #1

二叉搜索树根据前序遍历即可重构。

反序列化可以用 dfs 模拟序列化的过程。从遍历列表 queue 中弹出第一个元素作为 root，
然后进入下一层的左右子树，元素大于限定值时就返回上一层，即可重构出二叉树。

```python

class Codec:

    def serialize(self, root):
        return '' if not root else ','.join(
            filter(None, [str(root.val), self.serialize(root.left), self.serialize(root.right)]))

    def deserialize(self, data):
        def help(stop):
            if not queue or queue[0] > stop:
                return None
            val = queue.popleft()
            return TreeNode(val, help(val), help(stop))

        queue = deque(int(val) for val in data.split(',') if val)
        return help(float('inf'))
```

100 ms

### #2

如果每个节点的值用固定长度来表示，那么分割符也可以去掉了。因为数值范围为 0-10^4，所以用两个字节就可以表示了。

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
        def help(stop):
            if not queue or queue[0] > stop:
                return None
            val = queue.popleft()
            return TreeNode(val, help(val), help(stop))

        queue = deque(self.str2int(data[i:i+2]) for i in range(0, len(data), 2))
        return help(float('inf'))
```

84 ms


