# 0889：根据前序和后序遍历构造二叉树（★★）



## 题目

返回与给定的前序和后序遍历匹配的任何二叉树。

pre 和 post 遍历中的值是不同的正整数。
 
每个输入保证至少有一个答案。如果有多个答案，可以返回其中一个。


 <!--more--> 
 
示例：

	输入：pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
	输出：[1,2,3,4,5,6,7]

 
## 分析

和 {{< lc "0105" >}} 类似的思路。pre[0] 和 pos[-1] 是根节点，pre[1] 有两种情况：

	存在左子树，pre[1] 代表左子树
	
	不存在左子树，pre[1] 代表右子树
	
这里有个巧妙的想法。将右子树所有节点移到左子树，二叉树的前序和后序遍历不变。因此可以令 pre[1] 代表左子树。

在 post 中找到 pre[1] 的位置 i，那么 post[:i+1]、post[i+1:-1] 分别代表左子树、右子树。
对应的 pre[1:i+2]、pre[i+2:] 分别代表左子树、右子树。即可递归。

## 解答

```python
def constructFromPrePost(self, pre: List[int], post: List[int]) -> TreeNode:
	if not pre:
		return None
	if len(pre) == 1:
		return TreeNode(pre[0])
	i = post.index(pre[1])
	return TreeNode(pre[0], self.constructFromPrePost(pre[1:i+2], post[:i+1]), self.constructFromPrePost(pre[i+2:], post[i+1:-1]))
```

60 ms

