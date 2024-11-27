import React from 'react';
import PostListItem from './PostListItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.ENDPOINT}/posts`);
  return res.data;
};

const PostList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: fetchPosts,
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(PostList)
  
  return (
    <div className='flex flex-col gap-12 mb-8'>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
    </div>
  )
}

export default PostList
