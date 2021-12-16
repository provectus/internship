import React, {ChangeEvent, useState} from "react";
import {
    Box,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton, MenuItem,
    TextField
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import AddBox from "@mui/icons-material/AddBox";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import adapter from "@mui/lab/AdapterMoment";
import {useAppActions, useTypedSelector} from "../../hooks/redux";

interface PaginationActionProps {
    page: number;
    count: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

export default function PaginationAction({page, rowsPerPage, onPageChange, count}: PaginationActionProps) {
    const {addExpense} = useAppActions();
    const {categories} = useTypedSelector(state => state.categories);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState<Date | null>(new Date());
    const [description, setDescription] = useState("");

    const [amountError, setAmountError] = useState(false);//amount>0
    const [descriptionError, setDescriptionError] = useState(false);//Length>0
    const [error, setError] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const addExp = () => {
        if (descriptionError || amountError) {
            setError(true);
            return;
        }
        else setError(false);
        addExpense(categories, amount, (date || new Date()).toISOString(), description, category);
        setOpen(false);
    }
    const handleClickOpen = () => {
        setAmount(0);
        setAmountError(true);
        setCategory(categories[0]._id);
        setDescription("");
        setDescriptionError(true);
        setDate(new Date());
        setOpen(true);
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Expense</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Enter Description.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        error={descriptionError}
                        helperText={descriptionError ? "Description must be non-empty" : null}
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
                        Enter Amount.
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
                        Enter Date
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={adapter}>
                        <DateTimePicker
                            value={date}
                            onChange={(newDate: Date | null) => {
                                setDate(newDate);
                            }}
                            renderInput={params => <TextField {...params} helperText={null}/>}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogContent>
                    <DialogContentText>
                        Enter Category.
                    </DialogContentText>
                    <TextField
                        select
                        margin="dense"
                        variant="standard"
                        value={category}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const value = event.target.value;
                            setCategory(value);
                        }}
                    >
                        {categories.map(category => (
                            <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                {error ? (<DialogContent>
                    <DialogContentText>
                        Correct Errors
                    </DialogContentText>
                </DialogContent>)
                    : null}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addExp}>Add</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{flexShrink: 0, ml: 2.5}}>
                <IconButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        onPageChange(event, page - 1)
                    }}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    <KeyboardArrowLeft/>
                </IconButton>
                <IconButton onClick={handleClickOpen}>
                    <AddBox/>
                </IconButton>


                <IconButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        onPageChange(event, page + 1)
                    }}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    <KeyboardArrowRight/>
                </IconButton>
            </Box>
        </>);
}