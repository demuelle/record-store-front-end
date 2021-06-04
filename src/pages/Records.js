import api from 'api';
import { useQuery } from 'react-query';
import { Text } from '@chakra-ui/react';
import { Table, Form } from 'components/Records';
import { useMutation, useQueryClient } from 'react-query';

const fetchRecords = async () => await api.index();

function Records() {
  const { status, data, error } = useQuery('records', fetchRecords);

  const queryClient = useQueryClient();

  const addRecord = useMutation(payload => api.create(payload));

  const handleSubmit = event => {
    event.preventDefault();
    addRecord.mutate(Object.fromEntries(new FormData(event.target)), {
      onSuccess: () => {
        console.log('Success!!!!');
        queryClient.invalidateQueries('records');
      },
    });
  };

  console.log(status);
  console.log(data);
  console.log(error);

  switch (status) {
    case 'loading':
      return <Text>Loading...</Text>;
    case 'error':
      return <Text color="tomato">{error.message}</Text>;
    default:
      return (
        <main className="container mx-auto">
          <Table records={data} />
          <Form handler={handleSubmit} />
        </main>
      );
  }
}

export default Records;
