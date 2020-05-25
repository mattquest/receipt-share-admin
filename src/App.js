import React, { Component } from "react"
import "./App.css"
import { withAuthenticator } from "aws-amplify-react"
import Amplify from "aws-amplify"
import aws_exports from "./aws-exports"
import { Container } from "@material-ui/core"
import MaterialTable from "material-table"
Amplify.configure(aws_exports)

const data = [{ item: 3 }]
function setData() {}

class App extends Component {
  render() {
    return (
      <div className="App App-body">
        <Container className="App-table">
          <MaterialTable
            editable={{
              isEditable: (rowData) => rowData.name === "a", // only name(a) rows would be editable
              isDeletable: (rowData) => rowData.name === "b", // only name(b) rows would be deletable
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    /* setData([...data, newData]); */

                    resolve()
                  }, 1000)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data]
                    const index = oldData.tableData.id
                    dataUpdate[index] = newData
                    setData([...dataUpdate])

                    resolve()
                  }, 1000)
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data]
                    const index = oldData.tableData.id
                    dataDelete.splice(index, 1)
                    setData([...dataDelete])

                    resolve()
                  }, 1000)
                }),
            }}
          />
        </Container>
      </div>
    )
  }
}

export default withAuthenticator(App, true)
