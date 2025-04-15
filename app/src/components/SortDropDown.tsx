import React from 'react';

type SortKey = 'creationDate' | 'dueDate' | 'status';
type SortOrder = 'asc' | 'desc';

interface Props {
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSortKeyChange: (key: SortKey) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

const SortDropdown: React.FC<Props> = ({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderChange,
}) => {
  return (
    <div className="sort-dropdown">
      <label>
        Sort by:
        <select value={sortKey} onChange={(e) => onSortKeyChange(e.target.value as SortKey)}>
          <option value="creationDate">Creation Date</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>
      </label>

      <label>
        Order:
        <select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </label>
    </div>
  );
};

export default SortDropdown;

/*
    To implement in TaskList.tsx page:
    
    imports
      -import SortDropdown from '@components/SortDropDown';
    
    variables
      -const [sortKey, setSortKey] = useState<'creationDate' | 'dueDate' | 'status'>('creationDate');
      -const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    component
      <SortDropdown
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortKeyChange={setSortKey}
        onSortOrderChange={setSortOrder}
      />
*/