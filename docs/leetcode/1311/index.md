# 1311：获取你好友已观看的视频（1652 分）


> <u>**[力扣第 170 场周赛第 3 题](https://leetcode.cn/problems/get-watched-videos-by-your-friends/)**</u>

## 题目

<p>有 <code>n</code> 个人，每个人都有一个  <code>0</code> 到 <code>n-1</code> 的唯一 <em>id</em> 。</p>

<p>给你数组 <code>watchedVideos</code>  和 <code>friends</code> ，其中 <code>watchedVideos[i]</code>  和 <code>friends[i]</code> 分别表示 <code>id = i</code> 的人观看过的视频列表和他的好友列表。</p>

<p>Level <strong>1</strong> 的视频包含所有你好友观看过的视频，level <strong>2</strong> 的视频包含所有你好友的好友观看过的视频，以此类推。一般的，Level 为 <strong>k</strong> 的视频包含所有从你出发，最短距离为 <strong>k</strong> 的好友观看过的视频。</p>

<p>给定你的 <code>id</code>  和一个 <code>level</code> 值，请你找出所有指定 <code>level</code> 的视频，并将它们按观看频率升序返回。如果有频率相同的视频，请将它们按字母顺序从小到大排列。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/03/leetcode_friends_1.png" style="height: 179px; width: 129px;"></strong></p>

<pre><strong>输入：</strong>watchedVideos = [[&quot;A&quot;,&quot;B&quot;],[&quot;C&quot;],[&quot;B&quot;,&quot;C&quot;],[&quot;D&quot;]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 1
<strong>输出：</strong>[&quot;B&quot;,&quot;C&quot;]
<strong>解释：</strong>
你的 id 为 0（绿色），你的朋友包括（黄色）：
id 为 1 -&gt; watchedVideos = [&quot;C&quot;]
id 为 2 -&gt; watchedVideos = [&quot;B&quot;,&quot;C&quot;]
你朋友观看过视频的频率为：
B -&gt; 1
C -&gt; 2
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/03/leetcode_friends_2.png" style="height: 179px; width: 129px;"></strong></p>

<pre><strong>输入：</strong>watchedVideos = [[&quot;A&quot;,&quot;B&quot;],[&quot;C&quot;],[&quot;B&quot;,&quot;C&quot;],[&quot;D&quot;]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 2
<strong>输出：</strong>[&quot;D&quot;]
<strong>解释：</strong>
你的 id 为 0（绿色），你朋友的朋友只有一个人，他的 id 为 3（黄色）。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == watchedVideos.length == friends.length</code></li>
<li><code>2 &lt;= n &lt;= 100</code></li>
<li><code>1 &lt;= watchedVideos[i].length &lt;= 100</code></li>
<li><code>1 &lt;= watchedVideos[i][j].length &lt;= 8</code></li>
<li><code>0 &lt;= friends[i].length &lt; n</code></li>
<li><code>0 &lt;= friends[i][j] &lt; n</code></li>
<li><code>0 &lt;= id &lt; n</code></li>
<li><code>1 &lt;= level &lt; n</code></li>
<li>如果 <code>friends[i]</code> 包含 <code>j</code> ，那么 <code>friends[j]</code> 包含 <code>i</code></li>
</ul>




## 分析

bfs 得到所有最短距离 k 的朋友，再统计视频即可。

## 解答


```python
def watchedVideosByFriends(self, watchedVideos: List[List[str]], friends: List[List[int]], id: int, level: int) -> List[str]:
	Q, vis = deque([id]), {id}
	for _ in range(level):
		tmp = []
		for i in Q:
			for j in friends[i]:
				if j not in vis:
					tmp.append(j)
					vis.add(j)
		Q = tmp
	ct = Counter()
	for i in Q:
		for v in watchedVideos[i]:
			ct[v] += 1
	return sorted(ct, key=lambda x: (ct[x], x))
```
60 ms
