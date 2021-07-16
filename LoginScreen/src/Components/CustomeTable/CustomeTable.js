import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import DataTable from "react-data-table-component";
import CustomePagination from "../CustomePagination/CustomePagination";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import "./CustomeTable.css";
const customStyles = {
	headCells: {
		style: {
			fontSize: "12px",
			fontWeight: "500",
		},
	},
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(0),
		},
	},
}));

const ColorLinearProgress = withStyles({
	colorPrimary: {
		backgroundColor: "#007bff",
	},
	barColorPrimary: {
		backgroundColor: "#ffffff",
	},
	root: {
		height: 5,
		marginTop: 5,
	},
})(LinearProgress);

const LinearIndeterminate = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ColorLinearProgress />
		</div>
	);
};

const sortIcon = <ArrowDownward />;

function CustomeTable(props) {
	const {
		data,
		columns,
		total,
		noDataString,
		pending,
		pagination,
		paginationServer,
		totalListCount,
		handlePageChange,
		numOfColumns,
		persistTableHead,
		onPageChangedCalled,
		custompagination,
		disabledJumpTo,
		onChangeLimit,
		paginationPerPage,
		inputClassName,
		pageNumber,
		handleDropdownChange,
		limit,
		onSort,
		// searchtext,
		...rest
	} = props;

	const numberOfCol = () => {
		if (numOfColumns === 0) {
			return columns?.length;
		}
		return numOfColumns;
	};

	return (
		<>
			<div
				className={`${inputClassName} ${
					numberOfCol && numberOfCol() > 4
						? "card-list-table"
						: "card-list-table col-less-equal-4"
				}`}
			>
				{total && !pending ? (
					<div className="total">
						Total # <span> {data ? totalListCount : ""}</span>
					</div>
				) : null}
				<DataTable
					columns={columns}
					sortIcon={sortIcon}
					data={data}
					responsive={true}
					// expandableRows = {true}
					// className={total && !pending ? "" : ""}
					className="user-data-table"
					noHeader
					highlightOnHover
					noDataComponent={
						<div className="no-data-component">{noDataString}</div>
					}
					customStyles={customStyles}
					progressPending={pending}
					progressComponent={<LinearIndeterminate />}
					persistTableHead={persistTableHead}
					paginationPerPage={paginationPerPage}
					paginationRowsPerPageOptions={[1, 3, 5, 10, 15, 20, 25, 30]}
					onChangeRowsPerPage={onChangeLimit}
					pagination={pagination}
					paginationServer={paginationServer}
					paginationTotalRows={totalListCount}
					paginationDefaultPage={1}
					paginationComponentOptions={{
						noRowsPerPage: true,
					}}
					onChangePage={handlePageChange}
					{...rest}
					onSort={onSort}
					sortServer={true}
				/>
			</div>
			{custompagination && !pagination && data && data.length ? (
				<CustomePagination
					totalLength={totalListCount}
					paginationPerPage={paginationPerPage}
					onPageChangedCalled={onPageChangedCalled}
					pageNumber={pageNumber}
					limit={paginationPerPage}
					paginationRowsPerPageOptions={[1, 3, 5, 10, 15, 20, 25, 30]}
					handleDropdownChange={handleDropdownChange}
					limit={limit}
				/>
			) : (
				<></>
			)}
		</>
	);
}

CustomeTable.defaultProps = {
	total: false,
	noDataString: "No Records Available",
	pagination: false,
	custompagination: false,
	pending: false,
	paginationServer: false,
	totalListCount: 0,
	numOfColumns: 0,
	handlePageChange: () => {},
	onChangeLimit: () => {},
	onPageChangedCalled: () => {},
	persistTableHead: true,
	paginationPerPage: 15,
	inputClassName: "",
};
CustomeTable.propTypes = {
	data: PropTypes.instanceOf(Array),
	columns: PropTypes.instanceOf(Array),
	total: PropTypes.bool,
	pagination: PropTypes.bool,
	custompagination: PropTypes.bool,
	noDataString: PropTypes.string,
	pending: PropTypes.bool,
	paginationServer: PropTypes.bool,
	totalListCount: PropTypes.number,
	handlePageChange: PropTypes.func,
	numOfColumns: PropTypes.number,
	persistTableHead: PropTypes.bool,
	onPageChangedCalled: PropTypes.func,
	onChangeLimit: PropTypes.func,
	paginationPerPage: PropTypes.number,
	inputClassName: PropTypes.string,
};

export default CustomeTable;
