import { ChangeEvent } from 'react';
import { capitalizeFirstLetter } from '@/utils';

export enum SortField {
    Created = 'created',
    Updated = 'updated',
    Comments = 'comments',
};

export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc',
};

export type SortValue = {
    field: SortField,
    direction: SortDirection,
};

type SortListProps = {
    selected?: SortValue,
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
};

export const sortKeyValue = (sortValue: SortValue): string => `${sortValue.field}-${sortValue.direction}`;
export const getSortValue = (sortKeyValue: string): SortValue => {
    const [field, direction] = sortKeyValue.split('-');
    return { field: field as SortField, direction: direction as SortDirection };
};

export default function SortList(props: SortListProps) {
    const optionList = Object.values(SortField).reduce((arr, field) => {
        Object.values(SortDirection).forEach(direction => {
            const key = sortKeyValue({ field, direction });
            const orderLabel = direction === SortDirection.Asc ? '↓' : '↑';
            arr[key] = `${capitalizeFirstLetter(field)} ${orderLabel}`;
        });
        return arr;
    }, {} as Record<string, string>);

    return (
        <div className="flex">
            <select name="sort" onChange={props.onChange} value={props.selected && sortKeyValue(props.selected)}>
                {optionList && Object.keys(optionList).map(key => (
                    <option 
                        value={key} 
                        key={key}>
                            {optionList[key]}
                    </option>
                ))}
            </select>
        </div>
    )
}