import { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { SortValue, sortKeyValue } from '@/components/sort';

export type IssueType = {
  id: number;
  title: string;
  state: string;
  created_at: string;
  body: string;
  comments: number;
  html_url: string;
  user: { login: string };
}

const fetchIssues = async ({ pageParam = 1, org, sortValue }: { pageParam: number; org: string, sortValue: SortValue }) => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${org}/issues?page=${pageParam}&per_page=10&sort=${sortValue.field}&direction=${sortValue.direction}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const issues = await response.json();
  return { issues, nextPage: pageParam + 1 };
};

const useGithubIssues = (org: string, sortValue: SortValue) => {
  const queryClient = useQueryClient();
  const queryInfo = useInfiniteQuery({
    queryKey: ['issues', org, sortKeyValue(sortValue)],
    queryFn: ({ pageParam = 1 }) => fetchIssues({ pageParam, org, sortValue }),
    getNextPageParam: (lastPage) => lastPage.issues.length ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (org) {
      queryClient.invalidateQueries({
        queryKey: ['issues', org, sortValue],
        exact: true,
      });
    }
  }, [sortValue, org, queryClient]);

  return {
    issues: queryInfo.data?.pages.flatMap(page => page.issues) || [],
    fetchNextPage: queryInfo.fetchNextPage,
    hasNextPage: queryInfo.hasNextPage,
    isLoading: queryInfo.isLoading,
    isError: queryInfo.isError,
    isFetchingNextPage: queryInfo.isFetchingNextPage,
  };
};

export default useGithubIssues;
