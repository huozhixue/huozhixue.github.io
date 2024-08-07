# 0654：最大二叉树（★）


> <u>**[力扣第 654 题](https://leetcode.cn/problems/maximum-binary-tree/)**</u>

## 题目

<p>给定一个不重复的整数数组 <code>nums</code> 。 <strong>最大二叉树</strong> 可以用下面的算法从 <code>nums</code> 递归地构建:</p>

<ol>
<li>创建一个根节点，其值为 <code>nums</code> 中的最大值。</li>
<li>递归地在最大值 <strong>左边</strong> 的 <strong>子数组前缀上</strong> 构建左子树。</li>
<li>递归地在最大值 <strong>右边</strong> 的 <strong>子数组后缀上</strong> 构建右子树。</li>
</ol>

<p>返回 <em><code>nums</code> 构建的 </em><strong><em>最大二叉树</em> </strong>。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/tree1.jpg" />
<pre>
<strong>输入：</strong>nums = [3,2,1,6,0,5]
<strong>输出：</strong>[6,3,5,null,2,0,null,null,1]
<strong>解释：</strong>递归调用如下所示：
- [3,2,1,6,0,5] 中的最大值是 6 ，左边部分是 [3,2,1] ，右边部分是 [0,5] 。
- [3,2,1] 中的最大值是 3 ，左边部分是 [] ，右边部分是 [2,1] 。
- 空数组，无子节点。
- [2,1] 中的最大值是 2 ，左边部分是 [] ，右边部分是 [1] 。
- 空数组，无子节点。
- 只有一个元素，所以子节点是一个值为 1 的节点。
- [0,5] 中的最大值是 5 ，左边部分是 [0] ，右边部分是 [] 。
- 只有一个元素，所以子节点是一个值为 0 的节点。
- 空数组，无子节点。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/tree2.jpg" />
<pre>
<strong>输入：</strong>nums = [3,2,1]
<strong>输出：</strong>[3,null,2,null,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>
</ul>


**相似问题：**
- [0998：最大二叉树 II（1497 分）](/leetcode/0998)


## 分析

递归构造即可。

## 解答

```python
def constructMaximumBinaryTree(self, nums: List[int]) -> TreeNode:
    if not nums:
        return None
    i = nums.index(max(nums))
    return TreeNode(nums[i], self.constructMaximumBinaryTree(nums[:i]), self.constructMaximumBinaryTree(nums[i+1:]))
```

148 ms
 

