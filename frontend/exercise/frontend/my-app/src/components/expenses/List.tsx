import React, {ChangeEvent, FC, useState} from "react";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow, TextField, Typography
} from "@mui/material";
import {useAppActions, useTypedSelector} from "../../hooks/redux";
import Loading from "../static/Loading";
import Error from "../static/Error";
import {Expense} from "../../types/entities";
import adapter from "@mui/lab/AdapterMoment";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import PaginationAction from "./PaginationAction";

const List: FC = () => {
    const expensesState = useTypedSelector(state => state.expenses);
    const {expenses, loading, headers} = expensesState;
    const errorExpenses = expensesState.error;
    const categoriesState = useTypedSelector(state => state.categories);
    const loadingCategories = categoriesState.loading;
    const errorCategories = categoriesState.error;
    const {deleteExpense, updateExpense} = useAppActions();
    const [_id, set_id] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date | null>();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const [amountError, setAmountError] = useState(false);//amount>0
    const [descriptionError, setDescriptionError] = useState(false);//Length>0
    const [error, setError] = useState(false);
    const rowsPerPage = 10;
    const handleClose = () => {
        setOpen(false);
    }
    const handleClickOpen = (expense: Expense) => {
        set_id(expense._id);
        setAmount(expense.amount);
        setDescription(expense.description);
        setDate(new Date(expense.date));
        setOpen(true);
    }

    const deleteExp = () => {
        deleteExpense(_id);
        setOpen(false);
    }
    const updateExp = () => {
        if (descriptionError || amountError) {
            setError(true);
            return;
        }
        else setError(false);

        updateExpense(_id, amount, (date || new Date()).toISOString(), description);
        setOpen(false);
    }

    if (errorExpenses || errorCategories) return <Error message={errorExpenses || errorCategories}/>;
    if (loading || loadingCategories) return <Loading/>;
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Expense</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Change Description.
                    </DialogContentText>
                    <TextField
                        error={descriptionError}
                        helperText={descriptionError ? "Description must be non-empty" : null}
                        autoFocus
                        margin="dense"
                        type="text"
                        variant="standard"
                        value={description}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const value = event.target.value;
                            if (value.length > 0) setDescriptionError(false);
                            else setDescriptionError(true);
                            setDescription(value);
                        }}
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText>
                        Change Amount.
                    </DialogContentText>
                    <TextField
                        error={amountError}
                        helperText={amountError ? "Amount must be greater than 0" : null}
                        margin="dense"
                        type="number"
                        variant="standard"
                        value={amount}
                        onChange={event => {
                            const value = parseInt(event.target.value);
                            if (value > 0) setAmountError(false);
                            else setAmountError(true);
                            setAmount(value);
                        }}
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText>
                        Change Date
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={adapter}>
                        <DateTimePicker
                            label="Date and Time of expense"
                            value={date}
                            onChange={(newDate: Date | null) => {
                                setDate(newDate);
                            }}
                            renderInput={params => <TextField helperText={null}
                                                              {...params}/>}
                        />
                    </LocalizationProvider>
                </DialogContent>
                {error ? (<DialogContent>
                        <DialogContentText>
                            Correct Errors
                        </DialogContentText>
                    </DialogContent>)
                    : null}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateExp}>Update</Button>
                    <Button onClick={deleteExp}>Delete</Button>
                </DialogActions>
            </Dialog>


            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((cell, index) => (
                                <TableCell key={index} align={index ? "center" : undefined}>
                                    <Typography sx={{fontWeight: 600}}>
                                        {cell}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.slice(page * rowsPerPage, (1 + page) * rowsPerPage).map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    cursor: "pointer",
                                    "&:nth-of-type(odd)": {
                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    },
                                    "&:last-child td, &:last-child th": {border: 0}
                                }}
                                onClick={() => handleClickOpen(row)}
                            >
                                <TableCell align="left">
                                    <Typography>
                                        {row.description}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>
                                        {row.amount}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>
                                        {row.date}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>
                                        {row.category}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[rowsPerPage]}
                                count={expenses.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
                                    setPage(newPage);
                                }}

                                ActionsComponent={PaginationAction}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default List;