import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import Tick from "../../../public/assets/images/tick.png"
import Cross from "../../../public/assets/images/cross.png"
function Table({ data, visibleFields }) {
    const columns = useMemo(() => {
        // If visibleFields is not specified, default to showing only the "name" field
        if (!visibleFields) {
            return [
                {
                    Header: 'Name',
                    accessor: 'name',
                },
            ];
        }

        // Create a column for each visible field
        return visibleFields.map((field) => ({
            Header: field,
            accessor: field.toLowerCase(),
            // cell: ({ value }) => {
            //     console.log('field', field, ', value', value)
            //     return field.toLowerCase() === 'double_checked' ? (
            //         value == "true" ? (
            //             <img src={Tick.src} alt="Checked" />) : (
            //             <img src={cross.src} alt="Not Checked" />
            //         )) : (value);
            // }
        }));
    }, [visibleFields]);

    const tableData = useMemo(() => {
        // If visibleFields is not specified, return the full data array
        if (!visibleFields) {
            return data;
        }

        // Only include the specified fields in the output data
        return data.map((item) =>
            visibleFields.reduce(
                (acc, field) => ({ ...acc, [field.toLowerCase()]: item[field.toLowerCase()] }),
                {}
            )
        );
    }, [data, visibleFields]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: tableData,
    });

    return (
        <div className="table-responsive">
            <table {...getTableProps()} className="table table-striped" style={{ maxWidth: '100%' }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;