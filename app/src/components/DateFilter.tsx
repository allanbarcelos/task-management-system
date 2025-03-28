// src/components/DateFilter.tsx
import React, { useState } from 'react';

interface DateFilterProps {
  onFilterChange: (startDate: string, endDate: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilterChange(startDate, endDate);
  };

  return (
    <div>
      Start Date: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      End Date: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default DateFilter;
