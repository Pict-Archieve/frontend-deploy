import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBookmarkedPostsPaginated } from "../../services/post.services";
import PostListElement from "../PostListElement/PostListElement";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import styles from "./BookmarkedPost.module.css";

function BookmarkedPost() {
  const { id } = useParams();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["bookmarked-post", id],
      getNextPageParam: (prevData) => prevData.page.nextPage,
      queryFn: ({ pageParam = 1 }) =>
        getBookmarkedPostsPaginated(id, pageParam, 5),
    });

  let scrollFooterElement = <p>Nothing More to Load</p>;
  if (isFetchingNextPage || isLoading) {
    const skeletonPost = [];
    for (let i = 0; i < 5; i += 1) {
      skeletonPost.push(i);
    }

    scrollFooterElement = (
      <div>
        {skeletonPost.map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      if (!event.target) return;

      const target = event.target;
      const scrollElement = target.scrollingElement;
      if (!scrollElement) return;
      const { scrollHeight, scrollTop, clientHeight } = scrollElement;
      const scrollHeightRemaining = scrollHeight - scrollTop;

      if (!fetching && scrollHeightRemaining <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage]);

  const isEmpty = data?.pages[0].data.length === 0;
  return (
    <div className={styles.BookmarkedPost}>
      {isEmpty ? <p>No Bookmarked Post</p> : null}
      {!isEmpty && (
        <>
          {data?.pages
            .flatMap((page) => page.data)
            .map((post) => (
              <PostListElement post={post} key={post._id} />
            ))}
          <div className={styles.scrollFooter}>{scrollFooterElement}</div>
        </>
      )}
    </div>
  );
}

export default BookmarkedPost;
