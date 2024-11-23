import React, { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CsvDownloader from "react-csv-downloader";
import "./mainpage.css";

const mainpage = () => {
  let amazonData = null;
  let rows = []

  const columns = [
    {
      id: "Invoice Date",
    },
    {
      id: "Invoice Number",
    },
    {
      id: "Customer Name",
    },
    {
      id: "Item Name",
    }, 
    {
      id: "Item Price",
    },
    {
      id: "Currency Code",
    },
    {
      id: "Quantity",
    },
    {
      id: "SKU",
    },
    {
      id: "Payment Terms Label",
    },
    {
      id: "Place of Supply",
    },
    {
      id: "Adjustment Description",
    },
    {
      id: "GST Treatment",
    },
    {
      id: "Item Type",
    },
    {
      id: "Discount Type",
    },
    {
      id: "Usage unit",
    },
    {
      id: "Terms & Conditions",
    },
    {
      id: "Account",
    },
    {
      id: "Template Name",
    },
    {
      id: "Notes",
    },
    {
      id: "Is Discount Before Tax",
    }
  ];


  const uploadHandler = (event) => {
    console.log(event.target.files[0]);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        amazonData = results.data;
      },
    });
  };





  const downloadHandler = () => {
    let index=1
    for (let i of amazonData) {
      console.log(i);
      let row ={}
      row["Item Name"]=i["product-name"].replaceAll(",", ";");
      row["Invoice Date"]=i["purchase-date"]
      row["Currency Code"]=i["currency"]
      row["Quantity"]=i["quantity-purchased"]
      row["SKU"]=i["sku"]

      row["Payment Terms Label"]="Due On Receipt" //Received
      row["Place of Supply"]="KL"
      row["Adjustment Description"]="Adjustment"
      row["GST Treatment"]="consumer"
      row["Item Type"]="goods"
      row["Discount Type"]="item_level"
      row["Usage unit"]="Nos"
      row["Terms & Conditions"]="PAYMENT BY AMZ TO VO"
      row["Account"]="Sales"
      row["Template Name"]="Spreadsheet Template"
      row["Notes"]="Thanks for your business."
      row["Is Discount Before Tax"]="true"

      row["Customer Name"]="AMZ. "+i["recipient-name"]
      row["Item Price"]=Number(i["item-price"]) + Number(i["shipping-price"]) 

      row["Invoice Number"]="B/KL/24-25/" + index++
      console.log(row);
      rows.push(row)
    }
    console.log(rows);
    return Promise.resolve(rows);
  };
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ background: "#643B9F" }}>
            <Typography
              style={{ textAlign: "center", background: "#643B9F" }}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Venus Online
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Stack spacing={2} direction="row">
              <input
                accept=".csv"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={uploadHandler}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
              </label>
              <CsvDownloader
                filename="myfile"
                extension=".csv"
                separator=","
                wrapColumnChar=""
                columns={columns}
                datas={downloadHandler}
                text="DOWNLOAD"
                className="MuiButton"
                meta="true"
              />
              </Stack>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default mainpage;
