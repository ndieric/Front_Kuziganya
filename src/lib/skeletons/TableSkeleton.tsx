// material-ui
<<<<<<< HEAD
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
=======
import { Card, CardContent, Grid } from "@mui/material";
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956
import Skeleton from "@mui/material/Skeleton";

// project imports


// ==============================|| SKELETON TOTAL GROWTH BAR CHART ||============================== //

const TableSkeleton = () => (
    <Card>
        <CardContent>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between" spacing={3}>
                        <Grid item xs zeroMinWidth>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" height={50} width={80} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={350}  />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default TableSkeleton;
