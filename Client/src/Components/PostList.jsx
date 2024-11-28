import React from 'react';
import PostListItem from './PostListItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchPosts = async ({ pageParam = 1, searchParams }) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, searchParams }),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
  });

  if (error) return <div>Error: {error.message}</div>;

  const allPosts = data?.pages.flatMap(page => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        post && post._id ? <PostListItem key={post._id} post={post} /> : null
      ))}
    </InfiniteScroll>
  );
};

export default PostList;