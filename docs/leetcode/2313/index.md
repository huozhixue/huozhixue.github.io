# 2313：二叉树中得到结果所需的最少翻转次数（★★）


> <u>**[力扣第 2313 题](https://leetcode.cn/problems/minimum-flips-in-binary-tree-to-get-result/)**</u>

## 题目

<p>给定<strong>二叉树</strong>的根 <code>root</code>，具有以下属性:</p>

<ul>
<li><strong>叶节点 </strong>的值为 <code>0</code> 或 <code>1</code>，分别表示 <code>false</code> 和 <code>true</code>。</li>
<li><strong>非叶节点</strong>的值为 <code>2</code>、<code>3</code>、<code>4</code>、<code>5</code>，分别表示布尔运算 <code>OR</code>, <code>AND</code>, <code>XOR</code>, <code>NOT</code>。</li>
</ul>

<p>您还将得到一个布尔型 <code>result</code>，这是 <code>root</code> 节点的期望 <strong>评价</strong><strong> </strong>结果。</p>

<p data-group="1-1">对节点的评价计算如下:</p>

<ul>
<li>如果节点是叶节点，则评价是节点的 <strong>值</strong>，即 <code>true</code> 或 <code>false</code>.</li>
<li>否则, 将其值的布尔运算应用于子节点的 <strong>评价</strong>，该节点的 <strong>评价 </strong>即为布尔运算后的结果。</li>
</ul>

<p>在一个操作中，您可以 <strong>翻转 </strong>一个叶节点，这将导致一个 <code>false</code> 节点变为 <code>true</code> 节点，一个 <code>true</code> 节点变为 <code>false</code> 节点。</p>

<p>返回<em>需要执行的最小操作数，以使 </em><code>root</code><em> 的</em><em>评价得到 </em><code>result</code>。可以证明，总有办法达到 <code>result</code>。</p>

<p data-group="1-1"><strong>叶节点 </strong>是没有子节点的节点。</p>

<p>注意: <code>NOT</code> 节点只有左孩子或只有右孩子，但其他非叶节点同时拥有左孩子和右孩子。</p>



<p><strong class="example">示例 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/06/20/operationstree.png" style="width: 500px; height: 179px;" />
<pre>
<strong>输入:</strong> root = [3,5,4,2,null,1,1,1,0], result = true
<strong>输出:</strong> 2
<strong>解释:</strong>
可以证明，至少需要翻转 2 个节点才能使树的 root 评价为 true。上面的图显示了实现这一目标的一种方法。
</pre>

<p><strong class="example">示例 2:</strong></p>

<pre>
<strong>输入:</strong> root = [0], result = false
<strong>输出:</strong> 0
<strong>解释:</strong>
树的 root 的评价已经为 false，所以 0 个节点必须翻转。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>树中的节点数在 <code>[1, 10<sup>5</sup>]</code> 范围内。</li>
<li><code>0 &lt;= Node.val &lt;= 5</code></li>
<li><code>OR</code>, <code>AND</code>, <code>XOR</code> 节点有 <code>2</code> 个子节点。</li>
<li><code>NOT</code> 只有一个 <code>1</code> 子节点。</li>
<li>叶节点的值为 <code>0</code> 或 <code>1</code>.</li>
<li>非叶节点的值为<code>2</code>, <code>3</code>, <code>4</code>, <code>5</code>.</li>
</ul>


**相似问题：**
- [1612：检查两棵二叉表达式树是否等价](/leetcode/1612)
- [1628：设计带解析函数的表达式树](/leetcode/1628)
- [2331：计算布尔二叉树的值（1303 分）](/leetcode/2331)


## 分析

- 树形 dp，返回子树评价为 0/1 的最小操作数，递推即可

## 解答

```python
class Solution:
    def minimumFlips(self, root: Optional[TreeNode], result: bool) -> int:
        def dfs(u):
            if not u.left and not u.right:
                return u.val,u.val^1
            if u.val==5:
                a,b = dfs(u.left or u.right)
                return b,a
            a,b = dfs(u.left),dfs(u.right)
            if u.val==2:
                return a[0]+b[0],min(a[1]+b[0],a[0]+b[1],a[1]+b[1])
            if u.val==3:
                return min(a[0]+b[0],a[0]+b[1],a[1]+b[0]),a[1]+b[1]
            return min(a[0]+b[0],a[1]+b[1]),min(a[0]+b[1],a[1]+b[0])
        return dfs(root)[result]
```
111 ms
