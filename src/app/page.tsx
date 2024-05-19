"use client";
import { ChangeEvent, useState } from 'react';
import { IssueType } from '@/server/github';
import Searchbar from '@/components/searchbar';
import CardList from '@/components/issues/list';
import Detail from '@/components/issues/detail';
import SortList, { SortField, SortDirection, getSortValue, sortKeyValue } from '@/components/sort';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string|null>(null);
  const [selectedIssue, setSelectedIssue] = useState<IssueType|undefined>();
  const [sortKey, setSortKey] = useState<string>(sortKeyValue({ 
    field: SortField.Created,
    direction: SortDirection.Desc,
  }));

  const onChangeSort = (event: ChangeEvent<HTMLSelectElement>): void => {
    console.log('onChangeSort', event.target.value);
    setSortKey(event.target.value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-500 to-blue-500 p-4">
      <Searchbar onSearch={query => setSearchQuery(query)} />
      <SortList onChange={onChangeSort} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg shadow-md overflow-hidden max-w-[1400px] m-auto">
        {searchQuery && (
          <CardList 
            selected={selectedIssue}
            sortValue={getSortValue(sortKey)}
            searchQuery={searchQuery} 
            onSelectIssue={issue => setSelectedIssue(issue)} />
        )}
        <div className="space-y-4 bg-white">
          {selectedIssue && <Detail issue={selectedIssue} />}
        </div>
      </div>
    </main>
  );
}
