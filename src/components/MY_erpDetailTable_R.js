import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from "prop-types";
import MY_InvoiceCard from "./MY_InvoiceDetailCard";
import getCurrency from "../utils/getCurrency";
import getThousand from "../utils/getThousand";
import {Tooltip} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #000000'
    },
    '& .MuiTableRow-head': {
      backgroundColor: '#e0e0e0'
    }
  },
  tableRowCursor: {
    cursor: "pointer"
  },
  tableCellNowrap: {
    whiteSpace: 'nowrap'
  },
  tableCellFontweight: {
    fontWeight: 600
  },
}));

function MY_erpDetailTable({invoices, onGetOccurInvoices}) {
  const classes = useStyles();

  const getSumRPZ5CREDITAT = () => getThousand(invoices.map(invoice => invoice.RPZ5CREDITAT)
    .reduce((prev, curr) => prev + curr));

  const getSumRPZ5DEBITAT = () => getThousand(invoices.map(invoice => invoice.RPZ5DEBITAT)
    .reduce((prev, curr) => prev + curr));

  const tableRow = (invoice) => {
    return (
      <TableRow
        className={invoice.RPDOCM > 0 ? classes.tableRowCursor : null}
        onClick={invoice.RPDOCM > 0 ? () => onGetOccurInvoices(invoice) : null}
        key={invoice.id}>
        <TableCell className={classes.tableCellNowrap} scope="row">{invoice.RPCODE}</TableCell>
        <TableCell className={classes.tableCellNowrap} component="th" scope="row">{invoice.RPDL02}</TableCell>
        <TableCell className={classes.tableCellNowrap} align="right">{invoice.RPZ5DEBITAT === 0 ?
          <br/> : getThousand(invoice.RPZ5DEBITAT)}</TableCell>
        <TableCell className={classes.tableCellNowrap} align="right">{invoice.RPZ5CREDITAT === 0 ?
          <br/> : getThousand(invoice.RPZ5CREDITAT)}</TableCell>
        <TableCell className={classes.tableCellNowrap}>{invoice.RPRMK}</TableCell>
        <TableCell className={classes.tableCellNowrap}>{invoice.RPSEQ === 3 ? (invoice.RPALPH) : <br/>}</TableCell>
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">코드</TableCell>
            <TableCell align="center">계정명</TableCell>
            <TableCell align="center">차변</TableCell>
            <TableCell align="center">대변</TableCell>
            <TableCell align="center">비고</TableCell>
            <TableCell align="center">관리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map(invoice => (
            invoice.RPDOCM > 0 ? (<Tooltip title="채권발생보기">{tableRow(invoice)}</Tooltip>) : tableRow(invoice)
          ))}
          <TableRow>
            <TableCell><br/></TableCell>
            <TableCell component="th" scope="row" className={clsx(classes.tableCellNowrap, classes.tableCellFontweight)}>문서별합계</TableCell>
            <TableCell align="right" className={classes.tableCellFontweight}>{getSumRPZ5DEBITAT()}</TableCell>
            <TableCell align="right" className={classes.tableCellFontweight}>{getSumRPZ5CREDITAT()}</TableCell>
            <TableCell><br/></TableCell>
            <TableCell><br/></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MY_erpDetailTable.propTypes = {
  invoices: PropTypes.array.isRequired,
  onGetOccurInvoices: PropTypes.func,
};

export default MY_erpDetailTable;
