/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Tests({ tests }: any) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='a dense table' size='medium'>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Time</TableCell>
						<TableCell>Score</TableCell>
						<TableCell>BASIC_UNDERSTANDING</TableCell>
						<TableCell>ROAD_KNOWLEDGE</TableCell>
						<TableCell>PUBLIC_SAFETY</TableCell>
						<TableCell>TRAFFIC_RULES</TableCell>
						<TableCell>Result</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tests.map((test:any,i:number) => (
						<TableRow>
							<TableCell align='center' key={i} component='th' scope='row'>
								{test.createdAt.split('T')[0]}
							</TableCell>
							<TableCell align='center' component='th' scope='row'>
								{test.createdAt.split('T')[1].split('.')[0]}
							</TableCell>
							<TableCell align='center'>{test.score[0].score}</TableCell>
							<TableCell align='center'>
								{test.score[0].category.BASIC_UNDERSTANDING}
							</TableCell>
							<TableCell align='center'>{test.score[0].category.ROAD_KNOWLEDGE}</TableCell>
							<TableCell align='center'>{test.score[0].category.PUBLIC_SAFETY}</TableCell>
							<TableCell align='center'>{test.score[0].category.TRAFFIC_RULES}</TableCell>
							<TableCell align='center'>{test.score[0].score>=12?'Pass':'Fail'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
