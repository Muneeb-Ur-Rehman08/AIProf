import React, { CSSProperties } from 'react';

import Select from 'react-select';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: '0.5em',
  borderRadius: '0.5em',
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: '#172B4D',
  borderRadius: '2em',
  color: '#FFFFFF',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'bold',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data: any) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default (props: any) => (
  <Select<any> 
    defaultValue={props.options[1]}
    options={props.options}
    formatGroupLabel={formatGroupLabel}
    onChange={props.onChange}
    styles={{
      control: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        color: '#FFFFFF',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#FFFFFF',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#262626',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#172B4D' : '#262626',
        color: '#FFFFFF',
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor: '#172B4D',
          color: '#FFFFFF',
        },
      }),
    }}
  />
);