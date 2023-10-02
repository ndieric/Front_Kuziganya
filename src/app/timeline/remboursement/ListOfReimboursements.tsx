"use client";
import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/material/styles/styled";
import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import {
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineTrash,
  HiOutlinePencil,
} from "react-icons/hi";
import CustomChip from "@/components/common/CustomChip";

import { FormattedMessage } from "react-intl";
import { IReimbourssementType } from "../../../../types";
import { useIntl } from "react-intl";
import ReimboursementHeader from "./ReimboursementHeader";
import ValidateOrRejectDialog from "./ValidateOrRejectDialog";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { HiSearch } from "react-icons/hi";

import CreateReimboursement from "./CreateReimboursement";
import { AuthContext } from "@/components/contexts/authContext";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
import { useRouter } from "next/navigation";

import { Tooltip } from "@mui/material";
import DeleteDialog from "@/components/common/DeleteDialogue";

// import { notFound } from 'next/navigation'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "color",
    backgroundColor: "#b9cad2",
    fontSize: 14,
    fontWeight: "bold",
    border: "0.5px solid #fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "0.5px solid #ccc",
  },

  [`&.${tableCellClasses.footer}`]: {
    fontSize: 16,
    fontWeight: "700",
    border: "0.5px solid #ccc",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    borderRight: "0.5px solid #ccc",
  },
}));

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

interface ListOfReimboursementsProps {
  reimboursements: any;
}

const ListOfReimboursements = ({
  reimboursements,
}: ListOfReimboursementsProps) => {
  const router = useRouter();
  const intl = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [openValidOrReject, setOpenValidOrReject] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<"v" | "r">("v");

  const [message, setMessage] = useState<string>("");
  const { handleOpenAlert } = useContext(SnackAlertContext);
  const { user } = useContext(AuthContext);

  const [filterValue, setFilterValue] = useState<string>("");
  const [reimboursement, setReimboursement] = useState<IReimbourssementType>({
    id: 0,
    montant: 0,
    codeTransaction: "",
    creditId: 0,
  });
  const handleDeleteContribution = (reimboursement?: IReimbourssementType) => {
    if (reimboursement)
      setReimboursement({
        montant: reimboursement.montant,
        codeTransaction: reimboursement.codeTransaction,
        id: reimboursement?.id!,
        creditId: reimboursement.creditId,
      });
    setOpenDeleteModal((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(e.target.value);
  const handleClear = () => setFilterValue("");
  const handleClickOpenCreateDialog = (
    reimboursement?: IReimbourssementType
  ) => {
    console.log("contibution:", reimboursement);
    setReimboursement({
      id: 0,
      montant: 0,
      codeTransaction: "",
      creditId: 0,
    });
    if (reimboursement)
      setReimboursement({
        id: reimboursement?.id!,
        montant: reimboursement.montant,
        codeTransaction: reimboursement.codeTransaction,
        creditId: reimboursement.creditId,
      });
    setOpen(true);
  };
  const handleOpenValidOrRejectDialog = (
    reimboursement?: IReimbourssementType,
    typeM?: "v" | "r"
  ) => {
    if (typeM) {
      switch (typeM) {
        case "r": {
          setTitle("Rejet du reimboursement");
          setMessage("voulez-vous vraiment rejeter cette reimboursement");
          break;
        }
        default: {
          setTitle("Validation du reimboursement");
          setMessage("voulez-vous vraiment valider cette reimboursement");
          break;
        }
      }
      setType(typeM);
    }

    setReimboursement({
      id: 0,
      montant: 0,
      codeTransaction: "",
      creditId: 0,
    });
    if (reimboursement)
      setReimboursement({
        id: reimboursement?.id!,
        montant: reimboursement.montant,
        codeTransaction: reimboursement.codeTransaction,
        creditId: reimboursement.creditId,
      });
    setOpenValidOrReject((prev) => !prev);
  };

  const handleSubmitValidateOrRejectContribution = async () => {
    let res: any = "";

    setLoading(true);
    try {
      if (reimboursement.id) {
        const url =
          type === "v"
            ? `${process.env.NEXT_PUBLIC_ROOT_API}/remboursements/valid/${reimboursement.id}`
            : `${process.env.NEXT_PUBLIC_ROOT_API}/remboursements/rejet/${reimboursement.id}`;

        res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          // body: JSON.stringify(values),
        });

        const data = await res.json();
        setLoading(false);
        if (!data?.success) {
          handleOpenAlert("info", data?.message);
        } else {
          router.push("/timeline/cotisation?page=0&size=10");
        }
      }
    } catch (error) {
      setLoading(false);
      handleOpenAlert("error", <FormattedMessage id="operation-failed" />);
    }
  };

  // ===========================HANDLE DELEDE ===========================
  const handleOnDelete = () => {
    setDeleting(true);
    fetch(
      `${process.env.NEXT_PUBLIC_ROOT_API}/reimboursement/${reimboursement.id}`,
      {
        method: "DELETE",
        headers: {
          Autorisation: `Bearer ${user.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(() => {
        setDeleting(false);
        setOpenDeleteModal((prev) => !prev);
        router.push("/timeline/cotisation?page=0&size=10");
        handleOpenAlert("succes", <FormattedMessage id="succes-del" />);
      })
      .catch(() => {
        setDeleting(false);
        handleOpenAlert("error", <FormattedMessage id="delet-failed" />);
      });
  };

  return (
    <>
      <ReimboursementHeader
        // handleChange={handleChange}
        // handleClear={handleClear}
        // value={filterValue}
        handleClickOpenCreateDialog={handleClickOpenCreateDialog}
      />

      <Grid
        container
        spacing={1}
        justifyContent="flex-end"
        alignItems="end"
        sx={{
          marginY: "0.5rem",
          backgroundColor: "white",
          width: "100%",
          boxSizing:"border-box"
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography fontWeight="600" color="#252528">
            <FormattedMessage id="single_member" />
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{
              Maxwidth: 300,
              minWidth: 200,
              width: { xs: "100%", sm: "auto" },
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <button className="py-2  w-full mt-4  border-mainColor border-solid border bg-white hover:bg-mainColor hover:text-white  opacity-75 hover:opacity-100 px-3  rounded text-mainColor flex items-center justify-center gap-1    font-semibold transition-all  ">
            <HiSearch fontSize={18} /> <FormattedMessage id="search" />
          </button>
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: `background.paper`,
          height: "100%",
          width: "100%",
          marginTop: "10px",
        }}
      >
       
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>
                  <FormattedMessage id="single_member" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="montant" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="trans-code" />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <FormattedMessage id="status" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="single_interet" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="dejaRembourser" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="montantAvecInteret" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="actions" />
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {/* 
               
                id: 1,
        motif: 'no reason',
        dateCredit: '2023-10-02',
        montant: 5500,
        etat: 0,
        interet: 0,
        montantAvecInteret: 5500,
        dejaRembourser: 0,
        membre: {
          id: 2,
          nom: 'Nizigiyimana',
          prenom: 'Isaac',
          contact: '+257616900535541',
          password: '$2a$10$cxo3F3GmczPVP3XjiEpz3uXeFy8LQ6GlO84ruZpfBETikdgoUVwkq',
          email: 'isaac@gmail.com',
          credits: [
            {
              id: 1,
              montant: 5500,
              motif: 'no reason',
              dateCredit: [ 2023, 10, 2 ],
              etat: 0,
              status: 'IN_PAYMENT',
              dateValidation: '2023-10-02',
              remboursements: []
            }
          ],
          role: 'USER',
          tokens: [],
          enabled: true,
          fullName: 'Nizigiyimana Isaac',
          authorities: [ { authority: 'USER' } ],
          eligbleToBeDeleted: false,
          username: 'isaac@gmail.com',
          accountNonLocked: true,
          credentialsNonExpired: true,
          accountNonExpired: true
        },
        status: 'IN_PAYMENT'
      },
               */}
              {reimboursements?.result?.map((m: IReimbourssementType) => {
                return (
                  <StyledTableRow key={m.id}>
                    {/* @ts-ignore */}
                    <StyledTableCell>{m?.membre?.fullName}</StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.montant}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m?.codeTransaction}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {m.status === "IN_PAYMENT" && (
                        <CustomChip
                          text={`${intl.formatMessage({ id: m?.status! })}`}
                          color="#2d4f85"
                        />
                      )}
                      {m.status === "IN_TREATMENT" && (
                        <CustomChip
                          text={`${intl.formatMessage({ id: m?.status! })}`}
                          color="#055E68"
                        />
                      )}
                      {m.status === "PAID" && (
                        <CustomChip
                          text={`${intl.formatMessage({ id: m?.status! })}`}
                          color="#82472b"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m.interet!}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m.dejaRembourser!}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {m.montantAvecInteret!}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Tooltip
                          title={`${intl.formatMessage({ id: "edit" })}`}
                        >
                          <IconButton
                            onClick={() => handleClickOpenCreateDialog(m)}
                          >
                            <HiOutlinePencil fontSize={17} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip
                          title={`${intl.formatMessage({ id: "valid_info" })}`}
                        >
                          <IconButton
                            color="success"
                            disabled={m?.etat === 1}
                            onClick={() =>
                              handleOpenValidOrRejectDialog(m, "v")
                            }
                          >
                            <HiOutlineCheck fontSize={17} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={`${intl.formatMessage({ id: "reject_info" })}`}
                        >
                          <IconButton
                            color="error"
                            disabled={m?.etat === 2}
                            onClick={() =>
                              handleOpenValidOrRejectDialog(m, "r")
                            }
                          >
                            <HiOutlineX fontSize={17} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={`${intl.formatMessage({ id: "delete" })}`}
                        >
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteContribution(m)}
                          >
                            <HiOutlineTrash fontSize={17} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {!reimboursements?.result && (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} sx={{ textAlign: "center" }}>
                    <Typography fontSize="bold">
                      <FormattedMessage id="no-data-display" />
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reimboursements?.result?.totalPages || 0}
          rowsPerPage={reimboursements?.result?.size || 0}
          page={reimboursements?.result?.number || 0}
          // onPageChange={handleChangePage}
          onPageChange={() => console.log("chanage page")}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          onRowsPerPageChange={() => console.log("chanage rows")}
        />
      </Box>
      <CreateReimboursement
        reimboursement={reimboursement}
        open={open}
        setOpen={setOpen}
      />
      <ValidateOrRejectDialog
        message={message}
        title={title}
        open={openValidOrReject}
        handleClose={handleOpenValidOrRejectDialog}
        handleOperation={handleSubmitValidateOrRejectContribution}
        loading={loading}
      />
      <DeleteDialog
        open={openDeleteModal}
        deleting={deleting}
        handleClose={() => setOpenDeleteModal((prev) => !prev)}
        handleDelete={handleOnDelete}
      />
    </>
  );
};

export default ListOfReimboursements;
