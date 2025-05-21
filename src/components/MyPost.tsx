import { useContext } from "react";
import Model from "./shared/Model";
import Post from "./shared/Post";
import UserContext from "./UserContext";
import dp from "../lib/DP";
import useSWR from "swr";
import Fetcher from "../lib/Fetcher";
import { Skeleton } from "antd";
import Empty from "./shared/Empty";

const MyPost = () => {
  const { session: user } = useContext(UserContext);
  const { data, error, isLoading } = useSWR("/post/myPost", Fetcher);

  return (
    <>
      <Model title="My Posts">
        {isLoading && (<Skeleton />)}
        {error && (<p className="text-center text-red-500">Failed to load posts</p> )}

        {data && data.posts.length === 0 && (<Empty/>)}
        
        {data &&
          data.posts.map((post: any) => (
            <Post
              key= {post._id}
              postId= {post._id}
              name= "You"
              dp= {dp(user.image, user.gender)}
              post_media= {post.media}
              created= {post.createdAt}
              icon= "delete"
            >
              {post.text}
            </Post>
          ))}
      </Model>
    </>
  );
};

export default MyPost;
