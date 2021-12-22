import React from "react";
import { Grid } from "@material-ui/core";
import Item from "../ProductList/ProductItem";
import "./productList.scss";

function ProductFavoriteList({ currentItems }) {
    return (
        <div className="listContainer">
            <Grid container alignItems="stretch" spacing={2}>
                {currentItems &&
                    currentItems.map((data) => (
                        <Grid key={data.id} item xs={12} sm={6} md={3}>
                            <Item data={data.product} />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}
export default React.memo(ProductFavoriteList);
