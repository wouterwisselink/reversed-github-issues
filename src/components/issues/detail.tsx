import React from 'react';
import {marked} from 'marked';
import { IssueType } from '@/server/github';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';

type DetailProps = {
    issue: IssueType,
};

export default function Detail(props: DetailProps) {
    return (
        <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(80vh + 2.3em)' }}>
            <h1 className="text-lg font-semibold">{ props.issue.title }</h1>
            <a 
                className="text-blue-700 underline flex gap-1 items-center text-sm"
                href={props.issue.html_url} 
                target="_blank">
                    Open issue on Github
                    <ArrowUpRightIcon className="size-3" />
                </a>
            <hr className="my-4 block" />
            <div 
                className="py-2 [&>p]:my-4 [&>h3]:font-bold [&>a]:text-blue-500 [&>ol]:px-3 [&>li]:list-disc" 
                dangerouslySetInnerHTML={{__html: marked.parse(props.issue.body)}} />
            
        </div>
    )
};