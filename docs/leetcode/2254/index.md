# 2254：设计视频共享平台（★★）


> <u>**[力扣第 2254 题](https://leetcode.cn/problems/design-video-sharing-platform/)**</u>

## 题目

<p>你有一个视频分享平台，用户可以上传和删除视频。每个 <code>video</code> 都是 <strong>字符串 </strong>类型的数字，其中字符串的第 <code>i</code> 位表示视频中第 <code>i</code> 分钟的内容。例如，第一个数字表示视频中第 <code>0</code> 分钟的内容，第二个数字表示视频中第 <code>1</code> 分钟的内容，以此类推。视频的观众也可以喜欢和不喜欢视频。该平台会跟踪每个视频的 <strong>观看次数</strong>、<strong>点赞次数 </strong>和 <strong>不喜欢次数</strong>。</p>

<p>当视频上传时，它与最小可用整数 <code>videoId</code> 相关联，<code>videoId</code> 从 <code>0</code> 开始的。一旦一个视频被删除，与该视频关联的 <code>videoId</code> 就可以用于另一个视频。</p>

<p>实现 <code>VideoSharingPlatform</code> 类:</p>

<ul>
<li><code>VideoSharingPlatform()</code> 初始化对象。</li>
<li><code>int upload(String video)</code> 用户上传一个 <code>video</code>. 返回与视频相关联的<code>videoId</code> 。</li>
<li><code>void remove(int videoId)</code> 如果存在与 <code>videoId</code> 相关联的视频，则删除该视频。</li>
<li><code>String watch(int videoId, int startMinute, int endMinute)</code> 如果有一个视频与 <code>videoId</code> 相关联，则将该视频的观看次数增加 <code>1</code>，并返回视频字符串的子字符串，从 <code>startMinute</code> 开始，以 <code>min(endMinute, video.length - 1</code><code>)</code>(含边界) 结束。否则，返回 <code>"-1"</code>。</li>
<li><code>void like(int videoId)</code> 如果存在与 <code>videoId</code> 相关联的视频，则将与 <code>videoId</code> 相关联的视频的点赞数增加 <code>1</code>。</li>
<li><code>void dislike(int videoId)</code> 如果存在与 <code>videoId</code> 相关联的视频，则将与 <code>videoId</code> 相关联的视频上的不喜欢次数增加 <code>1</code>。</li>
<li><code>int[] getLikesAndDislikes(int videoId)</code> 返回一个长度为 <code>2</code> ，<strong>下标从 0 开始 </strong>的整型数组，其中 <code>values[0]</code> 是与 <code>videoId</code> 相关联的视频上的点赞数，<code>values[1]</code> 是不喜欢数。如果没有与 <code>videoId</code> 相关联的视频，则返回 <code>[-1]</code>。</li>
<li><code>int getViews(int videoId)</code> 返回与 <code>videoId</code> 相关联的视频的观看次数，如果没有与 <code>videoId</code> 相关联的视频，返回 <code>-1</code>。</li>
</ul>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入</strong>
["VideoSharingPlatform", "upload", "upload", "remove", "remove", "upload", "watch", "watch", "like", "dislike", "dislike", "getLikesAndDislikes", "getViews"]
[[], ["123"], ["456"], [4], [0], ["789"], [1, 0, 5], [1, 0, 1], [1], [1], [1], [1], [1]]
<strong>输出</strong>
[null, 0, 1, null, null, 0, "456", "45", null, null, null, [1, 2], 2]

<strong>解释</strong>
VideoSharingPlatform videoSharingPlatform = new VideoSharingPlatform();
videoSharingPlatform.upload("123");          // 最小的可用 videoId 是 0，所以返回 0。
videoSharingPlatform.upload("456");          // 最小的可用 videoId 是 1，所以返回 1。
videoSharingPlatform.remove(4);              // 没有与 videoId 4 相关联的视频，所以什么都不做。
videoSharingPlatform.remove(0);              // 删除与 videoId 0 关联的视频。
videoSharingPlatform.upload("789");          // 由于与 videoId 0 相关联的视频被删除，
// 0 是最小的可用 videoId，所以返回 0。
videoSharingPlatform.watch(1, 0, 5);         // 与 videoId 1 关联的视频为 "456"。
// 从分钟 0 到分钟 min(5,3 - 1)= 2 的视频为 "456"，因此返回 "456"。
videoSharingPlatform.watch(1, 0, 1);         // 与 videoId 1 关联的视频为 "456"。
// 从分钟 0 到分钟 min(1,3 - 1)= 1 的视频为 "45"，因此返回 "45"。
videoSharingPlatform.like(1);                // 增加与 videoId 1 相关的视频的点赞数。
videoSharingPlatform.dislike(1);             // 增加与 videoId 1 相关联的视频的不喜欢的数量。
videoSharingPlatform.dislike(1);             // 增加与 videoId 1 相关联的视频的不喜欢的数量。
videoSharingPlatform.getLikesAndDislikes(1); // 在与 videoId 1 相关的视频中有 1 个喜欢和 2 个不喜欢，因此返回[1,2]。
videoSharingPlatform.getViews(1);            // 与 videoId 1 相关联的视频有 2 个观看数，因此返回2。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入</strong>
["VideoSharingPlatform", "remove", "watch", "like", "dislike", "getLikesAndDislikes", "getViews"]
[[], [0], [0, 0, 1], [0], [0], [0], [0]]
<strong>输出</strong>
[null, null, "-1", null, null, [-1], -1]

<strong>解释</strong>
VideoSharingPlatform videoSharingPlatform = new VideoSharingPlatform();
videoSharingPlatform.remove(0);              // 没有与 videoId 0 相关联的视频，所以什么都不做。
videoSharingPlatform.watch(0, 0, 1);         // 没有与 videoId 0 相关联的视频，因此返回 "-1"。
videoSharingPlatform.like(0);                // 没有与 videoId 0 相关联的视频，所以什么都不做。
videoSharingPlatform.dislike(0);             // 没有与 videoId 0 相关联的视频，所以什么都不做。
videoSharingPlatform.getLikesAndDislikes(0); // 没有与 videoId 0 相关联的视频，因此返回 [-1]。
videoSharingPlatform.getViews(0);            // 没有视频与 videoId 0 相关联，因此返回 -1。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= video.length &lt;= 10<sup>5</sup></code></li>
<li>调用 <code>upload</code> 时所有 <code>video.length</code> 的总和不会超过 <code>10<sup>5</sup></code></li>
<li><code>video</code> 由数字组成</li>
<li><code>0 &lt;= videoId &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= startMinute &lt; endMinute &lt; 10<sup>5</sup></code></li>
<li><code>startMinute &lt; video.length</code></li>
<li>调用  <code>watch</code> 时所有 <code>endMinute - startMinute</code> 的总和不会超过 <code>10<sup>5</sup></code>。</li>
<li>所有函数 <strong>总共 </strong>最多调用 <code>10<sup>5</sup></code> 次。</li>
</ul>


**相似问题：**
- [1348：推文计数（2036 分）](/leetcode/1348)
- [1472：设计浏览器历史记录（1453 分）](/leetcode/1472)
- [2456：最流行的视频创作者（1548 分）](/leetcode/2456)


## 分析

- 哈希表保存每个 videoId 对应的内容、观看数、喜欢数、不喜欢数
- 用堆 pq 维护空闲的 id，若 pq 为空，就取现有的视频数+1 作为 id

## 解答

```python
class VideoSharingPlatform:

    def __init__(self):
        self.pq = []
        self.d = {}
        self.id = -1

    def upload(self, video: str) -> int:
        if self.pq:
            vid = heappop(self.pq)
        else:
            self.id += 1
            vid = self.id
        self.d[vid] = [video, 0, 0, 0]
        return vid

    def remove(self, videoId: int) -> None:
        if videoId in self.d:
            del self.d[videoId]
            heappush(self.pq, videoId)

    def watch(self, videoId: int, startMinute: int, endMinute: int) -> str:
        if videoId not in self.d:
            return "-1"
        self.d[videoId][3] += 1
        return self.d[videoId][0][startMinute:endMinute+1]

    def like(self, videoId: int) -> None:
        if videoId in self.d:
            self.d[videoId][1] += 1

    def dislike(self, videoId: int) -> None:
        if videoId in self.d:
            self.d[videoId][2] += 1

    def getLikesAndDislikes(self, videoId: int) -> List[int]:
        if videoId not in self.d:
            return [-1]
        return self.d[videoId][1:3]

    def getViews(self, videoId: int) -> int:
        if videoId not in self.d:
            return -1
        return self.d[videoId][3]
```

412 ms
