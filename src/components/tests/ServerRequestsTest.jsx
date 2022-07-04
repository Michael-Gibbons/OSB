import { useState, useContext } from "react";
import {
  Card,
  Page,
  Layout,
  ButtonGroup,
  Button,
  TextContainer,
} from "@shopify/polaris";
import { createServerClient } from "../../../services/clients/index.js";

export function ServerRequestsTest() {
  const [getResult, setGetResult] = useState("");
  const [postResult, setPostResult] = useState("");
  const [putResult, setPutResult] = useState("");
  const [patchResult, setPatchResult] = useState("");
  const [deleteResult, setDeleteResult] = useState("");

  const serverClient = createServerClient();

  const handleGet = async () => {
    const response = await serverClient.get("/resourceExample");
    setGetResult(response.status);
  };

  const handlePost = async () => {
    const response = await serverClient.post("/resourceExample", {
      method: "POST",
    });
    setPostResult(response.status);
  };

  const handlePut = async () => {
    const response = await serverClient.put("/resourceExample", {
      method: "PUT",
    });
    setPutResult(response.status);
  };

  const handlePatch = async () => {
    const response = await serverClient.patch("/resourceExample", {
      method: "PATCH",
    });
    setPatchResult(response.status);
  };

  // Unlike axios.post() and axios.put(), the 2nd param to axios.delete() is the Axios options, not the request body. To send a request body with a DELETE request, you should use the data option.
  const handleDelete = async () => {
    const response = await serverClient.delete("/resourceExample", {
      data: { method: "DELETE" },
    });
    setDeleteResult(response.status);
  };

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Server Request Tests">
            <ButtonGroup>
              <Button onClick={handleGet}>GET</Button>
              <Button onClick={handlePost}>POST</Button>
              <Button onClick={handlePut}>PUT</Button>
              <Button onClick={handlePatch}>PATCH</Button>
              <Button onClick={handleDelete}>DELETE</Button>
            </ButtonGroup>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned title="Server Request Test Responses">
            <TextContainer>
              <div>GET RESULT: {getResult}</div>
              <div>POST RESULT: {postResult}</div>
              <div>PUT RESULT: {putResult}</div>
              <div>PATCH RESULT: {patchResult}</div>
              <div>DELETE RESULT: {deleteResult}</div>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
