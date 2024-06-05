# 1104：二叉树寻路（1544 分）


> <u>**[力扣第 143 场周赛第 2 题](https://leetcode.cn/problems/path-in-zigzag-labelled-binary-tree/)**</u>

## 题目

<p>在一棵无限的二叉树上，每个节点都有两个子节点，树中的节点 <strong>逐行</strong> 依次按 &ldquo;之&rdquo; 字形进行标记。</p>

<p>如下图所示，在奇数行（即，第一行、第三行、第五行&hellip;&hellip;）中，按从左到右的顺序进行标记；</p>

<p>而偶数行（即，第二行、第四行、第六行&hellip;&hellip;）中，按从右到左的顺序进行标记。</p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/06/28/tree.png" style="height: 138px; width: 300px;"></p>

<p>给你树上某一个节点的标号 <code>label</code>，请你返回从根节点到该标号为 <code>label</code> 节点的路径，该路径是由途经的节点标号所组成的。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>label = 14
<strong>输出：</strong>[1,3,4,14]
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>label = 26
<strong>输出：</strong>[1,2,6,10,26]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= label &lt;= 10^6</code></li>
</ul>


## 分析

如果是原本的满二叉树，节点 x 的父节点就是 x//2，递推即可。
本题在偶数行反转了序号，因此需要找到 x 在该层对应的镜像节点 y，才是原本的序号。

第 h 层的序号范围是 [2^(h-1), 2^h-1]，因此 y = 2^(h-1)+2^h-1-x。
每层递推即可。

## 解答

```python
def pathInZigZagTree(self, label: int) -> List[int]:
    res = [label]
    while label > 1:
        label = ((1 << (label.bit_length() - 1)) * 3 - 1 - label) // 2
        res.append(label)
    return res[::-1]
```
24 ms
