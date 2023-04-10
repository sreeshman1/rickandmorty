import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import Button from './Button';

type FilterProps = {
    conditions: { field: string; value: string }[];
    fields: string[];
    onFilter: (conditions: { field: string; value: string }[]) => void;
};


const FilterWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  background-color: transparent;
  color: ${theme.white}
`;

const FilterCondition = styled.div`
  display: flex;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  color: ${theme.white};
`;

const FilterFieldSelect = styled.select`
  padding: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${theme.white};
`;

const FilterSpan = styled.span`
display: grid;
align-items: center;
margin-left: ${theme.spacing._12};
margin-right: ${theme.spacing._12};
`;

const FilterValueInput = styled.input`
  padding: 5px;
  background-color: transparent;
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  font-size: 16px;
  color: ${theme.white};
`;

const FilterButton = styled(Button)`
    margin-bottom: ${theme.spacing._12};
`;

const Filter: React.FC<FilterProps> = ({ conditions, fields, onFilter }) => {
    const [filterConditions, setFilterConditions] = useState(conditions);

    const handleFieldChange = (index: number, field: string) => {
        const updatedConditions = [...filterConditions];
        updatedConditions[index].field = field;
        setFilterConditions(updatedConditions);
    };

    const handleValueChange = (index: number, value: string) => {
        const updatedConditions = [...filterConditions];
        updatedConditions[index].value = value;
        setFilterConditions(updatedConditions);
    };

    const handleRemoveCondition = (index: number) => {
        const updatedConditions = [...filterConditions];
        updatedConditions.splice(index, 1);
        setFilterConditions(updatedConditions);
    };

    const handleAddCondition = () => {
        if (filterConditions.length < fields.length) {
            const fieldsUsed = filterConditions.map((condition) => condition.field);
            const availableFields = fields.filter((field) => !fieldsUsed.includes(field));
            setFilterConditions([
                ...filterConditions,
                { field: availableFields[0], value: '' },
            ]);
        }
    };

    const handleFilter = () => {
        onFilter(filterConditions);
    };

    return (
        <>
            <FilterWrapper>
                {filterConditions.map((condition, index) => (
                    <FilterCondition key={index}>
                        <FilterFieldSelect
                            value={condition.field}
                            onChange={(e) => handleFieldChange(index, e.target.value)}
                        >
                            {fields.map((field) => (
                                <option key={field} value={field} disabled={filterConditions.some(c => c.field === field && c !== condition)}>
                                    {field}
                                </option>
                            ))}
                        </FilterFieldSelect>
                        <FilterSpan>CONTAINS</FilterSpan>
                        <FilterValueInput
                            type="text"
                            value={condition.value}
                            onChange={(e) => handleValueChange(index, e.target.value)}
                        />
                        {filterConditions.length > 0 && (
                            <Button onClick={() => handleRemoveCondition(index)}>X</Button>
                        )}
                    </FilterCondition>
                ))}
                {filterConditions.length < fields.length && (
                    <FilterButton onClick={handleAddCondition}>Add condition</FilterButton>
                )}
                <FilterButton onClick={handleFilter}>Filter</FilterButton>
            </FilterWrapper>
        </>
    );
};

export default Filter;