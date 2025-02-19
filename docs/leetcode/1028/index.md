# 1028：从先序遍历还原二叉树（1797 分）


> <u>**[力扣第 132 场周赛第 4 题](https://leetcode.cn/problems/recover-a-tree-from-preorder-traversal/)**</u>

## 题目

<p>我们从二叉树的根节点 <code>root</code> 开始进行深度优先搜索。</p>

<p>在遍历中的每个节点处，我们输出 <code>D</code> 条短划线（其中 <code>D</code> 是该节点的深度），然后输出该节点的值。（<em>如果节点的深度为 <code>D</code>，则其直接子节点的深度为 <code>D + 1</code>。根节点的深度为 <code>0</code>）。</em></p>

<p>如果节点只有一个子节点，那么保证该子节点为左子节点。</p>

<p>给出遍历输出 <code>S</code>，还原树并返回其根节点 <code>root</code>。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/04/12/recover-a-tree-from-preorder-traversal.png" style="height: 200px; width: 320px;"></strong></p>

<pre><strong>输入：</strong>&quot;1-2--3--4-5--6--7&quot;
<strong>输出：</strong>[1,2,5,3,4,6,7]
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/04/12/screen-shot-2019-04-10-at-114101-pm.png" style="height: 250px; width: 256px;"></strong></p>

<pre><strong>输入：</strong>&quot;1-2--3---4-5--6---7&quot;
<strong>输出：</strong>[1,2,5,3,null,6,null,4,null,7]
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/04/12/screen-shot-2019-04-10-at-114955-pm.png" style="height: 250px; width: 276px;"></p>

<pre><strong>输入：</strong>&quot;1-401--349---90--88&quot;
<strong>输出：</strong>[1,401,null,349,88,90]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>原始树中的节点数介于 <code>1</code> 和 <code>1000</code> 之间。</li>
<li>每个节点的值介于 <code>1</code> 和 <code>10 ^ 9</code> 之间。</li>
</ul>




## 分析

- 先正则提取出每个节点的值和深度，然后遍历
	- 假如上个节点比当前节点的深度小 1
		- 当前节点即为上个节点的子节点，应该接到上个节点的下面
		- 如果上个节点还没有左子树，就接到左边，否则接到右边
	- 否则，去掉上个节点直到找到比当前节点深度小 1 的节点，转为上一步
- 可以用栈模拟整个过程

## 解答


```python
class Solution:
    def recoverFromPreorder(self, traversal: str) -> Optional[TreeNode]:
        sk = []
        for h,x in re.findall('(-*)(\d+)',traversal):
            h,x = len(h),int(x)
            u = TreeNode(x)
            while sk and sk[-1][0]>=h:
                sk.pop()
            if sk:
                fa = sk[-1][1]
                if fa.left:
                    fa.right = u
                else:
                    fa.left = u
            sk.append((h,u))
        return sk[0][1]
```
4 ms
