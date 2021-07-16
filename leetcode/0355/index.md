# 0355：设计推特（★）


## 题目

设计一个简化版的推特(Twitter)，可以让用户实现发送推文，关注/取消关注其他用户，能够看见关注人（包括自己）的最近十条推文。你的设计需要支持以下的几个功能：

- postTweet(userId, tweetId): 创建一条新的推文
- getNewsFeed(userId): 检索最近的十条推文。每个推文都必须是由此用户关注的人或者是用户自己发出的。推文必须按照时间顺序由最近的开始排序。
- follow(followerId, followeeId): 关注一个用户
- unfollow(followerId, followeeId): 取消关注一个用户

<!--more--> 

示例:

	Twitter twitter = new Twitter();

	// 用户1发送了一条新推文 (用户id = 1, 推文id = 5).
	twitter.postTweet(1, 5);

	// 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
	twitter.getNewsFeed(1);

	// 用户1关注了用户2.
	twitter.follow(1, 2);

	// 用户2发送了一个新推文 (推文id = 6).
	twitter.postTweet(2, 6);

	// 用户1的获取推文应当返回一个列表，其中包含两个推文，id分别为 -> [6, 5].
	// 推文id6应当在推文id5之前，因为它是在5之后发送的.
	twitter.getNewsFeed(1);

	// 用户1取消关注了用户2.
	twitter.unfollow(1, 2);

	// 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
	// 因为用户1已经不再关注用户2.
	twitter.getNewsFeed(1);

## 分析

维护一个时间变量 t，然后记录每个用户发过的推文及时间，记录每个用户的关注列表，检索时将相关的推文合并排序即可。

因为只需要检索最近的十条推文，所以只提取每个用户的后 10 条推文即可。

## 解答

```python
class Twitter:

    def __init__(self):
        self.t = 0
        self.tw = defaultdict(list)
        self.fo = defaultdict(set)

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tw[userId].append((tweetId, self.t))
        self.t += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        news = {tid: t for uid in self.fo[userId] | {userId} for tid, t in self.tw[uid][-10:]}
        return nlargest(10, news, key=news.get)

    def follow(self, followerId: int, followeeId: int) -> None:
        self.fo[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.fo[followerId].discard(followeeId)
```

36 ms

