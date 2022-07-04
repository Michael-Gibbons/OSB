import { Card, Page, Layout, ButtonGroup, Button } from "@shopify/polaris";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../../redux/ducks/exampleDuck";
import { useQuery } from "react-query";
import axios from "axios";
import { setUsers } from "../../../redux/ducks/asyncExampleDuck";

export function ReduxTest() {
  const count = useSelector((state) => state.example.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleGetUsers = () => {
    getUsers();
  };

  const {
    isLoading,
    data: users = [],
    error,
    refetch: getUsers,
  } = useQuery(
    "users",
    () =>
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(({ data }) => {
          // Don't really need this since react-query caches the data by query key, so this same code in 50 components will only send ONE request.
          dispatch(setUsers(data));
          return data;
        }),
    {
      refetchOnWindowFocus: false,
      enabled: false, // prevents request from running on mount, so we can use the refetch function on user action
    }
  );

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned title="Redux Test">
            <h2>Count: {count}</h2>
            <ButtonGroup>
              <Button onClick={handleIncrement}>Increment</Button>
              <Button onClick={handleDecrement}>Decrement</Button>
            </ButtonGroup>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned title="Async Redux Test">
            <h2>Users retrieved from API</h2>
            <ButtonGroup>
              <Button onClick={handleGetUsers}>Get Users</Button>
            </ButtonGroup>
            {users.map((user) => {
              return <div key={user.id}>{user.name}</div>;
            })}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
