import { useRef, useEffect, RefObject } from 'react';
import Card from '@/components/issues/card';
import useGithubIssues, { IssueType } from '@/server/github';
import { SortValue } from '@/components/sort';

type ListProps = {
    searchQuery: string,
    sortValue: SortValue,
    selected?: IssueType,
    onSelectIssue?: (issue: IssueType) => void,
};

export default function List(props: ListProps) {
    const { 
        issues, 
        fetchNextPage, 
        hasNextPage, 
        isLoading, 
        isError, 
        isFetchingNextPage 
    } = useGithubIssues(props.searchQuery, props.sortValue);
    const containerRef: RefObject<HTMLDivElement> = useRef(null);
    
    const onSelectIssue = (issue: IssueType): void => {
        if (props.onSelectIssue) props.onSelectIssue(issue);
    };

    const onScroll = (): void => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
            if (isLoading || isFetchingNextPage || !hasNextPage) return;
            fetchNextPage();
        }
    }

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.addEventListener('scroll', onScroll);
    });

    return (
        <div 
            className="space-y-4 bg-slate-50 border-r border-slate-300 p-4 overflow-auto max-h-[80vh]" 
            ref={containerRef}>
            {issues.length > 0 && issues.map((issue, index) => (
                <Card 
                    key={issue.id}
                    selected={props.selected && issue.id === props.selected.id}
                    issue={issue} 
                    onClick={() => onSelectIssue((issue as IssueType))} />
            ))}
            {isError && <span className="text-red-400">An error occurred, try another query.</span>}
            {(isLoading || isFetchingNextPage) && (
                <span className="text-gray-400 flex justify-center my-4">Loading...</span>
            )}
        </div>
    );
};