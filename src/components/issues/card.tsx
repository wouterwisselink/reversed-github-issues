import React from 'react'
import { IssueType } from '@/server/github';
import { stripHtmlAndTruncate, parseDateTime } from '@/utils';
import { twMerge } from 'tailwind-merge';

export type CardProps = {
  selected?: boolean,
  issue: IssueType,
  onClick?: () => void,
};

export default function Card({ issue, onClick, selected = false }: CardProps) {
  return (
    <div className={twMerge(
      'p-4 mb-4 border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer', 
      selected && 'border-sky-500 border-2'
    )} onClick={onClick}>
      <div className="flex items-center justify-between mb-2">
        <span className="p-1 text-xs font-semibold text-white bg-green-500 rounded uppercase">{ issue.state }</span>
        <div className="text-xs text-gray-500">
          <time dateTime={issue.created_at}>{ parseDateTime(issue.created_at) }</time> 
          &nbsp; &bull; &nbsp;
          <span>{ issue.comments } comment(s)</span>
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{ issue.title }</h3>
      <p className="text-sm text-gray-700">
        { issue.body && stripHtmlAndTruncate(issue.body, 100) }
      </p>
    </div>
  )
}