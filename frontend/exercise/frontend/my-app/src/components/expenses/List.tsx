import React, {FC} from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useTypedSelector} from "../../hooks/redux";
import Loading from "../static/Loading";
import Error from "../static/Error";

const List: FC = () => {
    //todo expenses and categories
    const {expenses, error, loading, headers} = useTypedSelector(state => state.expenses);
    if(error)return <Error message={error}/>;
    if(loading)return <Loading/>;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((cell,index)=>(
                            <TableCell align={index ? "right" : undefined}>{cell}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">
                                {row.description}
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            {/*todo use moment to convert to date string*/}
                            <TableCell align="right">{row.category}</TableCell>
                            {/*todo use fetched category from redux to compare ids and output string*/}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;